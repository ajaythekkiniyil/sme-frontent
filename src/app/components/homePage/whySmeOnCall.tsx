import Image from "next/image";
import WhySme from '../../../../public/why-sme.png'
import Link from "next/link";

export default function WhySmeOnCallSection({ WhySmeOnCallSectionData }: any) {
    return (
        <section className="py-16 sm:py-20 md:py-24" data-aos="fade-up">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left: Text & Checklist */}
                <div data-aos="fade-up">
                    <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Why SME <span className='text-[#32a2dc]'>on Call</span></h2>
                    <p className="text-gray-600 max-w-xl mb-8 sm:mb-12 text-sm sm:text-base md:text-lg">
                        {WhySmeOnCallSectionData.why_sme_on_call_description}
                    </p>

                    <ul className="space-y-3 sm:space-y-4">
                        {
                            WhySmeOnCallSectionData.bullet_points.map((item: any, i: number) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded bg-green-100 text-green-600 text-sm sm:text-lg">
                                        ✓
                                    </span>
                                    <span className="text-gray-800 text-sm sm:text-lg">{item.text}</span>
                                </li>
                            ))
                        }
                    </ul>

                    <button className="mt-6 sm:mt-8 px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base sm:text-lg hover:bg-[#1e86bb] transition">
                        <Link href={WhySmeOnCallSectionData.primary_button_link}>
                            {WhySmeOnCallSectionData.primary_button_text}
                        </Link>
                    </button>
                </div>

                {/* Right: Image */}
                <div data-aos="fade-up">
                    <Image
                        src={WhySmeOnCallSectionData.image.url === "" ? WhySme : `${process.env.NEXT_PUBLIC_STRAPI_URL}${WhySmeOnCallSectionData.image.url}`}
                        alt="Team working together"
                        width={600}
                        height={400}
                        className="w-full h-[400px] rounded-xl object-cover"
                    />
                </div>
            </div>
        </section>
    )
}