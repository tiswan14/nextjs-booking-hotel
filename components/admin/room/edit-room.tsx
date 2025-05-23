import { getAmenities, getRoomById } from "@/lib/data";
import EditForm from "./edit-form";
import { notFound } from "next/navigation";

const EditRoom = async ({ roomId }: { roomId: string }) => {
    const [amenities, room] = await Promise.all([getAmenities(), getRoomById(roomId)]);
    if (!amenities || !room) return notFound()

    if (!amenities) return <div>Tidak ada aminities</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Kamar</h1>
            <EditForm amenities={amenities} room={room} />
        </div>
    );
};


export default EditRoom;
