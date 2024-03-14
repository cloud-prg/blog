import { get } from 'lodash-es';
import { AxiosResponse } from 'axios';

const successStatus = [200, 201, 204];

interface responseProps {
  code: number;
  status: number;
  data?: any;
  msg?: string;
}

export type jointResponse = Partial<responseProps> & AxiosResponse;

export default function responseHandler(response: jointResponse) {
  const data = get(response, 'data.data', response.data);
  const code = get(response, 'data.code', 0);
  const status = get(response, 'data.status', 500);

  const res = {
    ...response,
    code,
    data,
    status,
  };

  if (!successStatus.includes(status) && code !== 0) {
    Object.assign(res, {
      msg: '服务器异常',
    });
  }

  return res;
}
