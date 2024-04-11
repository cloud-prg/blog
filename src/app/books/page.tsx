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

import styles from './index.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
        <div className={cx("book")}>
            {label && (
                <div className={cx('result-wrap')}>
                    搜索
                    <span className={cx('label')}>{label}</span>
                    的结果:
                </div>
            )}
            <div className={cx('content')}>
                {dataSource!?.items.length > 0 ? (
                    <>
                        <PaperList showFooter={true} dataSource={dataSource!?.items} />
                    </>
                ) : (
                    <Empty
                        className='flex flex-col items-center justify-center w-full h-full'
                        imageStyle={{
                            height: 200,
                        }}
                        description={<span className='text-[16px]'>暂无文章数据</span>} />
                )}

                {/* Pagination */}
                {(dataSource!?.total / pageSize) > 1 &&
                    <div className="flex pb-[32px] justify-center">
                        <Pagination
                            total={dataSource!?.total}
                            pageSize={+pageSize}
                            currentPage={+page}
                            queryParams={searchParams}
                        />
                    </div>
                }
            </div>
        </div>
    );
}


export default Books;
