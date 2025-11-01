import React, { JSX } from "react";

export default function RichTextBlock({ mainContent }: any) {
    return (
        <>
            {
                mainContent.map((block: any, index: number) => {
                    // helper to render inline children respecting marks (bold, italic, etc.)
                    const renderInline = (children: any[]) =>
                        children.map((child: any, i: number) => {
                            // If child is plain string (rare depending on input), return it
                            if (typeof child === "string") return child;

                            const parts: React.ReactNode[] = [];

                            // start with base text
                            let node: React.ReactNode = child.text ?? "";

                            // wrap with tags according to marks - extend as needed
                            if (child.bold) node = <strong key={i}>{node}</strong>;
                            if (child.italic) node = <em key={i}>{node}</em>;
                            if (child.underline) node = <u key={i}>{node}</u>;

                            // if there are links or other node-level types, handle here:
                            if (child.href) node = (
                                <a key={i} href={child.href} target="_blank" rel="noopener noreferrer">
                                    {node}
                                </a>
                            );

                            return <React.Fragment key={i}>{node}</React.Fragment>;
                        });

                    switch (block.type) {
                        case "heading": {
                            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
                            return (
                                <HeadingTag
                                    key={index}
                                    className={`font-bold text-[#273677] ${block.level === 2 ? "text-3xl mb-5" : block.level === 3 ? "text-2xl font-semibold mb-3" : "text-lg"
                                        }`}
                                >
                                    {renderInline(block.children)}
                                </HeadingTag>
                            );
                        }

                        case "paragraph":
                            return (
                                <p key={index} className="text-lg leading-8 mb-5">
                                    {renderInline(block.children)}
                                </p>
                            );

                        case "list":
                            return (
                                <ul key={index} className={`list-disc pl-6 space-y-2 text-lg ${block.format === "unordered" ? "" : "list-decimal"}`}>
                                    {block.children.map((item: any, i: number) => (
                                        <li key={i}>{renderInline(item.children)}</li>
                                    ))}
                                </ul>
                            );

                        default:
                            return null;
                    }
                })
            }
        </>
    )
} 