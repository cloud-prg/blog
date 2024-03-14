import { commentProps, paperProps } from '@/type/index';

export const mockPaperList: paperProps[] = [
  {
    id: '11',
    title: '我的第一个全栈项目',
    description: '基于nx nestjs nextjs',
    createdAt: new Date(),
    label: [],
    content:
      'bgfx 提供了一组调试文本输出的 api ，可以把一些一组一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输调试文本输一组调试文本输一组调试文本输文本信息显示在屏幕上。这些 API 非常简陋，只是提供了一个文本模式缓冲区。离控制台还很远。',
  },
  {
    id: '22',
    title: '2024年,互联网行业又一春',
    description: 'xxx',
    createdAt: new Date(),
    label: [],
    content:
      'bgfx 提供了一组调试文本输出的 api ，可以一组调试文本输一组调试文本输把一些文本信息显示在屏幕上。这些 API 非常简陋，只是提供了一个文本模式缓冲区。离控制台还很远。',
  },
  {
    id: '33',
    title: '2024年,互联网行业又一春',
    description: 'xxx',
    createdAt: new Date(),
    label: [],
    content:
      'bgfx 提供了一组调试文本输出的 api 了一组一组调试文本输一组调试文本输调试文本输出的 api ，了一组调试文本输出的 api ，，可以把一些文本信息显示在屏幕上。这些 API 非常简陋，只是提供了一个文本模式缓冲区。离控制台还很远。',
  },
  {
    id: '44',
    title: '2024年,互联网行业又一春',
    description: 'xxx',
    createdAt: new Date(),
    label: [],
    content:
      'bgfx 提供了一组调试文本输出的 api ，可以一组调试文本输一组调试文本输把一些文了一组调试文本输出的 api ，了一组调试文本输出的 api ，本信息显示在屏幕上。这些 API 非常简陋，只是提供了一个文本模式缓冲区。离控制台还很远。',
  },
];

export const mockPaper: paperProps = {
  id: '11',
  title: '我的第一个全栈项目',
  description: '基于nx nestjs nextjs',
  createdAt: new Date(),
  label: [],
  content:
    'bgfx 提供了一组调试文本输出的 api ，可以把一些一组一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输一组调试文本输调试文本输一组调试文本输一组调试文本输文本信息显示在屏幕上。这些 API 非常简陋，只是提供了一个文本模式缓冲区。离控制台还很远。',
};

export const mockCommentList: commentProps[] = [
  {
    id: 11,
    user: 'dinglei',
    text: '这是一条评论',
    createdAt: new Date(),
    reply: [],
  },
  {
    id: 22,
    user: 'dinglei',
    text: '这是一条评论',
    createdAt: new Date(),
    reply: [],
  },
  {
    id: 33,
    user: 'dinglei',
    text: '这是一条评论',
    createdAt: new Date(),
    reply: [],
  },
];
