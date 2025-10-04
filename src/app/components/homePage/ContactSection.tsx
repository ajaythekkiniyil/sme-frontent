import BasicEnquiryForm from "../basicEnquiryForm";

export default function ContactSection({ contactSectionData }: any) {
  return (
    <section className="py-16 sm:py-20 md:py-24" id='contact-us' data-aos="fade-up">
      <div className="container mx-auto px-6 grid grid-cols-1 gap-8 md:gap-12 items-start">
        {/* Left: Text */}
        <div className="text-left mb-8 md:mb-0" data-aos="fade-up">
          <h2 className="text-left text-3xl sm:text-3xl md:text-5xl font-medium text-[#273677]  md:leading-15 leading-9 mb-5 md:mb-5 sm:mb-5">Contact <span className='text-[#32a2dc]'>Us</span></h2>
          <p className="text-gray-600 max-w-xl text-sm sm:text-base md:text-lg">
            {/* {
                homePageData?.data.Contact_us_description[0].children[0].text === "" || !homePageData
                  ? "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
                  : homePageData?.data.Contact_us_description[0].children[0].text
              } */}
            {/* Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. */}
          </p>
        </div>
        {/* Right: Form */}
        <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-6 sm:p-8 md:p-12" data-aos="fade-up">
          <BasicEnquiryForm />
        </div>
      </div>
    </section>
  )
}