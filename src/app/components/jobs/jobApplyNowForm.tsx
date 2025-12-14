import { useSmeApplicationSubmit } from "@/app/hooks/smeApplicationSubmit"
import { useEffect } from "react"

export default function JobApplyNowForm({selectedJob}:any) {
  const { smeApplication, message, loading, setSmeApplication, handleResumeChange, handleCoverLetterChange, handleSubmitEnquiry } = useSmeApplicationSubmit()

  useEffect(()=>{
    setSmeApplication({ ...smeApplication, jobName: selectedJob })
  },[selectedJob])

  return (
    <div className="bg-white rounded-2xl p-15">
      <h2 className="text-3xl font-semibold text-[#273677] mb-15">Apply Now</h2>
      <form action="#" method="POST" encType="multipart/form-data" className="space-y-6" onSubmit={handleSubmitEnquiry}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            {/* Name Fields */}
            <label htmlFor="firstName" className="block text-md font-regular text-black mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.firstName}
              onChange={(e) => setSmeApplication({ ...smeApplication, firstName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-md font-regular text-black mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.lastName}
              onChange={(e) => setSmeApplication({ ...smeApplication, lastName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-md font-regular text-black mb-2">Email *</label>
            <input
              type="text"
              name="businessEmail"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.businessEmail}
              onChange={(e) => setSmeApplication({ ...smeApplication, businessEmail: e.target.value })}
            />
          </div>
        </div>
        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="phone" className="block text-md font-regular text-black mb-2">Phone *</label>
            <input
              type="text"
              name="businessNumber"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.businessNumber}
              onChange={(e) => setSmeApplication({ ...smeApplication, businessNumber: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-md font-regular text-black mb-2">Location (City) *</label>
            <input
              type="text"
              name="location"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.location}
              onChange={(e) => setSmeApplication({ ...smeApplication, location: e.target.value })}
            />
          </div>
          {/* Resume / CV */}
          <div>
            <label htmlFor="resume" className="block text-md font-regular text-black mb-2">Resume / CV * (File types: pdf, doc, docx, txt, rtf)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              required
              className="mt-1 p-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50"
              onChange={handleResumeChange}
            />
          </div>
        </div>
        {/* Cover Letter */}
        <div>
          <label htmlFor="coverLetter" className="block text-md font-regular text-black mb-2">Cover Letter (optional)</label>
          <input
            type="file"
            name="coverLetter"
            accept=".pdf,.doc,.docx,.txt,.rtf"
            className="mt-1 p-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-gray-50"
            onChange={handleCoverLetterChange}
          />
        </div>

        {/* Education Section */}
        <div className="space-y-4 mt-15">
          <h3 className="text-xl font-medium text-gray-800">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="school1" className="block text-md font-regular text-black mb-2">School</label>
              <input
                type="text"
                name="school"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
                value={smeApplication.school}
                onChange={(e) => setSmeApplication({ ...smeApplication, school: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="degree1" className="block text-md font-regular text-black mb-2">Degree</label>
              <select
                name="degree"
                value={smeApplication.degree}
                required
                onChange={(e) => setSmeApplication({ ...smeApplication, degree: e.target.value })}
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
              <select
                name="discipline"
                value={smeApplication.discipline}
                required
                onChange={(e) => setSmeApplication({ ...smeApplication, discipline: e.target.value })}
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
            <input
              type="date"
              name="endDate"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.endDate}
              onChange={(e) => setSmeApplication({ ...smeApplication, endDate: e.target.value })}
            />
          </div>
          {/* <button type="button" className="text-sm text-[#32A2DC] hover:underline">+ Add another education</button> */}
        </div>

        {/* Legal / Additional fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="legalFirstName" className="block text-md font-regular text-black mb-2">Legal First Name *</label>
            <input
              type="text"
              name="legalFirstName"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.legalFirstName}
              onChange={(e) => setSmeApplication({ ...smeApplication, legalFirstName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="legalLastName" className="block text-md font-regular text-black mb-2">Legal Last Name *</label>
            <input
              type="text"
              name="legalLastName"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.legalLastName}
              onChange={(e) => setSmeApplication({ ...smeApplication, legalLastName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="preferredFirstName" className="block text-md font-regular text-black mb-2">Preferred First Name *</label>
            <input
              type="text"
              name="preferredFirstName"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.preferredFirstName}
              onChange={(e) => setSmeApplication({ ...smeApplication, preferredFirstName: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="linkedin" className="block text-md font-regular text-black mb-2">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedinProfile"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.linkedinProfile}
              onChange={(e) => setSmeApplication({ ...smeApplication, linkedinProfile: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-md font-regular text-black mb-2">Website</label>
            <input
              type="url"
              name="website"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.website}
              onChange={(e) => setSmeApplication({ ...smeApplication, website: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="howFound" className="block text-md font-regular text-black mb-2">How or where did you find out about this role? *</label>
            <select
              name="whereDidYouFindOutAboutThisRole"
              value={smeApplication.whereDidYouFindOutAboutThisRole}
              required
              onChange={(e) => setSmeApplication({ ...smeApplication, whereDidYouFindOutAboutThisRole: e.target.value })}
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
                <input
                  type="radio"
                  name="previousEmployee"
                  value="Yes"
                  required
                  onChange={(e) =>
                    setSmeApplication({
                      ...smeApplication,
                      previousEmployee: e.target.value,
                    })
                  }
                  className="form-radio text-[#32A2DC]" />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="previousEmployee"
                  value="No"
                  required
                  onChange={(e) =>
                    setSmeApplication({
                      ...smeApplication,
                      previousEmployee: e.target.value,
                    })
                  }
                  className="form-radio text-[#32A2DC]" />
                <span className="ml-2">No</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="space-y-2 mb-6">
            <legend className="text-sm font-medium text-gray-700">Are you currently subject to any non-competition / non-disclosure agreement etc? *</legend>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="nonDisclosureAgreement"
                  value="Yes"
                  required
                  onChange={(e) =>
                    setSmeApplication({
                      ...smeApplication,
                      nonDisclosureAgreement: e.target.value,
                    })
                  }
                  className="form-radio text-[#32A2DC]" />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="nonDisclosureAgreement"
                  value="No"
                  onChange={(e) =>
                    setSmeApplication({
                      ...smeApplication,
                      nonDisclosureAgreement: e.target.value,
                    })
                  }
                  className="form-radio text-[#32A2DC]" />
                <span className="ml-2">No</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="space-y-2 mb-6">
            <legend className="text-sm font-medium text-gray-700">Are you related to any current SMEONCALL employees or clients? *</legend>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="relationStatus"
                  value="Yes"
                  required
                  onChange={(e) =>
                    setSmeApplication({
                      ...smeApplication,
                      relationStatus: e.target.value,
                    })
                  }
                  className="form-radio text-[#32A2DC]" />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="relationStatus"
                  value="No"
                  onChange={(e) =>
                    setSmeApplication({
                      ...smeApplication,
                      relationStatus: e.target.value,
                    })
                  }
                  className="form-radio text-[#32A2DC]" />
                <span className="ml-2">No</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="relationStatus"
                  value="None"
                  onChange={(e) =>
                    setSmeApplication({
                      ...smeApplication,
                      relationStatus: e.target.value,
                    })
                  }
                  className="form-radio text-[#32A2DC]" />
                <span className="ml-2">I am not related</span>
              </label>
            </div>
          </fieldset>
          <div className="mt-2 mb-6">
            <label htmlFor="relationName" className="block text-md font-regular text-black mb-2">If yes, please list the name</label>
            <input
              type="text"
              name="relationName"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-[#32A2DC] focus:border-[#32A2DC]"
              value={smeApplication.relationName}
              onChange={(e) => setSmeApplication({ ...smeApplication, relationName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-regular text-gray-700 mb-2 mt-8">
              <input type="checkbox" name="consent" id="consent" required className="mr-2 form-checkbox text-[#32A2DC]" />
              SMEONCALL has my consent to collect, store, and process my data for the purpose of considering me for employment, and for up to 365 days thereafter. *
            </label>
          </div>

        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer w-full px-6 py-3 bg-[#32A2DC] text-white rounded-full text-lg font-semibold hover:bg-[#2790c7] transition-colors duration-200">
            {loading ? 'Submiting...' : 'Submit Application'}
          </button>
          <p style={{padding: '20px 0'}}>{message}</p>
        </div>
      </form>
    </div>
  )
}