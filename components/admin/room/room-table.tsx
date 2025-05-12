import { getRooms } from "@/lib/data"
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "./button";
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
                        <th scope="col" className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {rooms.map((room) => (
                        <tr key={room.id} className="hover:bg-gray-50 transition duration-200">
                            <td className="px-5 py-4">
                                <div className="h-20 w-32 relative rounded overflow-hidden shadow-sm">
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
                            <td className="px-6 py-4">{formatDate(room.createdAt.toString())}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <EditButton id={room.id} />
                                    <DeleteButton id={room.id} image={room.image} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}

export default RoomTable
