"use client"
import { useActionState } from "react"
import { ContactMessage } from "@/lib/action"
import clsx from "clsx"


const ContactForm = () => {
    const [state, formAction, isPending] = useActionState(ContactMessage, null)


    return (
        <div className="bg-white p-8 rounded-sm shadow-sm">
            <form action={formAction}>
                {state?.message && (
                    <div
                        className="w-full mt-6 bg-green-100 border border-green-300 text-green-800 text-sm rounded-sm px-4 py-3"
                        role="alert"
                    >
                        <span className="font-medium">{state.message}</span>
                    </div>
                )}

                {state?.error?.global && (
                    <div
                        className="w-full mt-6 bg-red-100 border border-red-300 text-red-800 text-sm rounded-sm px-4 py-3"
                        role="alert"
                    >
                        <span className="font-medium">{state.error.global}</span>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-7 mt-6">
                    <div>
                        <input
                            type="text"
                            name="name"
                            className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
                            placeholder="Nama Kamu"
                        />
                        <p className="text-red-500 text-sm mt-2">{state?.error?.name}</p>
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
                            placeholder="Email Kamu"
                        />
                        <p className="text-red-500 text-sm mt-2">{state?.error?.email}</p>
                    </div>

                    <div className="col-span-2">
                        <input
                            type="text"
                            name="subject"
                            className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
                            placeholder="Subjek"
                        />
                        <p className="text-red-500 text-sm mt-2">{state?.error?.subject}</p>
                    </div>

                    <div className="col-span-2">
                        <textarea
                            rows={5}
                            name="message"
                            className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
                            placeholder="Pesan Kamu"
                        ></textarea>
                        <p className="text-red-500 text-sm mt-2">{state?.error?.message}</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className={clsx(
                        "mt-6 relative inline-flex items-center justify-center px-10 py-4 w-full font-semibold text-white rounded-sm transition-colors duration-300",
                        {
                            "bg-orange-400 hover:bg-orange-500 cursor-pointer": !isPending,
                            "bg-orange-300 cursor-not-allowed": isPending,
                        }
                    )}
                >
                    {isPending ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Mengirim...
                        </>
                    ) : (
                        "Kirim Pesan"
                    )}
                </button>


            </form>


        </div>
    )
}

export default ContactForm
