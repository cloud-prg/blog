import axios from 'axios';
import { baseInstance, defaultInstance } from './instance';
import { proxySuffix } from './proxy';
import { jointResponse } from '@/utils/responseHandler';

const apiMap = {
  async getPaperListPagination(params: { page: number; pageSize: number }) {
    const res: jointResponse = await defaultInstance.post(
      proxySuffix + '/paper/getPaperListPagination',
      params
    );
    return res;
  },

  async getCategories() {
    // const res = await baseInstance.get('/label/getCategories');
    const res: jointResponse = await defaultInstance.get(
      proxySuffix + '/label/getCategories'
    );
    return res;
  },
};

export default apiMap;