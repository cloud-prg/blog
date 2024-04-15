import { formatDate } from '@/utils/index';
import { FieldTimeOutlined, HistoryOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Empty, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { mockCommentList, mockPaper } from 'src/constant/paper';
import service from 'src/service';
import { proxySuffix } from '#/setupProxy'
import { commentProps, paperProps, replyProps } from 'src/type';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import MarkdownNavbar from './components/MarkdownNavbar';
import { AUTHOR } from '@/constant/global';
import Label from '@/components/Label';
import { PAGE, PAGE_SIZE } from '@/constant/books';

import Image from 'next/image';

// ESM
import { faker } from '@faker-js/faker';

const cx = classNames.bind(styles);

export default async function Paper(props: {
  params: Record<string, any>;
  searchParams: Record<string, any>;
}) {
  const { searchParams } = props;

  if (!searchParams.id) {
    notFound();
  }

  let formAction: string = `${proxySuffix}`
  if (searchParams.commentId) {
    formAction += `/reply/create/${searchParams.id}/${searchParams.commentId}`
  } else {
    formAction += `/comment/create/${searchParams.id}`
  }

  // const res: { data: paperProps } = {
  //   data: mockPaper,
  // };

  const { code, data } = await service.paper.getPaper(searchParams.id);
  code !== 0 && notFound();
  const { current, previous = null, next = null } = data;
  const { id: paperId, title, description, createdAt, content, labels } = current;
  const time = formatDate(createdAt);
  console.log(`== content`, content)

  const { code: commentCode, data: commentData } =
    await service.paper.getCommentList(searchParams.id);
  commentCode !== 0 && notFound();
  const { comment } = commentData;

  const Comment = (props: commentProps) => {
    const { index, id, user, text, createdAt, reply = [] } = props;
    const time = formatDate(createdAt);

    return (
      <div id={`comment-${id}`} className={cx('comment')}>
        <div className={cx('avatar-region')}>
          <Image src={faker.image.avatar()} alt={user} width={32} height={32} />
          <span>{`${index + 1}楼`}</span>
        </div>
        <div className={cx("text-region")}>
          <div className={cx('header')}>
            <span className={cx('user')}>{user}</span>
            <span className={cx('date')}>{time}</span>
          </div>
          <span className={cx("text")}>{text}</span>
          <Link href={`/paper/?id=${searchParams.id}&commentId=${id}#comment-reply-${id}`}
            id={`comment-reply-${id}`}
            className={cx('reply-link')}>回复</Link>

          {/* <div id="reply-region" className={cx("reply-region")}>
            {reply.length > 0 &&
              reply.map((item) => {
                return <Reply key={item.id} {...item} />
              })
            }
          </div> */}
        </div>
      </div>
    );
  };

  const Reply = (props: replyProps) => {
    const { id, user, text, createdAt } = props;
    const time = formatDate(createdAt);

    return (
      <div id={`reply-${id}`} className={cx('reply')}>
        <div className={cx('user')}>
          {/* @ts-ignore */}
          <UserOutlined className="text-[24px]" />
          <span>{user}</span>
        </div>
        <div className={cx("text-region")}>
          <span className={cx("text")}>{text}</span>
          <div className={cx("footer")}>
            <span className={cx('date')}>
              {time}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <div className={`${cx('paper-container')}`}>
    <div className={`${cx('content-region')}`}>
      <span className={`${cx('title')}`}>{title}</span>
      <span className={cx('info-container')}>
        <span>
          
          {/* @ts-ignore */}
          {AUTHOR}
        </span>
        <span className={cx('time')}>
          {time}</span>
        <span className="flex items-center gap-[4px]">
          {/* @ts-ignore */}
          <FieldTimeOutlined />
          阅读{Math.floor(content.length / 600)}分钟
        </span>

      </span>
      {/* <span className={`${cx('description')}`}>{description}</span> */}
      <div className={`${cx('markdown-region')} default-style-sheet`}>
        <div className={cx('content')}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ children, ...props }) => {
                return <img className='mx-auto' src={props.src} alt={props.src} />
              },
              h1: ({ children, ...props }) => {
                const { value } = props.node.children[0] as any;
                return <h1 id={value}>
                  {/* @ts-ignore */}
                  <Link className={cx('h-link')} href={`#${value}`}><LinkOutlined /></Link>
                  {children}
                </h1>
              },
              h2: ({ children, ...props }) => {
                const { value } = props.node.children[0] as any;
                return <h2 id={value}>
                  {/* @ts-ignore */}
                  <Link className={cx('h-link')} href={`#${value}`}><LinkOutlined /></Link>
                  {children}
                </h2>
              },
              code(props) {
                const { children, className, node, ...rest } = props
                const match = /language-(\w+)/.exec(className || '')
                return <>
                  {match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      language={match[1]}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  )}
                </>
              }
            }}
          >{content}</Markdown>
        </div>
        <div className={cx('navbar-container')}>
          <MarkdownNavbar content={content} />
        </div>
      </div>

      <div className={cx("tag-container")}>
        <span className={cx("key")}>标签:</span>
        <div className={cx("value")}>
          {labels.map((item) => {
            const { label, id: labelId } = item;
            return <Label label={label} href={`/books/?label=${label}&page=${PAGE}&pageSize=${PAGE_SIZE}`} key={`${paperId}-${labelId}`} />
          })}
        </div>
      </div>
      <div className={cx("nav-container")}>
        {previous ? (
          <Link
            className="hover:text-blue-400"
            href={`/paper?id=${previous.id}`}
          >{`👈${previous.title}`}</Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            className="hover:text-blue-400"
            href={`/paper?id=${next.id}`}
          >{`${next.title}👉`}</Link>
        ) : (
          <div />
        )}
      </div>
    </div>

    {/* 评论区 */}
    <div className={cx("comment-region")}>
      <span id="comment" className={cx("title")}>
        评论{`(${comment.length})`}
      </span>

      <div className="w-full">
        {!comment.length && <Empty className='flex flex-col items-center justify-center h-[200px]' description={'暂无评论'} />}

        {comment.map((item: commentProps, index) => {
          return <Comment key={item.id} index={index} {...item} />;
        })}
      </div>
    </div>

    {/* 留言区 */}
    <div className={cx("message-region")}>
      <span className={cx("title")}>留言板</span>
      <form
        action={formAction}
        method="post"
        className={cx("form-container")}
      >
        <div className={cx("region")}>
          <label className="w-[60px]">用户名: </label>
          <Input
            className="flex-1"
            type="text"
            name="user"
            id="user"
            required
          />
        </div>
        <div className="w-full flex gap-[8px]">
          <label className="w-[60px]">留言: </label>
          <TextArea
            className="flex-1"
            name="text"
            id="use-text"
            required
            rows={4}
            placeholder="输入字符不超过300"
            maxLength={300}
          />
        </div>
        <div className={cx("operation-container")}>
          {
            !!searchParams.commentId && <Link
              className={cx('cancel-link')}
              href={`/paper/?id=${searchParams.id}`}
            >
              取消回复
            </Link>
          }

          <Button
            htmlType="submit"
            type="link"
            className="text-[14px]"
          >
            提交
          </Button>
        </div>
      </form>
    </div>
  </div>
}
