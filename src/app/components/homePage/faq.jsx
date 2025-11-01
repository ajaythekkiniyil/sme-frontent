import { ChevronDown } from "lucide-react";

export default function FAQSection({ mainContent, faq }) {
    return (
        <section className="bg-white mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px]" data-aos="fade-up">
            <div className="container mx-auto px-6">
                <div className="text-left mb-8 sm:mb-12">
                    <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">
                        {mainContent.title.split(',')[0]}
                        <span className='text-[#32a2dc]'>
                            {mainContent.title.split(',')[1]}
                        </span></h2>
                    <p className="text-gray-600 max-w-3xl text-sm sm:text-base md:text-lg">
                        {mainContent.description[0].children[0].text}
                    </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {faq.map((faq, i) => (
                        <details
                            key={i}
                            className="group rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6 transition" data-aos="fade-up"
                        >
                            <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
                                <span className="text-base sm:text-lg">{faq.question}</span>
                                {/* Chevron Icon */}
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-180" />
                            </summary>
                            <div className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                                {faq.answer.map((block, index) => (
                                    <div key={index}>
                                        {block.children.map((child, i) => (
                                            <p key={i}>{child.text}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}