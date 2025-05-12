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
            id: item.id.toString(),
            name: item.name,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch amenities");
    }
};

export const getRooms = async (): Promise<{ id: string; name: string; createdAt: Date; updatedAt: Date }[]> => {
    try {
        const result = await prisma.room.findMany({
            orderBy: { createdAt: "desc" }
        });
        return result
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch rooms");
    }
};


export const getRoomById = async (roomId: string) => {
    try {
        const result = await prisma.room.findUnique({
            where: { id: roomId },
            include: { RoomAmenities: { select: { amenitiesId: true } } },
        });
        return result
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch rooms");
    }
};
