import { Metadata } from "next";
import Image from "next/image";
import HeaderSection from "@/components/header-section";
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5";

export const metadata: Metadata = {
    title: "Tentang Kami",
    description: "Membangun masa depan digital dengan semangat kolaborasi",
}
const AboutPage = () => {
    return (
        <div>
            <HeaderSection
                title="Tentang Kami"
                subTitle="Membangun masa depan digital dengan semangat kolaborasi"
            />

            <section className="max-w-screen-xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="w-full">
                        <Image
                            src="/about-image.jpg"
                            width={650}
                            height={579}
                            alt="About Image"
                            className="rounded-2xl shadow-md"
                        />
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Siapa Kita?</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Kami adalah tim yang berdedikasi untuk memberikan solusi teknologi terbaik bagi Anda. Kami percaya bahwa kolaborasi dan inovasi adalah kunci untuk menciptakan perubahan positif.
                        </p>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <IoEyeOutline className="text-blue-600 size-7 mt-1" />
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Visi</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Menjadi pelopor dalam pengembangan teknologi yang memberdayakan masyarakat dan bisnis di era digital.
                                    </p>
                                </div>
                            </li>

                            <li className="flex items-start gap-4">
                                <IoLocateOutline className="text-green-600 size-7 mt-1" />
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Misi</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Menghadirkan solusi digital yang inovatif, berkualitas, dan mudah diakses oleh semua kalangan.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
