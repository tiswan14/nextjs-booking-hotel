import { getRooms } from "@/lib/data"
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton } from "./button";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
const RoomTable = async () => {
    const rooms = await getRooms();
    if (!rooms?.length) return <div className="bg-white p-6 mt-6 rounded-2xl shadow-md overflow-x-auto">Tidak ada kamar</div>;
    return (
        <div className="bg-white p-6 mt-6 rounded-2xl shadow-md overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                    <tr>
                        <th scope="col" className="px-14 py-4">Gambar</th>
                        <th scope="col" className="px-6 py-4">Nama Kamar</th>
                        <th scope="col" className="px-8 py-4">Harga</th>
                        <th scope="col" className="px-5 py-4">Tanggal Buat</th>
                        <th scope="col" className="px-6 py-4 text-center ">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {rooms.map((room) => (
                        <tr key={room.id} className="hover:bg-gray-50 transition duration-200">
                            <td className="px-5 py-4">
                                <div className="h-20 w-32 relative">
                                    <Image
                                        src={room.image}
                                        alt="room image"
                                        fill
                                        sizes="20vw"
                                        className="object-cover"
                                    />
                                </div>
                            </td>


                            <td className="px-6 py-4 font-medium text-gray-900">{room.name}</td>
                            <td className="px-6 py-4">{formatCurrency(room.price)}</td>
                            <td className="px-6 py-4">
                                {formatDate(room.createdAt.toString())}
                            </td>
                            <td className="px-6 py-4 text-center flex space-x-4 items-center justify-center">
                                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                                    <IoPencilOutline className="w-5 h-5 mr-2" />
                                    Edit
                                </button>
                                <DeleteButton id={room.id} image={room.image} />
                            </td>



                        </tr>
                    ))}
                </tbody>


            </table>
        </div>

    )
}

export default RoomTable
