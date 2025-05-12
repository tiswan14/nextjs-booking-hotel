import RoomTable from "@/components/admin/room/room-table"
import { Suspense } from "react"
import { AddButton } from "@/components/admin/room/button"
const RoomPage = () => {
    return (
        <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
            <div className="px-3 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Kamar</h1>
                <AddButton />
            </div>
            <Suspense fallback={<div>Loading data...</div>}>
                <RoomTable />
            </Suspense>
        </div>
    )
}

export default RoomPage
