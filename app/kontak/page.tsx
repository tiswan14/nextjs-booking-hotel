import { Metadata } from "next"
import HeaderSection from "@/components/header-section"
import ContactForm from "@/components/contact-form"
import {
    IoMailOutline,
    IoCallOutline,
    IoLocationOutline
} from "react-icons/io5"

export const metadata: Metadata = {
    title: "Kontak"
}
const ContactPage = () => {
    return (
        <div>
            <HeaderSection title="Kontak" subTitle="Hubungi Kami" />
            <div className="max-w-screen-xl mx-auto py-20 px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h1 className="text-lg text-gray-500 mb-3">Kontak Kami</h1>
                        <h1 className="text-5xl font-semibold texgra900 mb-4">Dapat hubungi melalui kontak di bawah ini</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus laboriosam fugit sed amet, id magni quibusdam repellat illum recusandae consequatur.</p>
                        <ul className="space-y-6 pt-8">
                            {[
                                {
                                    icon: <IoMailOutline className="size-6 text-white" />,
                                    title: "Email",
                                    value: "wanns@example.com",
                                },
                                {
                                    icon: <IoCallOutline className="size-6 text-white" />,
                                    title: "Nomor Telepon",
                                    value: "+62394943282",
                                },
                                {
                                    icon: <IoLocationOutline className="size-6 text-white" />,
                                    title: "Alamat",
                                    value: "Jl. Sukamulya No. 62 Ciamis, Kec. Ciamis, Kabupaten Ciamis, Jawa Barat 46211",
                                },
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-white hover:bg-gray-50 rounded-lg shadow transition-transform hover:scale-[1.02]"
                                >
                                    <div className="flex-none bg-orange-400 p-3 rounded-full shadow-md">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}:</h4>
                                        <p className="text-gray-600">{item.value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact Form */}
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

export default ContactPage
