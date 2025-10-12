"use client";
import { JSX } from "react";
import { useComplainsSectionContent } from "../lib/complains-page/useComplainsSectionContent";
import CommonHeader from "../components/commonHeader";
import { defaultComplainsHeaderData } from "../lib/complains-page/defaultComplainsHeaderData";
import { defaultComplainsPageData } from "../lib/complains-page/defaultComplainsPageData";

export default function SMEs() {
  const { data: complainsSectionData, isError } = useComplainsSectionContent();

  {/* If Backend is down or no data fallback to default content */ }
  {/* take data from strapi or default data */ }
  const getSectionData = (key: string, defaultData: any) => {
    const section = complainsSectionData?.data?.[key];
    console.log(section);
    
    if (isError || !section || section.length === 0) {
      return defaultData;
    }
    return section;
  };

  const complainsHeader = getSectionData("Header", defaultComplainsHeaderData);
  const mainContent = getSectionData("Main_content", defaultComplainsPageData);

  return (
    <>
      {/* Common Header */}
      <CommonHeader headerData={complainsHeader} />

      {/* Compliance Framework */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          {mainContent.map((block: any, index: any) => {
            switch (block.type) {
              case "heading":
                const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
                return (
                  <HeadingTag
                    key={index}
                    className={`font-bold text-[#273677] ${block.level === 2
                      ? "text-3xl mb-8"
                      : block.level === 3
                        ? "text-xl font-medium mb-3"
                        : "text-lg"
                      }`}
                  >
                    {block.children.map((child: any, i: number) => child.text).join("")}
                  </HeadingTag>
                );

              case "paragraph":
                return (
                  <p key={index} className="text-lg leading-8 mb-5">
                    {block.children.map((child: any, i: number) => child.text).join("")}
                  </p>
                );

              case "list":
                return (
                  <ul
                    key={index}
                    className={`list-disc pl-6 space-y-2 text-lg ${block.format === "unordered" ? "" : "list-decimal"
                      }`}
                  >
                    {block.children.map((item: any, i: number) => (
                      <li key={i}>
                        {item.children.map((child: any, j: number) =>
                          child.bold ? (
                            <strong key={j}>{child.text}</strong>
                          ) : (
                            child.text
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                );

              default:
                return null;
            }
          })}
        </div>
      </section>
    </>
  );
}
