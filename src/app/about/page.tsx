import { ABOUT_ME } from "@/constant/about";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const AboutPage = () => {
    return (
        <Markdown className="default-style-sheet" remarkPlugins={[remarkGfm]}
            components={{
                code(props) {
                    const { children, className, node, ...rest } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return <>
                        {match ? (
                            <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                language={match[1]}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                        )}
                    </>
                }
            }}
        >{ABOUT_ME}</Markdown>
    )
}

export default AboutPage;