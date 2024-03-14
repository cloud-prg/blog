import { formatDate } from '@/utils/index';
import { UserOutlined } from '@ant-design/icons';
import { Button, Empty, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { mockCommentList, mockPaper } from 'src/constant/paper';
import service from 'src/service';
import { proxySuffix } from 'src/service/proxy';
import { commentProps, paperProps, replyProps } from 'src/type';

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
  const { title, description, createdAt, content } = current;
  const time = formatDate(createdAt);

  const { code: commentCode, data: commentData } =
    await service.paper.getCommentList(searchParams.id);
  commentCode !== 0 && notFound();
  const { comment } = commentData;

  const Comment = (props: commentProps) => {
    const { id, user, text, createdAt, reply = [] } = props;
    const time = formatDate(createdAt);

    return (
      <div id={`comment-${id}`} className="w-full flex border border-solid">
        <div className="w-[120px] p-[12px] pt-[24px] flex flex-col gap-[4px] items-center border border-solid border-black-500">
          <UserOutlined className="text-[24px]" />
          <span>{user}</span>
        </div>
        <div className="flex-1 flex flex-col border border-solid border-black-500">
          <span className="w-full p-[12px] mb-[12px] text-[16px]">{text}</span>
          <div className='w-full p-[12px] flex items-center justify-end gap-[12px]'>
            <span className="text-[14px] text-gray-400">
              {time}
            </span>
            <Link href={`/paper/?id=${searchParams.id}&commentId=${id}#comment-reply-${id}`}
              id={`comment-reply-${id}`}
              className='text-[14px] cursor:pointer hover:text-blue-400'>回复</Link>
          </div>

          <div className='w-full flex flex-col'>
            {reply.length > 0 &&
              reply.map((item) => {
                return <Reply key={item.id} {...item} />
              })
            }
          </div>
        </div>

      </div>
    );
  };

  const Reply = (props: replyProps) => {
    const { id, user, text, createdAt } = props;
    const time = formatDate(createdAt);

    return (
      <div id={`reply-${id}`} className="w-full flex border border-solid">
        <div className="w-[120px] flex flex-col gap-[4px] items-center justify-center border border-solid border-black-500">
          <UserOutlined className="text-[24px]" />
          <span>{user}</span>
        </div>
        <div className="flex-1 flex flex-col border border-solid border-black-500">
          <span className="w-full p-[12px] mb-[12px] text-[16px]">{text}</span>
          <div className='w-full p-[12px] flex items-center justify-end gap-[12px]'>
            <span className="text-[14px] text-gray-400">
              {time}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full mb-[20px] flex flex-col items-center">
        <span className="text-[24px]">{title}</span>
        <span className="text-[16px] text-gray-400">{description}</span>
        <Markdown>{content}</Markdown>
        <span className="w-full mt-[12px] text-right">
          提交于<span className="ml-[4px] text-gray-500">{time}</span>
        </span>
        <div className="w-full mt-[12px] flex justify-between">
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
      <div className="w-full flex flex-col mb-[20px] border border-solid border-black-400">
        <span id="comment" className="mb-[12px] text-[24px]">
          评论
        </span>

        <div className="w-full">
        {!comment.length && <Empty description={'暂无评论'} />}

          {comment.map((item: commentProps) => {
            return <Comment key={item.id} {...item} />;
          })}
        </div>
      </div>

      {/* 留言区 */}
      <div className="w-full flex flex-col pb-[32px] border border-solid border-black-500">
        <span className="mb-[12px] text-[24px]">留言板</span>
        <form
          action={formAction}
          method="post"
          className="flex flex-col gap-[24px]"
        >
          <div className="w-full flex gap-[8px]">
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
          <div className="w-full flex justify-end items-center gap-[8px]">
            {
              !!searchParams.commentId && <Link
                className='text-[14px] hover:text-blue-500'
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
  );
}
