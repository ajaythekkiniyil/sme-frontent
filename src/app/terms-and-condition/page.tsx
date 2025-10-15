"use client";
import { JSX } from "react";
import { useComplainsSectionContent } from "../lib/complains-page/useComplainsSectionContent";
import CommonHeader from "../components/commonHeader";
import { defaultTermsandConditionHeaderData } from "../lib/terms-and-condition/defaultTermsandConditionHeaderData";


export default function SMEs() {
  const { data: complainsSectionData, isError } = useComplainsSectionContent();

  // Helper: fallback if backend is down or missing data
  const getSectionData = (key: string, defaultData: any) => {
    const section = complainsSectionData?.data?.[key];
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const complainsHeader = getSectionData("Header", defaultTermsandConditionHeaderData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={defaultTermsandConditionHeaderData} />

      {/* Dynamic Content Section */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          

          {/* ----------------------------- */}
          {/* STATIC PRIVACY NOTICE SECTION */}
          {/* ----------------------------- */}
          <div className="text-gray-800">
            
            <p className="text-lg mb-5">
            Please carefully review the Terms and Conditions of Network Membership. By proceeding and selecting “I Agree” below, you acknowledge that you have read, understood, and accepted all the Terms and Conditions governing your participation in the SMEONCALL network. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Introduction</h3>
            <p className="text-lg mb-5">
            These Terms and Conditions govern your participation as a Subject Matter Expert (SME) in the SMEONCALL network. By joining SMEONCALL, you agree to act as an independent consultant and not as an employee, agent, or partner. These terms are binding under the jurisdiction of the United Arab Emirates. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Membership Eligibility</h3>
            <p className="text-lg mb-5">
            By joining SMEONCALL, you confirm that:
            </p>
            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li>You are not bound by any agreement that prevents your participation.</li>
              <li>You will not disclose confidential, proprietary, or material non-public information (MNPI).</li>
              <li>You will only participate in projects that are compliant with your contractual and legal obligations.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Participation Rules</h3>
            <p className="text-lg mb-5">
            You agree to: 
            </p>

            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li>Abide by project-specific confidentiality requirements.</li>
              <li>Cease participation in any engagement that may breach legal or ethical guidelines.</li>
              <li>Notify SMEONCALL immediately if a session becomes non-compliant.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Confidentiality</h3>
            <p className="text-lg mb-5">
            You must maintain strict confidentiality of all information disclosed during client engagements.</p>

            <p className="text-lg mb-5">
            You may not use or share this information outside the scope of the consultation, and you may not disclose any client or platform details to third parties.</p>


            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Content Ownership</h3>
            <p className="text-lg mb-5">
            All deliverables created for a client during a consultation will be the sole property of the client.</p>

            <p className="text-lg mb-5">
            You retain ownership of your own pre-existing materials, provided they are not integrated into the project deliverables.</p>



            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Compliance and Conduct</h3>
            <p className="text-lg mb-5">
            You must:</p>
            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li>Complete annual compliance training provided by SMEONCALL.</li>
              <li>Avoid discussing topics restricted by your employer or legal agreements.</li>
              <li>Not offer investment, legal, or medical advice.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Non-Solicitation</h3>
            <p className="text-lg mb-5">
            You may not independently solicit, offer, or accept direct engagement with any SMEONCALL client for a period of 12 months following your last engagement through the platform.
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Termination</h3>
            <p className="text-lg mb-5">
            SMEONCALL reserves the right to terminate your membership at any time. 
            </p>

            <p className="text-lg mb-5">
            You may also voluntarily withdraw, but you must complete any ongoing obligations. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Governing Law</h3>
            <p className="text-lg mb-5">
            These Terms and Conditions are governed by the laws of the United Arab Emirates. 
            </p>

            <p className="text-lg mb-5">
            Any disputes shall be resolved through arbitration in Dubai, UAE, in accordance with local laws.
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Acceptance</h3>
            <p className="text-lg mb-5">
            By checking the acceptance box during registration or signing below, you agree to abide by these Terms and Conditions. 
            </p>

            
          </div>
        </div>
      </section>
    </>
  );
}
