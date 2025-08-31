"use client"
import { Paperclip } from "lucide-react"
import { useSubmitEnquiry } from "../hooks/submitEnquiry"

export default function BasicEnquiryForm() {
    const { enquiry, message, loading, attachments, setEnquiry, handleFileChange, handleSubmitEnquiry } = useSubmitEnquiry()

    return (
        <>
            <form className="space-y-4 sm:space-y-6 md:space-y-8" onSubmit={handleSubmitEnquiry}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">First Name*</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                        value={enquiry.firstName}
                        onChange={(e) => setEnquiry({ ...enquiry, firstName: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Last Name*</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                        value={enquiry.lastName}
                        onChange={(e) => setEnquiry({ ...enquiry, lastName: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Company</label>
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                        value={enquiry.company}
                        onChange={(e) => setEnquiry({ ...enquiry, company: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Email Address*</label>
                        <input
                            type="email"
                            name="businessEmail"
                            placeholder="Your email address*"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                            value={enquiry.businessEmail}
                            onChange={(e) => setEnquiry({ ...enquiry, businessEmail: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                            Phone Number*
                        </label>
                        <input
                            type="tel"
                            name="businessNumber"
                            placeholder="Your phone number"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                            value={enquiry.businessNumber}
                            onChange={(e) => setEnquiry({ ...enquiry, businessNumber: e.target.value.replace(/\D/g, "") })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                            value={enquiry.location}
                            onChange={(e) => setEnquiry({ ...enquiry, location: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                            value={enquiry.location}
                            onChange={(e) => setEnquiry({ ...enquiry, location: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Field</label>
                        <input
                            type="text"
                            name="field"
                            placeholder="Field"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                            value={enquiry.field}
                            onChange={(e) => setEnquiry({ ...enquiry, field: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Message</label>
                    <textarea
                        name="enquiry"
                        placeholder="Write your enquiry here..."
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:ring-2 focus:ring-[#32A2DC] focus:outline-none text-sm sm:text-base"
                        value={enquiry.enquiry}
                        onChange={(e) => setEnquiry({ ...enquiry, enquiry: e.target.value })}
                    />
                </div>

                <label className="flex items-center space-x-2 text-gray-600 text-sm cursor-pointer hover:text-[#32A2DC] transition">
                    <Paperclip className="w-4 h-4" />
                    <span>Add an attachment</span>
                    <input
                        type="file"
                        name="file"
                        multiple
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {/* Show selected file details */}
                {attachments?.length > 0 && (
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                        {attachments?.map((file, index) => (
                            <li key={index}>
                                {file.name} <span className="text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    type="submit"
                    className="px-6 py-3 bg-[#32A2DC] text-white rounded-full text-base sm:text-lg hover:bg-[#1e86bb] transition"
                >
                    {loading ? 'Submiting...' : 'Send Message'}
                </button>
            </form>
        </>
    )
}