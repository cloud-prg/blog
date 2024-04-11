import React from "react";
import styls from './index.module.scss'
import classNames from "classnames/bind";
import Link from "next/link";
const cx = classNames.bind(styls);

const Footer: React.FC = () => {
    return (
        <footer className={cx("footer")}>
            <span >Copyright© 2023-2024 Cloudprg</span>
            <Link className="underline" target="_blank" href="http://beian.miit.gov.cn/">闽ICP备2021010384号-3</Link>
        </footer>
    )
}

export default Footer;