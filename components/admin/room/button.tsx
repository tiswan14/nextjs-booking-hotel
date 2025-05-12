import { deleteRoom } from "@/lib/action";
import { IoTrashSharp, IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
    const DeleteRoomWithId = deleteRoom.bind(null, id, image);

    return (
        <form action={DeleteRoomWithId}>
            <button
                type="submit"
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110"
                title="Hapus"
            >
                <IoTrashSharp className="w-5 h-5" />
            </button>
        </form>
    );
};

export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link
            href={`/admin/room/edit/${id}`}
            className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-110"
            title="Edit"
        >
            <MdEdit className="w-5 h-5" />
        </Link>
    );
};


export const AddButton = () => {
    return (
        <Link
            href="/admin/room/create"
            className="flex items-center justify-between gap-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition duration-300 font-medium ease-in-out transform hover:scale-105"
        >
            Tambah Kamar
            <IoAddOutline className="w-5 h-5" />
        </Link>
    );
};
