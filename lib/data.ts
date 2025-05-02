import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const getAmenities = async (): Promise<{ id: string; name: string; createdAt: Date; updatedAt: Date }[]> => {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    try {
        const result = await prisma.amenities.findMany();
        return result.map(item => ({
            id: item.id.toString(),  // Mengonversi id menjadi string
            name: item.name,
            createdAt: item.createdAt,  // Menambahkan createdAt
            updatedAt: item.updatedAt   // Menambahkan updatedAt
        }));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
};
