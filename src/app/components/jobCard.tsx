import Link from "next/link";

export default function JobCard({ job }: any) {
    return (
        <div className="bg-white px-10 py-20 rounded-2xl border border-[#dedede] hover:shadow-xl transition-shadow duration-300" data-aos="fade-up">
            <h3 className="text-2xl font-semibold text-[#273677] mb-5">{job.title}</h3>
            {job.subtitle && <p className="text-lg font-medium text-gray-800 mb-3">{job.subtitle}</p>}
            <p className="flex items-center text-[#32A2DC] text-lg mb-4">
                <span>{job.location}</span>
            </p>
            <p className="text-gray-700 text-lg mb-6 line-clamp-3">
                {job.description}
            </p>
            <Link href={`/job-details/${job.id}`}>
                <button className="bg-[#273677] cursor-pointer text-white font-semibold px-6 py-3 rounded-md hover:bg-[#1f2f60] transition-colors duration-200">
                    View Details
                </button>
            </Link>
        </div>
    )
}