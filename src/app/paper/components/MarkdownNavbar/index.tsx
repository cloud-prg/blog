import React from "react";
import Link from "next/link";

import styles from './index.module.scss';
import classNames from "classnames/bind";
import { strictMatch } from "@/utils";
const cx = classNames.bind(styles);

const MarkdownNavbar: React.FC<{ content: string }> = (props) => {
    const { content } = props;
    // 存储导航项的数组
    const navItems = [];

    content?.split?.('\n')?.forEach?.((line) => {
        const prefix = line.split(' ')[0];
        if (strictMatch(prefix, /^##$/)) {
            const lastIndex = Math.max(navItems.length - 1, 0);
            !navItems[lastIndex] && navItems.push([`目录-${lastIndex + 1}`, []]);

            navItems[lastIndex]?.[1]?.push(line.split(' ')[1]);
        } else if (strictMatch(prefix, /^#$/)) {
            navItems.push([line.split(' ')[1], []]);
        }
    })

    return <div className={cx("markdown-navbar")}>
        <ul>
            {navItems.map((item, index) => {
                const h1 = item[0];
                const h2List = item[1];

                return <li key={index}>
                    {h1?.includes?.('目录') ?
                        <span>{`${index + 1}. ${h1}`}</span> :
                        <Link href={`#${h1}`}>{`${index + 1}. ${h1}`}</Link>
                    }
                    <ul>
                        {h2List.map((h2, subIndex) => {
                            return <li key={subIndex}>
                                <Link href={`#${h2}`}>{`${index + 1}.${subIndex + 1} ${h2}`}</Link>
                            </li>
                        })}
                    </ul>
                </li>
            })}
            <li style={{ listStyle: 'square' }}><Link href={`#comment`}>查看评论</Link></li>
            <li style={{ listStyle: 'square' }}><Link href={`#message`}>我要留言</Link></li>
            <li style={{ listStyle: 'square' }}><Link href={`#`}>回到顶部</Link></li>
        </ul>
    </div>

}

export default MarkdownNavbar;