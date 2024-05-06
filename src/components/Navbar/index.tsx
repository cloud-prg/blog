'use client';
import { Input } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';
import { PAGE, PAGE_SIZE } from '@/constant/books';
import { useRouter } from 'next/navigation';
import classnames from 'classnames/bind'
import styles from './index.module.scss';
import { githubUrl } from '@/constant/home';
import GithubCorner from '../GithubCorner';

const cx = classnames.bind(styles);

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const handleClick = () => {
    router.push(
      `/books/?page=${PAGE}&pageSize=${PAGE_SIZE}&searchValue=${searchText}`
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
    {
      label: '归档',
      link: '/rollback',
    },
    {
      label: '关于',
      link: '/about',
    },
  ];

  return (
    <div className={cx("navbar")}>
      <div className={cx("left-part")}>
        <div className='flex flex-col gap-[4px]'>
          <Link className={cx("logo")} id="logo" href="/">Cloudprg Blog</Link>
          <span className='text-[14px] text-dark-grey italic'>分享技术，开源生活</span>
        </div>
      </div>
      <div className={cx("right-part")}>
        <div className={cx("nav-item-list")}>
          {navItems?.map((item) => {
            return (
              <Link key={item.label} href={item.link} className={cx("item")}>
                {item.label}
              </Link>
            );
          })}
        </div>
        <Input
          className={cx("search-input")}
          value={searchText}
          onChange={(e) => {
            const value = e?.target?.value;
            setSearchText(value);
          }}
          placeholder="请输入"
          onPressEnter={handleClick}
          suffix={
            <div className={cx("input-suffix")}>
              {/* @ts-ignore */}
              <SearchOutlined
                onClick={handleClick}
              />
              搜索
            </div>
          }
        />
      </div>
      <GithubCorner href={githubUrl} />
    </div>);
};

export default Navbar;
