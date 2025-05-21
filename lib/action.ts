"use server";

import { prisma } from "@/lib/prisma";
import { ContactSchema, ReserveSchema, RoomSchema } from "./zod";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

export const saveRoom = async (image: string, prevState: unknown, formData: FormData) => {
    if (!image) return { message: "Image wajib di isi!" }

    const rawData = {
        name: formData.get("name") ?? "",
        description: formData.get("description") ?? "",
        capacity: Number(formData.get("capacity") ?? 0),
        price: Number(formData.get("price") ?? 0),
        amenities: formData.getAll("amenities") ?? [],
    }



    const validatedFields = RoomSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { name, description, price, capacity, amenities } = validatedFields.data

    try {
        await prisma.room.create({
            data: {
                name,
                description,
                image,
                price,
                capacity,
                RoomAmenities: {
                    createMany: {
                        data: amenities.map((item: string) => ({
                            amenitiesId: item
                        }))
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    redirect("/admin/room");
}



export const ContactMessage = async (prevState: unknown, formData: FormData) => {
    const validateField = ContactSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validateField.success) {
        const formattedErrors = validateField.error.issues.reduce(
            (acc, issue) => {
                const field = issue.path[0] as string;
                acc[field] = issue.message;
                return acc;
            },
            {} as Record<string, string>
        );

        return { error: formattedErrors };
    }

    const { name, email, subject, message } = validateField.data;

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        return { message: "Terima kasih telah menghubungi saya." };
    } catch {
        return { error: { global: "Gagal mengirim pesan. Silakan coba lagi nanti." } };
    }
};


export const deleteRoom = async (id: string, image: string) => {
    try {
        await del(image);
        await prisma.room.delete({
            where: { id }
        })
    } catch (error) {
        console.log(error);

    }
    revalidatePath("/admin/room")

}

// Update Room
export const updateRoom = async (
    image: string,
    roomId: string,
    prevState: unknown,
    formData: FormData
) => {
    if (!image) return { message: "Image wajib di isi!" }

    const rawData = {
        name: formData.get("name") ?? "",
        description: formData.get("description") ?? "",
        capacity: Number(formData.get("capacity") ?? 0),
        price: Number(formData.get("price") ?? 0),
        amenities: formData.getAll("amenities") ?? [],
    }

    const validatedFields = RoomSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { name, description, price, capacity, amenities } = validatedFields.data

    try {
        await prisma.$transaction([
            prisma.room.update({
                where: { id: roomId },
                data: {
                    name,
                    description,
                    image,
                    price,
                    capacity,
                    RoomAmenities: {
                        deleteMany: {},
                    },
                },
            }),
            prisma.roomAmenities.createMany({
                data: amenities.map((item) => ({
                    roomId,
                    amenitiesId: item,
                })),
            }),
        ])
    } catch (error) {
        console.log(error);
        return { error: "Terjadi kesalahan saat memperbarui data kamar." }
    }

    revalidatePath("/admin/room")
    redirect("/admin/room");
}



export const createReserve = async (
    roomId: string,
    price: number,
    startDate: Date,
    endDate: Date,
    prevState: unknown,
    formData: FormData
) => {
    const session = await auth();
    if (!session?.user?.id) {
        return { redirectTo: `/login?redirect_url=room/${roomId}` };
    }

    const rawData = {
        name: formData.get("name"),
        phone: formData.get("phone"),
    };

    const validated = ReserveSchema.safeParse(rawData);
    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors };
    }

    const { name, phone } = validated.data;
    const night = differenceInCalendarDays(endDate, startDate);
    if (night <= 0) {
        return { messageDate: "Tanggal setidaknya satu malam" };
    }

    const total = night * price;

    try {
        const reservation = await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: session.user.id },
                data: { name, phone },
            });

            return await tx.reservation.create({
                data: {
                    startDate,
                    endDate,
                    price: total,
                    userId: session.user.id,
                    roomId,
                    Payment: { create: { amount: total } },
                },
            });
        });

        return { redirectTo: `/checkout/${reservation.id}` };

    } catch (err) {
        console.error(err);
        return { message: "Gagal melakukan reservasi. Silakan coba lagi." };
    }
};


