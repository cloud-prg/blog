import { formatDate } from '@/utils/index';
import { FieldTimeOutlined, HistoryOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import Image from 'next/image';
import EmptySvg from 'src/assets/svg/empty.svg';

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

import RandomAvatar from '@/components/RandomAvatar';
import { Metadata, ResolvingMetadata } from 'next';

const cx = classNames.bind(styles);

type Props = {
  params: { id: string }
  searchParams: { [key: string]: any }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id: searchId } = searchParams;
  if (!searchId) {
    notFound();
  }

  const { code, data } = await service.paper.getPaper(searchId);
  code !== 0 && notFound();
  const { current } = data;
  const { id, title, cover, description, labels } = current;

  return {
    title: title,
    description,
    openGraph: {
      title,
      description,
      url: `https://blog.cloudprg.cn/paper/?id=${id}`,
      siteName: 'Cloudprg Blog(云程博客)',
      images: [
        {
          url: cover, // Must be an absolute URL
          width: 600,
          height: 400,
          alt: '封面图',
        },
      ],
      locale: 'zh_CN',
      type: 'website',
    },
  }
}


export default async function Paper(props: Props) {
  const { searchParams } = props;
  const { id: searchId,
    commentId: searchCommentId,
    replyId: searchReplyId,
    replyTarget,
    commentTarget
  } = searchParams;

  const filterTarget = (target)=>{
    return target?.includes('回复至') ? target?.split('回复至')[0] :target;
  }

  const searchReplyTarget = filterTarget(replyTarget);
  const searchCommentTarget = filterTarget(commentTarget);

  const userDefaultValue: string = searchReplyId ? `_你的用户名_ 回复至 ${filterTarget(searchReplyTarget)}@${searchReplyId}` : "";

  if (!searchId) {
    notFound();
  }

  let formAction: string = `${proxySuffix}`
  if (searchCommentId) {
    // notice: 提交后位移到指定的回复位置 e.g: /xxx#reply-[id] or /xxx#comment-[id]
    formAction += `/reply/create/${searchId}/${searchCommentId}`
  } else {
    // notice: 提交后位移到留言板位置 e.g: /xxx#message
    formAction += `/comment/create/${searchId}`
  }

  const { code, data } = await service.paper.getPaper(searchId);
  code !== 0 && notFound();
  const { current, previous = null, next = null } = data;
  const { id: paperId, title, description, createdAt, content, labels } = current;
  const time = formatDate(createdAt);

  const { code: commentCode, data: commentData } =
    await service.paper.getCommentList(searchId);
  commentCode !== 0 && notFound();
  const { comment } = commentData;

  const Comment = (props: commentProps) => {
    const { index, id, user, text, createdAt, reply = [] } = props;
    const time = formatDate(createdAt);

    return (
      <div id={`comment-${id}`} className={cx('comment')}>
        <div className={cx('avatar-region')}>
          <RandomAvatar />
          <span className={cx('uid')}>{`uid:${id}`}</span>
        </div>
        <div className={cx("text-region")}>
          <div className={cx('header', !searchReplyId && id == searchCommentId && 'header--active')}>
            <span className={cx('user')}>{user}</span>
            <span className={cx('date')}>{time}</span>
          </div>
          <span className={cx("text")}>{text}</span>
          <Link href={`/paper/?id=${searchId}&commentId=${id}&commentTarget=${user}#message`}
            className={cx('reply-link')}>回复</Link>

          <div id="reply-region" className={cx("reply-region")}>
            {reply.length > 0 &&
              reply.map((item) => {
                return <Reply key={item.id} parentId={id} {...item} />
              })
            }
          </div>
        </div>
      </div>
    );
  };

  const Reply = (props: replyProps) => {
    const { id, parentId, user, text, createdAt, author = false } = props;
    const time = formatDate(createdAt);
    
    let UserDom = ()=><span>{user}</span>;
    if(user?.includes('回复至')){
      const [origin, target] = user.split('回复至');
      UserDom = ()=><span>{origin} <span className='text-midnight'>回复至</span> {target}</span>;
    }

    return (
      <div id={`reply-${id}`} className={cx('reply')}>
        <div className={cx('avatar-region')}>
          <RandomAvatar />
          <span className={cx('uid')}>{`suid: ${id}`}</span>
        </div>
        <div className={cx("text-region")}>
          <div className={cx('header', id == searchReplyId && 'header--active')}>
            <span className={cx('user', author && 'user--author')}>{author ? '[博主]' : <UserDom />}</span>
            <span className={cx('date')}>{time}</span>
          </div>
          <span className={cx("text")}>{text}</span>
          <Link href={`/paper/?id=${searchId}&commentId=${parentId}&replyId=${id}&replyTarget=${user}#message`}
            className={cx('reply-link')}>回复</Link>
        </div>
      </div>
    );
  }

  const MessageTitle = () => {
    const id = searchReplyId || searchCommentId;
    const target = searchReplyTarget || searchCommentTarget;
    const href = searchReplyId ? `#reply-${searchReplyId}` : `#comment-${searchCommentId}`;

    return <>
      {id ?
        <div className={cx("title")}>
          <span className='flex items-center gap-[4px]'>
            回复至 <span className='text-primary-3'>{target}</span>
            <Link className='hover:text-primary-4 underline' href={href}>
              {`#${id}`}
            </Link>
          </span>

          <Link
            className={`${cx('cancel-link')} hover:text-primary-4`}
            href={`/paper/?id=${searchId}${href}`
            }
          >
            取消回复
          </Link>
        </div>
        :
        <span className={cx("title")}>留言板</span>
      }
    </>
  }


  return <>
    <div className={`${cx('paper-container')}`}>
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
            阅读{Math.floor(content ? content?.length / 600 : 0)}分钟
          </span>

        </span>
        {/* <span className={`${cx('description')}`}>{description}</span> */}
        <div className={`${cx('markdown-region')} default-style-sheet`}>
          <div className={cx('content')}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ children, ...props }) => {
                  return <Image className={cx('markdown-img')} src={props.src} alt={props.src}
                    width={800} height={600}
                  />
                },
                a: ({ children, ...props }) => {
                  const { href } = props as any;
                  const { value } = props.node.children[0] as any;
                  return <Link className={cx('markdown-link')} href={href}>{value}</Link>
                },
                h1: ({ children, ...props }) => {
                  const { value } = props.node.children[0] as any;
                  return <Link className={cx('h-link')} href={`#${value}`}>
                    <h1 id={value}>
                      {children}
                      {/* @ts-ignore */}
                      <LinkOutlined className={cx('link-icon')} />
                    </h1>
                  </Link>
                },
                h2: ({ children, ...props }) => {
                  const { value } = props.node.children[0] as any;
                  return <Link className={cx('h-link')} href={`#${value}`}>
                    <h2 id={value}>
                      {children}
                      {/* @ts-ignore */}
                      <LinkOutlined className={cx('link-icon')} />
                    </h2>
                  </Link>
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
            <div className="flex items-center gap-[4px]">
              <span>上一篇:</span>
              <Link
                className="hover:text-blue-400"
                href={`/paper?id=${previous.id}`}
              >{previous.title}</Link>
            </div>
          ) : (
            // 占位符
            <div />
          )}
          {next ? (
            <div className="flex items-center gap-[4px]">
              <span>下一篇:</span>
              <Link
                className="hover:text-blue-400"
                href={`/paper?id=${next.id}`}
              >{`${next.title}`}</Link>
            </div>
          ) : (
            // 占位符
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
          {!comment.length && <Empty
            image={EmptySvg.src}
            className='flex flex-col items-center justify-center h-[200px]' description={'暂无评论'} />}

          {comment.map((item: commentProps, index) => {
            return <Comment key={item.id} index={index} {...item} />;
          })}
        </div>
      </div>

      {/* 留言区 */}
      <div id="message" className={cx("message-region")}>
        <MessageTitle />

        <form
          action={formAction}
          method="post"
          className={cx("form-container")}
        >
          <div className={cx("region")}>
            <label className="w-[60px]">用户名: </label>
            <input
              defaultValue={userDefaultValue}
              placeholder="请输入用户名"
              className="flex-1"
              type="text"
              name="user"
              id="user"
              required
            />
          </div>
          <div className={cx("region")}>
            <label className="w-[60px]">留言: </label>
            <textarea
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
            <button
              type="submit"
              className="text-[14px] text-primary-2"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
}
