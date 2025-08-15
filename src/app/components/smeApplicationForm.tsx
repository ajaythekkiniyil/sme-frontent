"use client"
import { useSmeApplicationSubmit } from "../hooks/smeApplicationSubmit"

export default function SmeApplicatoinForm() {
    const { smeApplication, message, loading, setSmeApplication, handleFileChange, handleSubmitEnquiry } = useSmeApplicationSubmit()

    return (
        <>
            <h1>SME Application Form</h1>
            <form onSubmit={handleSubmitEnquiry}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="m-2 block border p-1"
                    value={smeApplication.fullName}
                    onChange={(e) => setSmeApplication({ ...smeApplication, fullName: e.target.value })}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="m-2 block border p-1"
                    value={smeApplication.email}
                    onChange={(e) => setSmeApplication({ ...smeApplication, email: e.target.value })} />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="m-2 block border p-1"
                    value={smeApplication.phone}
                    onChange={(e) => setSmeApplication({ ...smeApplication, phone: e.target.value })}
                />
                <input
                    type="text"
                    name="linkedinUrl"
                    placeholder="LinkedIn Url"
                    className="m-2 block border p-1"
                    value={smeApplication.linkedinUrl}
                    onChange={(e) => setSmeApplication({ ...smeApplication, linkedinUrl: e.target.value })}
                />
                <select
                    name="experience"
                    className="m-2 block border p-1"
                    value={smeApplication.experience}
                    onChange={e => setSmeApplication({ ...smeApplication, experience: e.target.value })}
                >
                    <option value="10-15">10 - 15 years</option>
                    <option value="16-20">16 - 20 years</option>
                    <option value="21-25">21 - 25 years</option>
                    <option value="26-30">26 - 30 years</option>
                </select>
                <input
                    type="text"
                    name="pastCompanies"
                    placeholder="Past companies"
                    className="m-2 block border p-1"
                    value={smeApplication.pastCompanies}
                    onChange={(e) => setSmeApplication({ ...smeApplication, pastCompanies: e.target.value })}
                />
                <input
                    type="text"
                    name="expertiseAreas"
                    placeholder="Areas of expertise"
                    className="m-2 block border p-1"
                    value={smeApplication.expertiseAreas}
                    onChange={(e) => setSmeApplication({ ...smeApplication, expertiseAreas: e.target.value })}
                />
                <input
                    type="text"
                    name="languageSpoken"
                    placeholder="Languages spoken"
                    className="m-2 block border p-1"
                    value={smeApplication.languageSpoken}
                    onChange={(e) => setSmeApplication({ ...smeApplication, languageSpoken: e.target.value })}
                />
                <input
                    type="file"
                    name="resume"
                    accept=".doc,.pdf"
                    onChange={handleFileChange}
                />
                <input type="checkbox" name="accespt" required />
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