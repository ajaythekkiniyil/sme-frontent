"use client"
import { useSubmitEnquiry } from "../hooks/submitEnquiry"

export default function BasicEnquiryForm() {
    const { enquiry, message, loading, setEnquiry, handleFileChange, handleSubmitEnquiry } = useSubmitEnquiry()

    return (
        <>
            <h1>Enquiry Form</h1>
            <form onSubmit={handleSubmitEnquiry}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="m-2 block border p-1"
                    value={enquiry.firstName}
                    onChange={(e) => setEnquiry({ ...enquiry, firstName: e.target.value })}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="m-2 block border p-1"
                    value={enquiry.lastName}
                    onChange={(e) => setEnquiry({ ...enquiry, lastName: e.target.value })}
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    className="m-2 block border p-1"
                    value={enquiry.company}
                    onChange={(e) => setEnquiry({ ...enquiry, company: e.target.value })}
                />
                <input
                    type="tel"
                    name="businessNumber"
                    placeholder="Business Number"
                    className="m-2 block border p-1"
                    value={enquiry.businessNumber}
                    onChange={(e) => setEnquiry({ ...enquiry, businessNumber: e.target.value.replace(/\D/g, "") })}
                />
                <input
                    type="email"
                    name="businessEmail"
                    placeholder="Business Email"
                    className="m-2 block border p-1"
                    value={enquiry.businessEmail}
                    onChange={(e) => setEnquiry({ ...enquiry, businessEmail: e.target.value })}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="m-2 block border p-1"
                    value={enquiry.location}
                    onChange={(e) => setEnquiry({ ...enquiry, location: e.target.value })}
                />
                <input
                    type="text"
                    name="field"
                    placeholder="Field"
                    className="m-2 block border p-1"
                    value={enquiry.field}
                    onChange={(e) => setEnquiry({ ...enquiry, field: e.target.value })}
                />
                <textarea
                    name="enquiry"
                    placeholder="Enquiry"
                    className="m-2 block border p-1"
                    value={enquiry.enquiry}
                    onChange={(e) => setEnquiry({ ...enquiry, enquiry: e.target.value })}
                />
                <input
                    type="file"
                    name="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                />
                <div>
                    <button type="submit" className="p-2" style={{ background: 'blue', color: 'white' }}>
                        {loading ? 'Submiting...' : 'Submit'}
                    </button>
                </div>
                {message}
            </form>
        </>
    )
}