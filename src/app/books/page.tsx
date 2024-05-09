import { Empty } from 'antd';
import PaperList from 'src/components/PaperList';
import {
    notFound,
} from 'next/navigation';
import { createQueryString } from '@/utils/index';
import { Suspense, useEffect, useState } from 'react';
import service from 'src/service';
import { paginationDataSourceProps, queryItemProps } from '@/type/books';
import { MAX_PAGE_SIZE, MIN_PAGE_SIZE, PAGE_SIZE } from '@/constant/books';
import Pagination from './components/Pagination'
import React from 'react';

import EmptySvg from '@/assets/svg/empty.svg';

import styles from './index.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type searchParamsProps = Partial<{
    page: string;
    pageSize: number | string | undefined;
    label: string | undefined;
    searchValue: string | undefined;
}>

const Books = async ({
    searchParams,
}: {
    params: { slug: string }
    searchParams: searchParamsProps
}) => {
    // const pathname = usePathname();
    // const router = useRouter();

    // const { page, pageSize, label, searchValue } = searchParams;
    const { page: strPage, pageSize: strPageSize, label, searchValue } = searchParams;
    const page = +strPage;
    const pageSize = +strPageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : Math.max(MIN_PAGE_SIZE, +strPageSize);

    if (!page || !pageSize) {
        notFound();
    }

    // TODO: 拉取文章数据
    let dataSource: paginationDataSourceProps | Record<string, any> = {};
    const fetchDataSource = async () => {
        const params = {
            page: page,
            pageSize: pageSize,
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
            {(label) && (
                <div className={cx('result-wrap')}>
                    与<span className={cx('label')}>{label}</span>相关的文章:
                </div>
            )}
            {(searchValue) && (
                <div className={cx('result-wrap')}>
                    搜索<span className={cx('text')}>{searchValue}</span>的结果:
                </div>
            )}
            <div className={cx('content')}>
                {dataSource!?.items.length > 0 ? (
                    <>
                        <PaperList showFooter={true} dataSource={dataSource!?.items} />
                    </>
                ) : (
                    <Empty
                        className='flex flex-col items-center justify-center w-full'
                        style={{ height: 'var(--content-height)' }}
                        imageStyle={{ height: 200 }}
                        image={EmptySvg.src}
                        description={<span className='text-[16px]'>暂无文章数据</span>} />
                )}

                {/* Pagination */}
                {(dataSource!?.total / pageSize) > 1 &&
                    <div className="flex pt-[12px] justify-center">
                        <Pagination
                            total={dataSource!?.total}
                            pageSize={pageSize}
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
