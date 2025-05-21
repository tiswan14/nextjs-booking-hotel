import Image from "next/image";
import { getRoomDetailById } from "@/lib/data";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import ReserveForm from "./reserve-form";

const RoomDetail = async ({ roomId }: { roomId: string }) => {
    const room = await getRoomDetailById(roomId);
    if (!room) return notFound();

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-16 grid gap-10 lg:grid-cols-12">
            {/* Kiri - Gambar dan deskripsi */}
            <div className="lg:col-span-8 space-y-6">
                <Image
                    src={room.image}
                    alt={room.name}
                    width={770}
                    height={430}
                    className="w-full rounded-lg shadow-sm object-cover"
                    priority
                />
                <h1 className="text-4xl font-bold text-gray-900">{room.name}</h1>
                <p className="text-gray-700 leading-relaxed">{room.description}</p>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Fasilitas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2">
                        {room.RoomAmenities.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 text-gray-600">
                                <IoCheckmark className="text-green-600" size={18} />
                                <span className="text-sm">{item.Amenities.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Kanan - Info Harga dan Kapasitas */}
            <div className="lg:col-span-4">
                <div className="border border-gray-200 bg-white p-6 rounded-lg shadow-md space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <IoPeopleOutline size={20} />
                            <span>{room.capacity} orang</span>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-semibold text-gray-800">
                                {formatCurrency(room.price)}
                            </p>
                            <p className="text-sm text-gray-500">/malam</p>
                        </div>
                    </div>

                    {/* Tempat form reservasi nanti */}
                    <div>
                        <ReserveForm room={room} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
