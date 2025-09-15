import { useRouter } from "next/router";
import Link from "next/link";

const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    location: "Dubai, UAE",
    type: "Full-Time",
    department: "Engineering",
    description:
      "We are looking for a skilled Frontend Developer to join our growing team.",
    responsibilities: [
      "Develop and maintain responsive user interfaces.",
      "Collaborate with design and backend teams.",
      "Optimize applications for speed and scalability.",
    ],
    requirements: [
      "3+ years of frontend experience.",
      "Strong React/Next.js skills.",
      "Good eye for design and UX.",
    ],
  },
  {
    id: "2",
    title: "Marketing Specialist",
    location: "London, UK",
    type: "Contract",
    department: "Marketing",
    description:
      "We are seeking a Marketing Specialist to develop and execute campaigns.",
    responsibilities: [
      "Plan and execute marketing campaigns.",
      "Analyze market trends and competitors.",
      "Collaborate with sales and product teams.",
    ],
    requirements: [
      "2+ years in marketing.",
      "Knowledge of SEO, PPC, and social media.",
      "Excellent communication skills.",
    ],
  },
];

export default function CareerDetail() {
  const router = useRouter();
  const { id } = router.query;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Job not found</h1>
        <Link href="/careers" className="text-[#32A2DC] hover:underline mt-4 block">
          Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/careers" className="text-[#32A2DC] hover:underline mb-6 inline-block">
          ← Back to Careers
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-[#273677] mb-4">
          {job.title}
        </h1>
        <p className="text-gray-600 mb-2">📍 {job.location} | {job.type}</p>
        <p className="text-gray-500 mb-8">{job.department}</p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-[#273677] mb-3">
              Job Description
            </h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#273677] mb-3">
              Responsibilities
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#273677] mb-3">
              Requirements
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <button className="px-8 py-3 bg-[#32A2DC] text-white rounded-full text-lg shadow hover:bg-[#2790c7] transition">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}
