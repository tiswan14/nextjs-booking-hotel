'use client'
import { useRef, useState, useTransition } from "react"
import { useActionState } from "react"
import { saveRoom } from "@/lib/action"
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5"
import { type PutBlobResult } from "@vercel/blob"
import Image from "next/image"
import { BarLoader } from "react-spinners"
import { Amenities } from "@prisma/client"
import clsx from "clsx"

const CreateForm = ({ amenities }: { amenities: Amenities[] }) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");

    const [pending, startTransition] = useTransition();

    const handleUpload = () => {
        const fileInput = inputFileRef.current;

        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            setMessage("Tidak ada file yang dipilih.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.set("file", file);
        startTransition(async () => {
            try {
                const response = await fetch("/api/upload", {
                    method: "PUT",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    setMessage(data.message || "Gagal mengunggah file.");
                    return;
                }

                const img = data as PutBlobResult;
                setImage(img.url);
                setMessage("");
            } catch (error) {
                console.error("Upload error:", error);
                setMessage("Terjadi kesalahan saat mengunggah.");
            }
        });
    };

    const deleteImage = (image: string) => {
        startTransition(async () => {
            try {
                await fetch(`/api/upload?imageUrl=${image}`, {
                    method: "DELETE",
                });
                setImage("");
                setMessage("");
            } catch (error) {
                console.log(error);
                setMessage("Terjadi kesalahan saat menghapus gambar.");
            }
        });
    };

    const [state, formAction, isPending] = useActionState(saveRoom.bind(null, image), null)


    return (
        <form action={formAction} className='grid md:grid-cols-12 gap-5'>
            <div className='col-span-12 md:col-span-8 bg-white p-4'>
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        className='py-2 px-4 rounded-sm border border-gray-400 w-full'
                        placeholder='Nama Kamar'
                    />
                    <div aria-live='polite' aria-atomic='true'>
                        <span className='block text-sm text-red-500 mt-2 text-left'>{state?.error?.name}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <textarea
                        name="description"
                        rows={8}
                        placeholder="Deskripsi"
                        className="py-3 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none w-full resize-none text-gray-700 placeholder-gray-500 transition-all duration-300"
                    />
                    <div aria-live="polite" aria-atomic="true">
                        <span className="block text-sm text-red-500 mt-2 text-left">{state?.error?.description}</span>
                    </div>
                </div>

                {amenities.map((item, index) => (
                    <div key={item?.id ?? index} className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            name="amenities"
                            value={item.id}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 capitalize">
                            {item.name}
                        </label>
                    </div>
                ))}


                <div aria-live="polite" aria-atomic="true">
                    <span className="block text-sm text-red-500 mt-2 text-left">
                        {state?.error?.amenities}
                    </span>
                </div>



            </div>

            <div className="col-span-12 md:col-span-4 bg-white p-4">
                <label htmlFor="input-file" className='flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative'>

                    <div className='flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10'>
                        <div className="flex flex-col items-center justify-center">
                            {pending && <BarLoader />}

                            {image ? (
                                <button
                                    type="button"
                                    onClick={() => deleteImage(image)}
                                    className="flex items-center justify-center bg-red-500 size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-600"
                                >
                                    <IoTrashOutline className="size-4" />
                                </button>
                            ) : (
                                <>
                                    <IoCloudUploadOutline className="size-8" />
                                    <p className='mb-1 text-sm font-bold'>Pilih Gambar</p>
                                    {message ? (
                                        <p className="text-xs text-red-500">{message}</p>
                                    ) : (
                                        <p className='text-xs'>SVG, PNG, JPG, GIF, or Others (max: 4MB)</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>


                    {!image ? (
                        <input type="file" ref={inputFileRef} className="hidden" id="input-file" onChange={handleUpload} />
                    ) : (
                        <Image
                            src={image}
                            width={640}
                            height={360}
                            alt="room"
                            className="rounded-md absolute aspect-video object-cover"
                        />
                    )}
                </label>

                <div className="mb-4">
                    <input
                        type="text"
                        name="capacity"
                        className='py-2 px-4 rounded-sm border border-gray-400 w-full'
                        placeholder='Kapasitas'
                    />
                    <div aria-live='polite' aria-atomic='true'>
                        <span className='block text-sm text-red-500 mt-2 text-left'>{state?.error?.capacity}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="price"
                        className='py-2 px-4 rounded-sm border border-gray-400 w-full'
                        placeholder='Masukan Harga'
                    />
                    <div aria-live='polite' aria-atomic='true'>
                        <span className='block text-sm text-red-500 mt-2 text-left'>{state?.error?.price}</span>
                    </div>
                </div>

                {/* General Message */}
                {state?.message ? (
                    <div className="mb-4 bg-red-200 p-2">
                        <span className="text-sm text-gray-700 mt-2">{state?.message}</span>
                    </div>

                ) : null}

                <button
                    type="submit"
                    className={clsx("bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer mt-4", { "opacity-50 cursor-progress": isPending })} disabled={isPending}
                >
                    {isPending ? "Meyimpan..." : "Simpan"}
                </button>

            </div>

        </form>
    )
}

export default CreateForm;



