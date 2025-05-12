import EditRoom from "@/components/admin/room/edit-room";
import { Suspense } from "react";

const UpdateRoomPage = async ({ params }: { params: { id: string } }) => {
    const roomId = params.id;
    if (!roomId) return <div>Kamar tidak ditemukan</div>;
    return (
        <div className="max-w-screen-xl px-4 py-16 mx-auto mt-10">
            <Suspense fallback={<p>Loading data...</p>}>
                <EditRoom roomId={roomId} />
            </Suspense>
        </div>
    );
};

export default UpdateRoomPage;
