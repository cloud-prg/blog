import { get } from 'lodash-es';
import { ErrorHandler } from 'next/dist/server/app-render/create-error-handler';
import { notFound } from 'next/navigation';
import { message } from 'antd'

// 不需要全局提示的错误
const noGlobalPromptCodes: number[] = [];

export default function errorHandler(error: ErrorHandler) {
  // 忽略因取消请求而引发的错误
  const isCanceled =
    error && !(error instanceof Error) && typeof error === 'string';

  if (isCanceled) {
    return;
  }

  const status: number = get(error, 'response.status', 0);
  const code: number = get(error, 'response.data.code', 0);

  // 处理401
  if (status === 401) {
    return (window.location.href = `/rbac/login?next=${window.location.href}`);
  } else if (!noGlobalPromptCodes.includes(code)) {
    const msg = get(error, 'response.data.message', '服务端异常');
    message.error(msg);
    notFound();
  }

  Promise.reject(error);
}
