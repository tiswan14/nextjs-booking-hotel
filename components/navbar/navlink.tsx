"use client"
import { useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'
import clsx from 'clsx'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'


const Navlink = () => {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()
    return (
        <>
            {session?.user ? (
                <div className="flex items-center justify-end md:order-2 gap-4">
                    {/* Avatar */}
                    <div
                        className="hidden md:block w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:ring-2 hover:ring-gray-300 transition duration-200 cursor-pointer"
                        title={session.user.name || "User"}
                    >
                        <Image
                            src={session.user.image || "/avatar.svg"}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Logout Button */}
                    <div onClick={() => signOut()} className="hidden md:block">
                        <button className="py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition duration-200">
                            Logout
                        </button>
                    </div>
                </div>

            ) : null}
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
            >
                {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
            </button>
            <div className={clsx("w-full md:block md:w-auto", { "hidden": !open })}>
                <ul className="flex flex-col font-semibold text-sm uppercase p-5 mt-5 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-6 md:p-0 md:mt-0 md:border-0 md:bg-white">
                    <li>
                        <Link href="/" className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                            Tentang Kami
                        </Link>
                    </li>
                    <li>
                        <Link href="/rooms" className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                            Ruangan
                        </Link>
                    </li>
                    <li>
                        <Link href="/kontak" className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                            Kontak
                        </Link>
                    </li>
                    {session && (
                        <>
                            <li>
                                <Link href="/reservasi" className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                                    Reservasi
                                </Link>
                            </li>
                            {session.user.role === "admin" && (
                                <>
                                    <li>
                                        <Link href="/admin/dashboard" className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                                            Dasboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/room" className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">
                                            Manage Room
                                        </Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                    {session ? (
                        <li className="pt-8 px-3 md:pt-0">
                            <button onClick={() => signOut()} className="md:hidden py-2.5 px-4 bg-red-400 text-white hover:bg-red-600 rounded-sm cursor-pointer">
                                Logout
                            </button>
                        </li>
                    ) : (

                        <li className="pt-8 px-3 md:pt-0">
                            <Link href="/register" className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm">
                                Daftar
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>

    )
}

export default Navlink
