import service from "@/service";
import { paperProps } from "@/type";
import dayjs from "dayjs";
import Link from "next/link";
import { Suspense, useMemo } from "react";

import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { notFound } from "next/navigation";
const cx = classNames.bind(styles);

const RollbackList = async () => {
  let paperList: paperProps[] = [];
  const res = await service.rollback.getPaperList();

  const { code, data } = res;
  if (code === 0) {
    paperList = data;
  } else {
    notFound();
  }
  const computedPaperList = (list: paperProps[]) => {
    const dateMap: Record<string, any> = {}
    list.forEach((item: paperProps) => {
      const { id, title, createdAt } = item;
      const year = dayjs(createdAt).year();
      const date = dayjs(createdAt).format('MM-DD');

      !dateMap[year] && (dateMap[year] = []);

      dateMap[year].push({
        date,
        title,
        id
      });
    })

    // sort by year
    return Object.entries(dateMap).sort((prev:any,next:any)=>{
      return parseInt(next[0]) - parseInt(prev[0])
    })
  }

  return <div className={cx('rollback-list')}>
    {computedPaperList(paperList).map((item: any) => {
      const [year, dateList] = item;
      return <div className={cx('year-list')} key={year}>
        <div className={cx('title')}>{year}</div>
        <ul className={cx('date-list')}>
          {dateList.map((dateItem: any) => {
            const { date, title, id } = dateItem;
            return <li className={cx('item')} key={id}>
              <span className={cx('date')}>{date}</span>
              <Link className={cx("date-link")} href={`/paper/?id=${id}`}>{title}</Link>
            </li>
          })}
        </ul>
      </div>
    })}
  </div>
}

const Index = async () => {
  return <div className={cx('rollback-container')}>
    <h1 className="text-[32px] mb-[20px]">归档</h1>
    <Suspense fallback={<div>Loading...</div>}>
      {await <RollbackList />}
    </Suspense>
  </div>
}

export default Index;