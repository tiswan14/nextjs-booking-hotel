import { deleteRoom } from "@/lib/action";
import { IoTrashOutline } from "react-icons/io5";

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
    const DeleteRoomWithId = deleteRoom.bind(null, id, image);

    return (
        <form action={DeleteRoomWithId}>
            <button
                type="submit"
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
                <IoTrashOutline className="w-5 h-5 mr-2" />
                Hapus
            </button>
        </form>
    );
}
