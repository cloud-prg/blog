import { CENTER_SIDE, ELLIPSIS_LIMIT } from "@/constant/books";
import { useCallback } from "react";


interface IProps {
    total: number;
    pageSize: number;
    currentPage: number;
    queryParams?: Record<string, any>;
}

const Pagination: React.FC<IProps> = (props) => {
    const { total, pageSize, currentPage, queryParams } = props;
    const totalPages = Math.ceil(total / pageSize);
    const previousPage = currentPage - 1
    const nextPage = currentPage + 1
    const objToQuery = (obj: Record<string, any>) => {
        return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
    }

    const Link = useCallback(
        (props: {
            index: number,
            page?: number;
            ellipsis?: boolean;
        }) => {
            const { index, page, ellipsis = false } = props;

            return <a
                className={`px-[6px] cursor-pointer hover:bg-gray-200 rounded-md 
                ${index + 1 === currentPage && 'pointer-events-none text-blue-400 border border-blue-300 rounded-md'}`}
                href={`?${objToQuery({ ...queryParams, page: page || index + 1, pageSize })}`}
            >
                {ellipsis ? '...' : index + 1}
            </a>
        }, [queryParams, currentPage, pageSize]
    )

    let ellipsisLeft = false
    let ellipsisRight = false
    return (
        <div className="p-2 flex justify-between items-center">
            {previousPage > 0 && <a className="hover:text-blue-300" href={`?${objToQuery({ ...queryParams, page: previousPage, pageSize })}`}>上一页</a>}
            <div className="mx-[16px] flex items-center gap-[6px]">
                {totalPages > 0 && new Array(totalPages).fill(null).map((_, index) => {
                    const leftBd = ELLIPSIS_LIMIT - 1;
                    const rightBd = (totalPages - 1) - (ELLIPSIS_LIMIT - 1);

                    if (index > leftBd && index < (currentPage - 1) - CENTER_SIDE) {
                        if (ellipsisLeft) {
                            return null;
                        }

                        ellipsisLeft = true;
                        return <Link key={index} index={index} page={currentPage - 3} ellipsis />
                    }

                    if (index < rightBd && index > (currentPage - 1) + CENTER_SIDE) {
                        if (ellipsisRight) {
                            return null;
                        }

                        ellipsisRight = true;
                        return <Link key={index} index={index} page={currentPage + 3} ellipsis />
                    }


                    return <Link key={index} index={index} />
                })}
            </div>
            {nextPage <= totalPages && <a className="hover:text-blue-300" href={`?${objToQuery({ ...queryParams, page: nextPage, pageSize })}`}>下一页</a>}
        </div>
    )
}
export default Pagination;