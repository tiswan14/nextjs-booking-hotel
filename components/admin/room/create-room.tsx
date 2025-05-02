import CreateForm from "./create-form";
import { getAmenities } from "@/lib/data";

const CreateRoom = async () => {
    const amenities = await getAmenities();

    if (!amenities) return <div>No amenities found</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tambah Kamar</h1>
            <CreateForm amenities={amenities} />
        </div>
    );
};


export default CreateRoom;
