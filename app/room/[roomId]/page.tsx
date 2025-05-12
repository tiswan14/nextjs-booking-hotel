import { Metadata } from "next"
import { Suspense } from "react"
import RoomDetail from "@/components/room-detail"

export const metadata: Metadata = {
    title: "Detail Kamar",
}

const RoomDetailPage = async ({
    params
}: {
    params: Promise<{ roomId: string }>
}) => {
    const roomId = (await params).roomId
    return (
        <div className="mt-16">
            <Suspense fallback={<p>Loading...</p>}>
                <RoomDetail roomId={roomId} />
            </Suspense>
        </div>
    )
}

export default RoomDetailPage
