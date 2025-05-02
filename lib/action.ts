"use server";

import { prisma } from "@/lib/prisma";
import { ContactSchema, RoomSchema } from "./zod";
import { redirect } from "next/navigation";

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

