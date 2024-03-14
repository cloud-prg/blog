'use client';
import { Empty, Pagination } from 'antd';
import PaperList from 'src/components/PaperList';
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { createQueryString } from '@/utils/index';
import { useEffect, useState } from 'react';
import service from 'src/service';
import { paginationDataSourceProps, queryItemProps } from '@/type/books';
import { PAGE_SIZE } from '@/constant/books';

export default function Books() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const label = searchParams.get('label');
  const searchValue = searchParams.get('searchValue');

  if (!page || !pageSize) {
    notFound();
  }

  const [dataSource, setDataSource] = useState<paginationDataSourceProps>();

  // TODO: 拉取文章数据
  const fetchDataSource = async () => {
    const params = {
      page: +page,
      pageSize: +PAGE_SIZE,
    };

    if (searchValue) {
      Object.assign(params, { searchValue });
    } else if (label) {
      Object.assign(params, { label });
    }

    let { code, data } = await service.books.getPaperListByPage(params);
    code !== 0 && notFound();

    setDataSource(data);
  };

  useEffect(() => {
    fetchDataSource();
  }, [page, searchValue]);

  return (
    <div className="h-full flex flex-col border border-solid border-black-400">
      {label && (
        <div className="font-bold text-[20px]">
          搜索
          <span className="text-red-500">{label}</span>
          的结果:
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between">
        {dataSource!?.items.length > 0 ? (
          <>
            <PaperList showFooter={true} dataSource={dataSource!?.items} />
          </>
        ) : (
          <Empty description={'暂无文章数据'} />
        )}
        <div className="flex pb-[32px] justify-center">
          <Pagination
            total={dataSource!?.total}
            pageSize={PAGE_SIZE}
            showSizeChanger={false}
            onChange={(page) => {
              const queryList: queryItemProps[] = [
                {
                  name: 'page',
                  value: page,
                },
                {
                  name: 'pageSize',
                  value: PAGE_SIZE,
                },
              ];
              if (label) {
                queryList.push({
                  name: 'label',
                  value: label,
                });
              }

              const queryString = createQueryString(searchParams, queryList);
              router.push(`${pathname}?${queryString}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
