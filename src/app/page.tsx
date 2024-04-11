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
import { HOME_PAGE_SIZE } from '@/constant/home';
const cx = classNames.bind(styles);

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
        <div className={cx("title")}>最新文章</div>
        <PaperList dataSource={dataSource} />
        {
          countTotal > HOME_PAGE_SIZE &&
          <Link
            className="text-primary-4 underline"
            href={`/books/?page=${PAGE}&pageSize=${PAGE_SIZE}`}
          >
            更多内容...
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
      <div className={cx("item")}>
        <span className={cx('title')}>联系信息</span>
        <ul>
          <li>
            <Link className="text-primary-4 underline" href="/email.svg" target="_blank">
              email
            </Link>
          </li>
          <li>
            <Link
              className="text-primary-4 underline"
              href="https://github.com/cloud-prg"
              target="_blank"
            >
              github
            </Link>
          </li>
        </ul>
      </div>

      {/* 文章分类 */}
      <div className={cx("item")}>
        <span className={cx('title')}>文章分类</span>
        <ul>
          {categories.map(({ label, count }) => {
            return (
              <li key={label}>
                <Link
                  className="hover:text-primary-4"
                  href={`/books/?label=${label}&page=${1}&pageSize=${PAGE_SIZE}`}
                >
                  {`${label}(${count})`}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default async function Index(props: any) {
  return (
    <div className={cx("home")}>
      <Suspense fallback={<div>主内容加载中...</div>}>{await Main()}</Suspense>
      <Suspense fallback={<div>侧边栏加载中...</div>}>
        {await Sidebar()}
      </Suspense>
    </div>
  );
}
