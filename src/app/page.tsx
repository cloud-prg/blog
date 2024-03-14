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

const categories = [
  {
    label: 'ts',
    count: 16,
  },
  {
    label: 'rust',
    count: 12,
  },
  {
    label: 'node',
    count: 8,
  },
];

const Main = async () => {
  try {
    let dataSource: any[] = [];
    const { code, data } = await service.home.getPaperListPagination({
      page: 1,
      pageSize: 4,
    });
    if (code === 0) {
      dataSource = data.items;
    }

    return (
      <div className="flex-1 flex flex-col gap-[20px] p-[12px] h-full border border-solid border-black-50">
        <div className="bold text-[24px]">最新文章</div>
        <PaperList dataSource={dataSource} />
        <Link
          className="text-blue-500"
          href={`/books/?page=${PAGE}&pageSize=${PAGE_SIZE}`}
        >
          更多内容...
        </Link>
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
    <div className="flex flex-col gap-[20px] w-[20%] border border-solid border-red-500 h-fit">
      {/* 博主信息 */}
      <div className="flex flex-col gap-[12px]">
        {/* 个人信息... */}
        <Image src={avatarImg} alt="" />
        <div className="flex gap-[4px]">
          <span>昵称:</span>
          <span>云</span>
        </div>
        <Link className="text-blue-500" href="/email.png" target="_blank">
          email
        </Link>
        <Link
          className="text-blue-500"
          href="https://github.com/yunshangzhou"
          target="_blank"
        >
          github
        </Link>
      </div>

      {/* 文章分类 */}
      <div className="flex flex-col">
        <span className="text-[18px] font-bold mb-[12px]">文章分类</span>
        <div className="flex flex-col gap-[8px]">
          {categories.map(({ label, count }) => {
            return (
              <Link
                className="hover:text-blue-400"
                key={label}
                href={`/books/?label=${label}&page=${1}&pageSize=${4}`}
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
    // whole
    <div className="h-full w-full border pt-[12px] px-[12px] flex gap-[20px]">
      {/* 文章列表 */}
      <Suspense fallback={<div>主内容加载中...</div>}>{await Main()}</Suspense>
      {/* 侧边栏 */}
      <Suspense fallback={<div>侧边栏加载中...</div>}>
        {await Sidebar()}
      </Suspense>
    </div>
  );
}
