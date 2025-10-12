"use client";
import Image from "next/image";
import BannerImage from "../../../public/sme-about.jpg";

export default function SMEs() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative w-full h-[500px] sm:h-[700px] md:h-[900px] overflow-hidden">
        <Image
          src={BannerImage}
          alt="SME Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#273677]/100 via-[#273677]/90 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 md:pb-28 pb-20">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 md:mb-12 leading-8 md:leading-[4rem]">
              SMEONCALL’s Rigorous{" "}
              <span className="text-[#32A2DC]">Compliance Framework</span>
            </h1>
          </div>
        </div>
      </section>


      {/* Compliance Framework */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#273677] mb-8">Overview</h2>
          <p className="text-lg mb-5 leading-8">
            As a trailblazer in the industry, SMEONCALL has defined and refined
            compliance protocols for expert networks. Compliance isn't just a
            requirement—it’s integral to our operations and culture. Our
            cutting-edge compliance infrastructure ensures that clients access
            actionable insights through methods that are structured, auditable,
            and transparent, all in line with the most stringent professional
            norms and industry best practices.
          </p>
          <p className="text-lg mb-5 leading-8">
            Our clients greatly trust our experts for their counsel—but they also
            understand that certain boundaries govern what these experts can
            divulge. Over the last ten years, we’ve invested heavily—both
            financially and in time—to build the industry’s most sophisticated
            compliance system. It empowers experts to manage conflicts and align
            with clients’ own protocols, and stands as a key competitive
            advantage for us.
          </p>
          <p className="text-lg mb-10 leading-8">
            SMEONCALL’s Compliance department includes over [X] professionals,
            led by [Name], who brings nearly [X] years of experience.
          </p>

          <h2 className="text-2xl font-semibold text-[#273677] mb-6">
            For Network Members (Experts)
          </h2>
          <h3 className="text-xl font-medium mb-3">Agreement and Reaffirmation</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
            <li>Have reviewed any applicable agreements and are allowed to engage as SMEONCALL experts.</li>
            <li>Will refuse any project that breaches their contractual obligations.</li>
            <li>Will not divulge confidential or material non-public information.</li>
            <li>Will maintain strict confidentiality regarding client information.</li>
            <li>Will withdraw from any project if it crosses into prohibited territory (with compensation offered).</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Training</h3>
          <p className="text-lg mb-6 leading-8">
            Every year, experts must complete our interactive, proprietary
            training module. These modules explain what counts as “confidential
            information” and underscore the importance of adhering to disclosure
            restrictions. Experts are reminded that even unintentional breaches
            could undermine research integrity and force clients to abandon
            significant work.
          </p>

          <h3 className="text-xl font-medium mb-3">Conflict Screening</h3>
          <p className="text-lg mb-10 leading-8">
            We proactively identify any potential conflicts. Through detailed
            profile assessments, we determine whether an expert is suitable for
            each project. Our system stores millions of such screening
            responses, enabling thorough conflict checks and ensuring integrity
            in expert-client interactions.
          </p>

          <h2 className="text-2xl font-semibold text-[#273677] mb-6">For Clients</h2>
          <p className="text-lg mb-6 leading-8">
            Our compliance protocols protect clients by minimizing the chance of
            accessing prohibited or confidential information and carefully
            regulating what client details are shared with experts. Custom
            safeguards screen expert engagements, ensuring that conflicts or
            employer-imposed restrictions are respected.
          </p>
          <p className="text-lg mb-10 leading-8">
            Our online “Project Oversight” tools let clients track their
            research initiatives live and apply their own compliance rules as
            needed. Through a compliance dashboard, client oversight teams can
            view expert bios, responses to profiling, past interaction history,
            set approval rules, and even craft custom compliance questions.
          </p>

          <h2 className="text-2xl font-semibold text-[#273677] mb-6">For Employers</h2>
          <p className="text-lg mb-10 leading-8">
            SMEONCALL’s framework also respects employer-imposed restrictions.
            Experts employed by an organization cannot engage in projects about
            their own employer. For lengthy or written assignments, employed
            experts (unless exempted) must secure written employer permission.
            We maintain a database of employer preferences to reinforce these
            rules.
          </p>

          <h2 className="text-2xl font-semibold text-[#273677] mb-6">In Short</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li><strong>Leadership:</strong> SMEONCALL is the industry’s compliance benchmark, backed by powerful, transparent systems.</li>
            <li><strong>Expert Commitment:</strong> Strict agreements, annual training, and conflict checks protect all parties.</li>
            <li><strong>Employer Considerations:</strong> Structures in place to honor employer limitations and consent.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
