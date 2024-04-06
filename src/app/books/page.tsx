import { Empty } from 'antd';
import PaperList from 'src/components/PaperList';
import {
    notFound,
} from 'next/navigation';
import { createQueryString } from '@/utils/index';
import { Suspense, useEffect, useState } from 'react';
import service from 'src/service';
import { paginationDataSourceProps, queryItemProps } from '@/type/books';
import { PAGE_SIZE } from '@/constant/books';
import Pagination from './components/Pagination'
import React from 'react';

const Books = async ({
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    // const pathname = usePathname();
    // const router = useRouter();

    // const { page, pageSize, label, searchValue } = searchParams;
    const { page, label, searchValue } = searchParams;
    const pageSize = PAGE_SIZE;

    if (!page || !pageSize) {
        notFound();
    }

    // TODO: 拉取文章数据
    let dataSource: paginationDataSourceProps | Record<string, any> = {};
    const fetchDataSource = async () => {
        const params = {
            page: +page,
            pageSize: +pageSize,
        };

        if (searchValue) {
            Object.assign(params, { searchValue });
        } else if (label) {
            Object.assign(params, { label });
        }

        const { code, data } = await service.books.getPaperListByPage(params);
        code !== 0 && notFound();

        dataSource = data;
    };
    await fetchDataSource()

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

                {/* Pagination */}
                <div className="flex pb-[32px] justify-center">
                    <Pagination
                        total={dataSource!?.total}
                        pageSize={+pageSize}
                        currentPage={+page}
                        queryParams={searchParams}
                    />
                </div>
            </div>
        </div>
    );
}


export default Books;
