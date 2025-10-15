"use client";
import { JSX } from "react";
import { useComplainsSectionContent } from "../lib/complains-page/useComplainsSectionContent";
import CommonHeader from "../components/commonHeader";
import { defaultPrivacyHeaderData } from "../lib/privacy-policy/defaultPrivacyHeaderData";


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

  const complainsHeader = getSectionData("Header", defaultPrivacyHeaderData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={complainsHeader} />

      {/* Dynamic Content Section */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          

          {/* ----------------------------- */}
          {/* STATIC PRIVACY NOTICE SECTION */}
          {/* ----------------------------- */}
          <div className="text-gray-800">
            <h2 className="text-3xl font-bold text-[#273677] mb-6">
            Introduction
            </h2>
            <p className="text-xl mb-5">October 2025</p>

            <p className="text-lg mb-5">
            SMEONCALL is committed to protecting your privacy. This Privacy Notice explains how we collect, use, store, and protect your personal information when you engage with our platform, whether as a Subject Matter Expert (SME), client, or visitor.
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Data We Collect</h3>
            <p className="text-lg mb-5">
            We collect only the necessary personal data for delivering and improving our services. This includes:
            </p>
            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li><strong>Identification Data:</strong> Full name, job title, nationality, CV, professional experience.</li>
              <li><strong>Contact Details:</strong> Email address, phone number, LinkedIn profile, city and country.</li>
              <li><strong>Professional Information:</strong> Areas of expertise, work history, rates, project interests.</li>
              <li><strong>Usage Data:</strong> IP address, browser type, device data, and visit logs.</li>
              <li><strong>Communication Data:</strong> Any correspondence between you and SMEONCALL.</li>
              <li><strong>Financial Data:</strong> (If applicable) IBAN/bank account info for expert payments.</li>
              <li>We do not knowingly collect sensitive personal data unless required and with your explicit consent. </li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Why We Collect This Data</h3>
            <p className="text-lg mb-5">
            We collect and process data for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li>To evaluate and onboard SME experts</li>
              <li>To match experts with client opportunities</li>
              <li>To facilitate communications between clients and experts</li>
              <li>To issue invoices or process payments</li>
              <li>To respond to inquiries or support requests</li>
              <li>To analyze platform performance and improve services</li>
              <li>To comply with applicable laws and regulations</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">How We Share Your Data</h3>
            <p className="text-lg mb-5">
            We may share your data with the following entities when necessary: 
            </p>

            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li>Clients seeking SME support</li>
              <li>Payment processing providers</li>
              <li>Website hosting and security service providers</li>
              <li>Government authorities, if legally required</li>
            </ul>
            <p className="text-lg mb-5">
            We will never sell your data to third parties. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Your Rights</h3>
            <p className="text-lg mb-5">
            Under UAE and international data protection standards, you may: </p>
            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li>Request access to your data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal constraints)</li>
              <li>Object to certain types of processing</li>
              <li>Withdraw consent at any time </li>
                <li>Lodge a complaint with a local data authority </li>
            </ul>
            <p className="text-lg mb-5">
            To exercise these rights, please email: <strong>privacy@smeoncall.com</strong> We may require identity verification before processing any request. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Data Security</h3>
            <p className="text-lg mb-5">
            We implement appropriate technical and organizational measures to secure your data, including:</p>
            <ul className="list-disc pl-6 mb-5 space-y-2 text-lg">
              <li>Encryption of sensitive data</li>
              <li>Secure cloud storage providers</li>
              <li>Access restrictions for staff and vendors</li>
              <li>Regular review of security protocols</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Retention</h3>
            <p className="text-lg mb-5">
            Your data is retained for as long as necessary to fulfill the purposes outlined above or as required by law. You may request earlier deletion if there is no legal obligation to retain it. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Marketing Communications</h3>
            <p className="text-lg mb-5">
            You may receive emails or updates about services, platform improvements, or opportunities. You can unsubscribe at any time by clicking the unsubscribe link or emailing <strong>privacy@smeoncall.com</strong>.
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Cookies</h3>
            <p className="text-lg mb-5">
            We use cookies to analyze traffic and personalize your experience. By using our platform, you consent to our use of cookies. You can manage cookie preferences via your browser settings.
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">International Transfers</h3>
            <p className="text-lg mb-5">
            If your data is shared with a client or expert outside the UAE, we will ensure that adequate data protection standards are met through standard safeguards and confidentiality agreements. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Governing Law and Jurisdiction</h3>
            <p className="text-lg mb-5">
            This Privacy Notice is governed by the laws of the United Arab Emirates. Any disputes shall be resolved exclusively in the courts of Dubai, UAE. 
            </p>

            <h3 className="text-2xl font-semibold text-[#273677] mb-3">Contact Us</h3>
            <p className="text-lg mb-5">
            For any privacy-related inquiries, contact: 
            </p>
            <p className="text-lg">
              SMEONCALL Legal & Compliance<br />
              Email: <strong>privacy@smeoncall.com</strong><br />
              [Insert Company Address, UAE]
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
