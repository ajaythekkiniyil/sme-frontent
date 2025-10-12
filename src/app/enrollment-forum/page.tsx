"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import BannerImage from "../../../public/sme-about.jpg";
import Gallery01 from "../../../public/about-gal-01.jpg";
import Gallery02 from "../../../public/about-gal-02.jpg";
import Gallery03 from "../../../public/about-gal-03.jpg";
import Gallery04 from "../../../public/about-gal-04.jpg";
import Clarity from "../../../public/clarity.svg";
import Customer from "../../../public/customer.svg";
import Trust from "../../../public/trust.svg";
import Better from "../../../public/better.svg";
import Speed from "../../../public/speed.svg";
import GeneralManager from '../../../public/general-manager-sme.jpg'

export default function SMEs() {


    const imageSliderSettings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false, // hide prev/next arrows
        cssEase: "ease-in-out",
      };


      const Featuredexperts = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1, // desktop default
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,   // ✅ hide both next/prev arrows
        responsive: [
          { breakpoint: 1280, settings: { slidesToShow: 3 } },
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
      };



      const experts = [
        {
          name: "Noah Oliver",
          role: "General Manager",
          img: GeneralManager,
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
          name: "Samantha Nguyen",
          role: "Compliance Specialist",
          img: "/team-4.jpg",
          desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
          name: "Michelle Garcia",
          role: "SEO Specialist",
          img: "/team-2.jpg",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also ",
        },
        {
          name: "Kobie Mainoo",
          role: "Marketing Manager",
          img: "/team-3.jpg",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
      ];
      


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
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 md:mb-12 leading-8 md:leading-[4rem]">
            Enrollment {" "}
              <span className="text-[#32A2DC]">
              Forum
              </span>
            </h1>
            {/* <button className="cursor-pointer px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
              Join Our Network
            </button> */}
          </div>
        </div>
      </section>

      <section className="bg-[#F6FAFF] py-16">
        <div className="container mx-auto px-6">


          {/* Static Form */}
          <div className="bg-white rounded-2xl p-15">
            <h2 className="text-3xl font-semibold text-[#273677] mb-15">Apply Now</h2>
            <form action="#" method="POST" encType="multipart/form-data" className="space-y-6">

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-md font-regular text-black mb-2">First Name *</label>
                  <input type="text" name="firstName" id="firstName" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-md font-regular text-black mb-2">Last Name *</label>
                  <input type="text" name="lastName" id="lastName" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-md font-regular text-black mb-2">Email *</label>
                  <input type="email" name="email" id="email" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <label htmlFor="phone" className="block text-md font-regular text-black mb-2">Phone *</label>
                  <input type="tel" name="phone" id="phone" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

                <div>
                  <label htmlFor="city" className="block text-md font-regular text-black mb-2">Location (City) *</label>
                  <input type="text" name="city" id="city" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

                {/* Resume / CV */}
                <div>
                  <label htmlFor="resume" className="block text-md font-regular text-black mb-2">Resume / CV * (File types: pdf, doc, docx, txt, rtf)</label>
                  <input type="file" name="resume" id="resume" accept=".pdf,.doc,.docx,.txt,.rtf" required
                    className="mt-1 p-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50" />
                </div>
              </div>


              {/* Cover Letter */}
              <div>
                <label htmlFor="coverLetter" className="block text-md font-regular text-black mb-2">Cover Letter (optional)</label>
                <input type="file" name="coverLetter" id="coverLetter" accept=".pdf,.doc,.docx,.txt,.rtf"
                  className="mt-1 p-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50" />
              </div>

              {/* Education Section */}
              <div className="space-y-4 mt-15">
                <h3 className="text-xl font-medium text-gray-800">Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="school1" className="block text-md font-regular text-black mb-2">School</label>
                    <input type="text" name="school1" id="school1"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                  </div>
                  <div>
                    <label htmlFor="degree1" className="block text-md font-regular text-black mb-2">Degree</label>
                    <select name="degree1" id="degree1"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]">
                      <option value="">-- Select Degree --</option>
                      <option>High School</option>
                      <option>Associate's Degree</option>
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>Master of Business Administration (M.B.A.)</option>
                      <option>Juris Doctor (J.D.)</option>
                      <option>Doctor of Medicine (M.D.)</option>
                      <option>Doctor of Philosophy (Ph.D.)</option>
                      <option>Engineer's Degree</option>
                      <option>Other</option>
                    </select>
                  </div>


                  <div>
                    <label htmlFor="discipline1" className="block text-md font-regular text-black mb-2">Discipline</label>
                    <select name="discipline1" id="discipline1"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]">
                      <option value="">-- Select Discipline --</option>
                      <option>Accounting</option>
                      <option>African Studies</option>
                      <option>Agriculture</option>
                      <option>Anthropology</option>
                      <option>Applied Health Services</option>
                      <option>Architecture</option>
                      <option>Art</option>
                      <option>Asian Studies</option>
                      <option>Biology</option>
                      <option>Business</option>
                      <option>Business Administration</option>
                      <option>Chemistry</option>
                      <option>Classical Languages</option>
                      <option>Communications & Film</option>
                      <option>Computer Science</option>
                      <option>Dentistry</option>
                      <option>Developing Nations</option>
                      <option>Discipline Unknown</option>
                      <option>Earth Sciences</option>
                      <option>Economics</option>
                      <option>Education</option>
                      <option>Electronics</option>
                      <option>Engineering</option>
                      <option>English Studies</option>
                      <option>Environmental Studies</option>
                      <option>European Studies</option>
                      <option>Fashion</option>
                      <option>Finance</option>
                      <option>Fine Arts</option>
                      <option>General Studies</option>
                      <option>Health Services</option>
                      <option>History</option>
                      <option>Human Resources Management</option>
                      <option>Humanities</option>
                      <option>Industrial Arts & Carpentry</option>
                      <option>Information Systems</option>
                      <option>International Relations</option>
                      <option>Journalism</option>
                      <option>Languages</option>
                      <option>Latin American Studies</option>
                      <option>Law</option>
                      <option>Linguistics</option>
                      <option>Manufacturing & Mechanics</option>
                      <option>Mathematics</option>
                      <option>Medicine</option>
                      <option>Middle Eastern Studies</option>
                      <option>Naval Science</option>
                      <option>North American Studies</option>
                      <option>Nuclear Technics</option>
                      <option>Operations Research & Strategy</option>
                      <option>Organizational Theory</option>
                      <option>Philosophy</option>
                      <option>Physical Education</option>
                      <option>Physical Sciences</option>
                      <option>Physics</option>
                      <option>Political Science</option>
                      <option>Psychology</option>
                      <option>Public Policy</option>
                      <option>Public Service</option>
                      <option>Religious Studies</option>
                      <option>Russian & Soviet Studies</option>
                      <option>Scandinavian Studies</option>
                      <option>Science</option>
                      <option>Slavic Studies</option>
                      <option>Social Science</option>
                      <option>Social Sciences</option>
                      <option>Sociology</option>
                      <option>Speech</option>
                      <option>Statistics & Decision Theory</option>
                      <option>Urban Studies</option>
                      <option>Veterinary Medicine</option>
                      <option>Other</option>
                    </select>
                  </div>



                </div>

                <div>
                  <label htmlFor="endDate1" className="block text-md font-regular text-black mb-2">End Date</label>
                  <input type="date" name="endDate1" id="endDate1"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

                <button type="button" className="text-sm text-[#32A2DC] hover:underline">+ Add another education</button>
              </div>

              {/* Legal / Additional fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <label htmlFor="legalFirstName" className="block text-md font-regular text-black mb-2">Legal First Name *</label>
                  <input type="text" name="legalFirstName" id="legalFirstName" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

                <div>
                  <label htmlFor="legalLastName" className="block text-md font-regular text-black mb-2">Legal Last Name *</label>
                  <input type="text" name="legalLastName" id="legalLastName" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

                <div>
                  <label htmlFor="preferredFirstName" className="block text-md font-regular text-black mb-2">Preferred First Name *</label>
                  <input type="text" name="preferredFirstName" id="preferredFirstName" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

              </div>




              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="linkedin" className="block text-md font-regular text-black mb-2">LinkedIn Profile</label>
                  <input type="url" name="linkedin" id="linkedin"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>
                <div>
                  <label htmlFor="website" className="block text-md font-regular text-black mb-2">Website</label>
                  <input type="url" name="website" id="website"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>
                <div>
                  <label htmlFor="howFound" className="block text-md font-regular text-black mb-2">How or where did you find out about this role? *</label>
                  <select name="howFound" id="howFound" required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]">
                    <option value="">Select one</option>
                    <option>LinkedIn</option>
                    <option>Word of mouth</option>
                    <option>Others</option>
                  </select>
                </div>
              </div>



              <div className="md:col-span-2">
                <fieldset className="space-y-2 mb-6">
                  <legend className="text-sm font-medium text-gray-700">Have you previously been employed by SMEONCALL? *</legend>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="prevEmployed" value="yes" className="form-radio text-[#32A2DC]" />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="prevEmployed" value="no" className="form-radio text-[#32A2DC]" />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </fieldset>

                <fieldset className="space-y-2 mb-6">
                  <legend className="text-sm font-medium text-gray-700">Are you currently subject to any non-competition / non-disclosure agreement etc? *</legend>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="legalObligation" value="yes" className="form-radio text-[#32A2DC]" />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="legalObligation" value="no" className="form-radio text-[#32A2DC]" />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </fieldset>

                <fieldset className="space-y-2 mb-6">
                  <legend className="text-sm font-medium text-gray-700">Are you related to any current SMEONCALL employees or clients? *</legend>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="relationStatus" value="yes" className="form-radio text-[#32A2DC]" />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="relationStatus" value="no" className="form-radio text-[#32A2DC]" />
                      <span className="ml-2">No</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="relationStatus" value="none" className="form-radio text-[#32A2DC]" />
                      <span className="ml-2">I am not related</span>
                    </label>
                  </div>
                </fieldset>

                <div className="mt-2 mb-6">
                  <label htmlFor="relationName" className="block text-md font-regular text-black mb-2">If yes, please list the name</label>
                  <input type="text" name="relationName" id="relationName"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]" />
                </div>

                <div>
                  <label className="block text-sm font-regular text-gray-700 mb-2 mt-8">
                    <input type="checkbox" name="consent" id="consent" required className="mr-2 form-checkbox text-[#32A2DC]" />
                    SMEONCALL has my consent to collect, store, and process my data for the purpose of considering me for employment, and for up to 365 days thereafter. *
                  </label>
                </div>

              </div>


              <div>
                <button type="submit"
                  className="cursor-pointer w-full px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg font-semibold hover:bg-[#2790c7] transition-colors duration-200">
                  Submit Application
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>










   











    </>
  );
}
