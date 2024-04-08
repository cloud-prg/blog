import { fetchInstance } from './instance';
import { proxySuffix } from '#/setupProxy.js';
import { jointResponse, responseProps } from '@/utils/responseHandler';

const apiMap = {
  async getPaperListPagination(params: { page: number; pageSize: number }) {
    const res: responseProps = await fetchInstance({
      method: 'POST',
      url: proxySuffix + '/paper/getPaperListPagination',
      body: params,
    })

    return res;
  },
  async getCategories() {
    const res: responseProps = await fetchInstance({
      url: proxySuffix + '/label/getCategories',
    })

    return res;
  },
};

export default apiMap;