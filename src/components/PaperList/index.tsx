import { PAGE, PAGE_SIZE } from '@/constant/books';
import { formatDate } from '@/utils/index';
import dayjs from 'dayjs';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { paperProps } from 'src/type';

interface IProps {
  dataSource: paperProps[];
  showFooter?: boolean;
}

const PaperList = (props: IProps) => {
  const { dataSource, showFooter = true } = props;
  return (
    <div className="flex flex-col gap-[12px]">
      {dataSource?.map((item) => {
        let {
          id: paperId,
          title,
          createdAt,
          description,
          content,
          labels,
        } = item;
        const time = formatDate?.(createdAt);
        const limitContent = content?.slice?.(0, 80);

        return (
          <div
            key={paperId}
            className="flex flex-col w-full border border-solid"
          >
            <span
              suppressHydrationWarning
              className="text-[12px] color-gray-300"
            >
              {time}
            </span>
            <Link
              href={`/paper/?id=${paperId}`}
              className="w-fit bold text-[20px] hover:text-blue-400"
            >
              {title}
            </Link>
            <span className="bold mb-[8px] text-[12px] color-gray-200">
              {description}
            </span>
            <Markdown>{limitContent}</Markdown>
            {showFooter && (
              <>
                <div className="mt-[12px] flex justify-between">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[16px]">分类:</span>
                    <div className="flex items-center gap-[4px]">
                      {!labels?.length && '暂无'}
                      {labels?.map(({ id: labelId, label }) => {
                        return (
                          <Link
                            key={`${paperId}-${labelId}`}
                            className="hover:text-blue-400"
                            href={`/books/?label=${label}&page=${PAGE}&pageSize=${PAGE_SIZE}`}
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <Link
                    className="hover:text-blue-400"
                    suppressHydrationWarning
                    href={`/paper/?id=${paperId}#comment`}
                    target="_blank"
                  >
                    评论{`(${Math.floor(Math.random() * 100)})`}
                  </Link>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PaperList;
