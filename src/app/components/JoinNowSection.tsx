import Image from "next/image";
import Link from "next/link";
import CrTeam03 from "../../../public/cr-team-01.jpg";
import CrTeam04 from "../../../public/cr-team-07.jpg";
import CrTeam05 from "../../../public/cr-team-03.jpg";
import CrTeam06 from "../../../public/cr-team-05.jpg";
import CrTeam01 from "../../../public/cr-team-06.jpg";
import CrTeam02 from "../../../public/cr-team-02.jpg";
import { useQuery } from "@tanstack/react-query";
import { getStrapiMedia } from "./homePage/heroSection";

const STRAPI_URL_API = process.env.NEXT_PUBLIC_STRAPI_URL

export default function JoinNowSection() {
    const fetchNewletter = async () => {
        const res = await fetch(`${STRAPI_URL_API}/api/join-now-section`);
        if (!res.ok) throw new Error("Failed to fetch join-now-section");
        return res.json();
    }

    // useQuery syntax
    const { data: joinNow } = useQuery({
        queryKey: ['join-now-section'],
        queryFn: fetchNewletter,
    })

    return (
        <section className="py-30 bg-[#F6FAFF]" data-aos="fade-up">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1">
                    <div>
                        <h3 className="text-center text-3xl text-[#273677] mb-6 md:leading-12 leading-10 sm:leading-10 font-regular">
                            {joinNow?.data?.description || "At SMEOnCall, we welcome talent at every stage. If you're smart, curious, and passionate about making an impact, we’d love to hear from you. Check out our current openings and apply today."}
                        </h3>
                    </div>
                    <Link href={joinNow?.data?.join_now_button_link || "/enrollment-forum"} className="mx-auto">
                        <button className="cursor-pointer px-10 py-3 bg-[#32A2DC] text-white rounded-full text-lg hover:bg-[#2790c7] transition max-w-xl mx-auto">
                            {joinNow?.data?.join_now_button || "Join Now"}
                        </button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mt-20">
                {
                    (joinNow?.data?.image_slider?.image_slider.length ? joinNow?.data?.image_slider?.image_slider : [CrTeam01, CrTeam02, CrTeam03, CrTeam04, CrTeam05, CrTeam06])
                        .map((item: any, index: number) =>
                        (
                            <div key={index}>
                                <Image
                                    src={getStrapiMedia(item.url) || item}
                                    alt="Clarity"
                                    className="w-full h-[450px] object-cover"
                                    height={500}
                                    width={500}
                                />
                            </div>
                        )
                        )
                }
            </div>
        </section>
    )
}