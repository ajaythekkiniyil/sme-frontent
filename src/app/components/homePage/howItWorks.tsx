import { FileCheck, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection({ HowItWorksData }: any) {    
    return (
        <section className="bg-[#fff] py-16 sm:py-20 lg:py-28" data-aos="fade-up">
        <div className="container mx-auto px-6 items-center">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-center mb-15 mx-auto'>
            <div>
              <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677] md:leading-15 leading-9 mb-5 md:mb-0 sm:mb-0">Ask SMEs<br /> How it <span className='text-[#32a2dc]'>Works</span></h2>
            </div>

            <div>
              <Link href="/#contact-us" className="cursor-pointer md:float-right md:text-right sm:float-right sm:text-right px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base sm:text-lg hover:bg-[#1e86bb] transition">
                Contact Now
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {/* Step 01 */}
            <div className="border border-gray-300 p-10" data-aos="fade-up">
              <h2 className="text-6xl text-[#273677]">01</h2>
              {/* <MessageSquare className="w-10 h-10 my-8 text-[#32A2DC]" /> */}
              <h3 className="text-2xl text-black mb-3">{HowItWorksData[0]?.step_title}</h3>
              <p className="mb-8 text-gray-950 text-lg font-light">
                {HowItWorksData[0]?.step_description[0].children[0].text}
              </p>
              {/* <Link href={HowItWorksData[0]?.primary_button_link} className="text-[#32A2DC] text-lg border-b border-b-[#32A2DC]">
                {HowItWorksData[0]?.primary_button_text}
              </Link> */}
            </div>

            {/* Step 02 */}
            <div className="border border-gray-300 p-10" data-aos="fade-up">
              <h2 className="text-6xl text-[#273677]">02</h2>
              {/* <Users className="w-10 h-10 my-8 text-[#32A2DC]" /> */}
              <h3 className="text-2xl text-black mb-3">{HowItWorksData[1]?.step_title}</h3>
              <p className="mb-8 text-gray-950 text-lg font-light">
                {HowItWorksData[1]?.step_description[0].children[0].text}
              </p>
              {/* <Link href={HowItWorksData[1]?.primary_button_link ?? "#"} className="text-[#32A2DC] text-lg border-b border-b-[#32A2DC]">
                {HowItWorksData[1]?.primary_button_text}
              </Link> */}
            </div>

            {/* Step 03 */}
            <div className="border border-gray-300 p-10" data-aos="fade-up">
              <h2 className="text-6xl text-[#273677]">03</h2>
              {/* <FileCheck className="w-10 h-10 my-8 text-[#32A2DC]" /> */}
              <h3 className="text-2xl text-black mb-3">{HowItWorksData[2]?.step_title}</h3>
              <p className="mb-8 text-gray-950 text-lg font-light">
                {HowItWorksData[2]?.step_description[0].children[0].text}
              </p>
              {/* <Link href={HowItWorksData[2]?.primary_button_link ?? "#"} className="text-[#32A2DC] text-lg border-b border-b-[#32A2DC]">
                {HowItWorksData[2]?.primary_button_text}
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    )
}

