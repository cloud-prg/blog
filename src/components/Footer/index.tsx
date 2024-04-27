import React from "react";
import styls from './index.module.scss'
import classNames from "classnames/bind";
import Link from "next/link";
import { HOME_PAGE_SIZE, emailUrl, githubUrl } from '@/constant/home';
import { GithubOutlined, MailOutlined } from "@ant-design/icons";

const cx = classNames.bind(styls);

const Footer: React.FC = () => {
    return (
        <footer className={cx("footer")}>
            <div className={cx('item')}>
                <span >Copyright© 2023-2024 Cloudprg</span>

                <span className={cx('link-wrap')}>
                    <span className={cx('text')}>联系我:</span>
                    <Link
                        className={cx('icon')}
                        href={githubUrl}
                        target="_blank"
                    >
                        {/* @ts-ignore */}
                        <GithubOutlined />
                    </Link>
                    <Link
                        className={cx('icon')}
                        href={emailUrl} target="_blank">
                        {/* @ts-ignore */}
                        <MailOutlined />
                    </Link>
                </span>
            </div>
            <Link className="underline" target="_blank" href="http://beian.miit.gov.cn/">闽ICP备2021010384号-3</Link>
        </footer>
    )
}

export default Footer;