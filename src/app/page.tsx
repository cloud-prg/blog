import { notFound } from 'next/navigation';

import styles from './page.module.scss';
import { mockPaperList } from '../constant';
import Image from 'next/image';
import avatarImg from '@/assets/image/avatar.png';

import Link from 'next/link';
import PaperList from 'src/components/PaperList';
import { Suspense } from 'react';
import service from 'src/service';
import { PAGE, PAGE_SIZE } from '@/constant/books';

import classNames from 'classnames/bind';
import { HOME_PAGE_SIZE, emailUrl, githubUrl } from '@/constant/home';
import { homeSeoConfig } from '@/constant/seo';
import { Metadata, ResolvingMetadata } from 'next';
import { GithubOutlined, InfoCircleOutlined, MailOutlined, RightOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

export const metadata: Metadata = {
  ...homeSeoConfig,
}

const Main = async () => {
  try {
    let dataSource: any[] = [];
    let countTotal: number = 0;
    const { code, data } = await service.home.getPaperListPagination({
      page: 1,
      pageSize: HOME_PAGE_SIZE,
    });
    if (code === 0) {
      const { items, total } = data;
      dataSource = items;
      countTotal = total
    }

    return (
      <div className={cx('main')}>
        <div className={cx("title")}>📔 最新文章</div>
        <PaperList dataSource={dataSource} />
        {
          countTotal > HOME_PAGE_SIZE &&
          <Link
            className={`${cx('more')} mt-[16px]`}
            href={`/books/?page=${PAGE}&pageSize=${PAGE_SIZE}`}
          >
            阅读更多
            {/* @ts-ignore */}
            <RightOutlined />
          </Link>
        }
      </div>
    );
  } catch (err) {
    notFound();
  }
};

const Sidebar = async () => {
  let categories: any[] = [];
  const { code, data } = await service.home.getCategories();
  if (code === 0) {
    categories = data;
  }

  return (
    <div className={cx('sidebar')}>
      {/* 关于作者 */}
      {/* <div className={cx("item")}>
        <span className={cx('title')}>关于作者</span>
        <div className={cx('content')}>
          <span>cs专业21届本科生，毕业后从事于前端开发至今。技术栈上熟悉vue2/3,nextjs,nestjs、docker&jenkins CI&CD、工程化等。关注业界前沿，乐于踩坑并分享经验。</span>
          <Link className='text-right text-primary-4 underline' href="/about">了解更多...</Link>
        </div>
      </div> */}

      {/* 联系我 */}
      {/* <div className={cx("item")}>
        <span className={cx('title')}>📮 联系方式</span>
       
      </div> */}
      <div className={cx("item")}>
        <span className={cx('title')}>
          ℹ️ 小站信息
        </span>
        <div className={cx('content')}>
          <span>记录包括但不限于前端的技术知识，偶尔分享生活感悟，欢迎交流。</span>
          <Link
            className={`${cx('more')} mt-[12px]`}
            href="/about">了解更多</Link>
        </div>
      </div>

      {/* 文章分类 */}
      <div className={cx("item")}>
        <span className={cx('title')}>📚 文章分类</span>
        <div className={cx('tags')}>
          {categories.map(({ label, count }) => {
            return (
              <Link
                key={label}
                className={cx('tag')}
                // className="hover:text-primary-4"
                href={`/books/?label=${label}&page=${1}&pageSize=${PAGE_SIZE}`}
              >
                {`${label}(${count})`}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default async function Index(props: any) {
  return (
    <>
      <div className={cx("home")}>
        <Suspense fallback={<div>主内容加载中...</div>}>{await Main()}</Suspense>
        <Suspense fallback={<div>侧边栏加载中...</div>}>
          {await Sidebar()}
        </Suspense>
      </div>
    </>
  );
}
