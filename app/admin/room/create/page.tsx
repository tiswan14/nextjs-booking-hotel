import CreateRoom from "@/components/admin/room/create-room"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Tambah Kamar Baru",
}
const CreateRoomPage = () => {
    return (
        <div className="max-w-screen-xl px-4 py-16 mx-auto mt-12 pb-20 text-center">
            <CreateRoom />
        </div>
    )
}

export default CreateRoomPage
