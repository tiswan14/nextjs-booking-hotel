import { Metadata } from "next"
import HeaderSection from "@/components/header-section"
import Main from "@/components/main"
import { Suspense } from "react"
import RoomSkeleton from "@/components/skeletons/room-skeleton"

export const metadata: Metadata = {
    title: "Room and Rate",
    description: "Pilih kamar terbaikmu hari ini",
}
const RoomPage = () => {
    return (
        <div>
            <HeaderSection title="Room and Rate" subTitle="Kamar dan Tarif" />
            <div className="mt-10 px-4">
                <Suspense fallback={<RoomSkeleton />} >
                    <Main />
                </Suspense>
            </div>
        </div>
    )
}

export default RoomPage
