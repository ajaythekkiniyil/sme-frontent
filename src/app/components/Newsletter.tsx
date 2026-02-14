import { useQuery } from "@tanstack/react-query";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export default function Newsletter() {

    const fetchNewletter = async () => {
        const res = await fetch(`${STRAPI_API_URL}/api/newsletter`);
        if (!res.ok) throw new Error("Failed to fetch newsletter");
        return res.json();
    }

    // useQuery syntax
    const { data: newsletter, isError } = useQuery({
        queryKey: ['newsletter'],
        queryFn: fetchNewletter,
    })

    return (
        <section className="bg-[#f8fafc] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 rounded-[30px] sm:rounded-[40px] mt-16" data-aos="fade-up">
            <div className="container mx-auto px-6 text-center max-w-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#273677] mb-6">
                    {
                        isError
                            ?
                            <>Subscribe to Our <span className="text-[#32a2dc]">Newsletter</span></>
                            :
                            <>{newsletter?.data?.heading?.split(",")[0]} <span className="text-[#32a2dc]">{newsletter?.data?.heading?.split(",")[1]}</span></>
                    }
                </h2>
                <p className="text-gray-700 text-lg mb-8">{newsletter?.data?.description || "Stay up-to-date with the latest opportunities, insights, and updates from SMEOnCall. Join our community of experts today!"}</p>

                {/* Form */}
                <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-auto flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32a2dc] text-gray-700"
                        required
                    />
                    <button
                        type="submit"
                        className="cursor-pointer bg-[#32a2dc] text-white font-medium px-8 py-3 rounded-full hover:bg-[#273677] transition"
                    >
                        Subscribe
                    </button>
                </form>

                {/* Privacy Note */}
                <p className="text-sm text-gray-500 mt-4">{newsletter?.data?.privacy_text || "We respect your privacy. Unsubscribe anytime."}</p>
            </div>
        </section>
    )
}