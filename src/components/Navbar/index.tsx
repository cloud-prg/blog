'use client';
import { Input } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';
import { PAGE, PAGE_SIZE } from '@/constant/books';
import { useRouter } from 'next/navigation';
import classnames from 'classnames/bind'
import styles from './index.module.scss';

const cx = classnames.bind(styles);

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const handleClick = () => {
    router.push(
      `/books/?searchValue=${searchText}&page=${PAGE}&pageSize=${PAGE_SIZE}`
    );
    setSearchText('');
  };

  const navItems: { label: string; link: string }[] = [
    // {
    //   label: '博客',
    //   link: `/books/?page=${PAGE}&pageSize=${PAGE_SIZE}`,
    // },
    // {
    //   label: '阅读书籍',
    //   link: '/books',
    // },
    // {
    //   label: '关于',
    //   link: '',
    // },
  ];

  return (
    <div className={cx("navbar")}>
      <div className={cx("left-part")}>
        <div className='flex flex-col gap-[4px]'>
          <Link className={cx("logo")} href="/">Cloudprg Blog</Link>
          <span className='text-[14px] text-dark-grey italic'>分享技术，开源生活</span>
        </div>
        {navItems?.map((item) => {
          return (
            <Link key={item.label} href={item.link} className={cx("nav-item")}>
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className={cx("right-part")}>

        <Input
          className={cx("search-input")}
          value={searchText}
          onChange={(e) => {
            const value = e?.target?.value;
            setSearchText(value);
          }}
          placeholder="搜索"
          onPressEnter={handleClick}
          suffix={
            // @ts-ignore
            <SearchOutlined
              className={cx("search-icon")}
              onClick={handleClick}
            />
          }
        />
      </div>

    </div>
  );
};

export default Navbar;
