import { PAGE, PAGE_SIZE } from '@/constant/books';
import { formatDate } from '@/utils/index';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { paperProps } from 'src/type';

import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Label from '../Label';
const cx = classNames.bind(styles);

interface IProps {
  dataSource: paperProps[];
  showFooter?: boolean;
}

const PaperList = (props: IProps) => {
  const { dataSource, showFooter = true } = props;

  const Footer = (props) => {
    const { paperId, labels } = props;
    return <>
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
  }
  return (
    <div className={cx('paper-list')}>
      {dataSource?.map((item) => {
        let {
          id: paperId,
          title,
          createdAt,
          content,
          description,
          labels,
        } = item;
        const time = formatDate?.(createdAt);
        const limitContent = content?.slice?.(0, 80);

        return (
          <div
            key={paperId}
            className={cx('item')}
          >
            <div className={cx('content')}>
              <span suppressHydrationWarning className={cx('date')}>{time}</span>
              <Link href={`/paper/?id=${paperId}`} className={cx('title')}>{title}</Link>
            </div>
            <div className={cx('labels')}>
              {!labels?.length && '暂无'}
              {labels?.map(({ id: labelId, label },index) => {
                if(index <= 4){
                  return (
                    <Label label={label} href={`/books/?label=${label}&page=${PAGE}&pageSize=${PAGE_SIZE}`} key={`${paperId}-${labelId}`} />
                  );
                }
                return <Label label={`+${labels.length-4}`} key={`${paperId}-${labelId}`} href="#"/>
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaperList;
