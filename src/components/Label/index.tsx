
import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import { Typography } from "antd";

const cx = classNames.bind(styles);

interface IProps {
    href: string;
    label: string;
}

const Label: React.FC<IProps> = (props) => {
    return <Link
        className={cx('label')}
        href={props.href}
    >
        {props.label}
    </Link>
};

export default Label;