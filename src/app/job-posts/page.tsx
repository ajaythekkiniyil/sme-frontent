
import Image from "next/image";
import Link from "next/link";
import BannerImage from "../../../public/careers.jpg";
import CrTeam03 from "../../../public/cr-team-01.jpg";
import CrTeam04 from "../../../public/cr-team-07.jpg";
import CrTeam05 from "../../../public/cr-team-03.jpg";
import CrTeam06 from "../../../public/cr-team-05.jpg";
import CrTeam01 from "../../../public/cr-team-06.jpg";
import CrTeam02 from "../../../public/cr-team-02.jpg";
import { jobData } from "../lib/tempJobData";
import JobCard from "../components/jobCard";

export default function SMEs() {
  return (
    <>
      <section className="relative w-full h-[500px] sm:h-[700px] md:h-[900px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={BannerImage}
          alt="SME Banner"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient Overlay (bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#273677]/100 via-[#273677]/90 to-transparent"></div>

        {/* Content inside container */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 md:pb-28 pb-20">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-8 md:leading-[4rem] mb-6">
              Work {" "}
              <span className="text-[#32A2DC]">
                With Us
              </span>
            </h1>
            <p className="mb-8 md:mb-12 text-xl text-white font-thin">Subject Matter Experts (SMEs) bring curiosity, depth, and clarity to every professional decision that matters.</p>
            <Link href="/job-posts">
              <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
                View All Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>


      <section className="bg-[#F6FAFF] py-16 sm:py-24 md:py-32" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-15">
            {
              jobData?.map((job, index) => (
                <JobCard key={index} job={job} />
              ))
            }
          </div>
        </div>
      </section>

      <section className="pt-30 bg-[#F6FAFF]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1">
            <div>
              <h3 className="text-center text-3xl text-[#273677] mb-6 md:leading-12 leading-10 sm:leading-10 font-regular">At SMEOnCall, we welcome talent at every stage. If you're smart, curious, and passionate about making an impact, we’d love to hear from you. Check out our current openings and apply today. </h3>
            </div>
            <Link href="/careers-detail" className="mx-auto">
              <button className="cursor-pointer px-10 py-3 bg-[#32A2DC] text-white rounded-full text-lg hover:bg-[#2790c7] transition max-w-xl mx-auto">
                Join Now
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 mt-20">
          <div>
            <Image src={CrTeam01} alt="Clarity" className="w-full h-[450px] object-cover" />
          </div>
          <div>

            <Image src={CrTeam02} alt="Clarity" className="w-full h-[450px] object-cover" />
          </div>

          <div>
            <Image src={CrTeam03} alt="Clarity" className="w-full h-[450px] object-cover" />
          </div>

          <div>
            <Image src={CrTeam04} alt="Clarity" className="w-full h-[450px] object-cover" />
          </div>

          <div>
            <Image src={CrTeam05} alt="Clarity" className="w-full h-[450px] object-cover" />
          </div>

          <div>
            <Image src={CrTeam06} alt="Clarity" className="w-full h-[450px] object-cover" />
          </div>
        </div>
      </section>


    </>
  );
}
