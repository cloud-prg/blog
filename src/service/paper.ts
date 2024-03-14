import axios from 'axios';
import { defaultInstance } from './instance';
import { proxySuffix } from './proxy';
import { jointResponse } from '@/utils/responseHandler';

const booksInstance = axios.create({
  baseURL: '/',
  timeout: 3000, // 3s
});

// booksInstance.interceptors.request(requestHandler)

const apiMap = {
  async getPaginationPaperList(params: {
    type: string;
    page: number;
    pageSize: number;
  }) {
    const res = await booksInstance.post('', params);
    return res;
  },

  async getPaper(paperId: string) {
    const res: jointResponse = await defaultInstance.get(
      `${proxySuffix}/paper/getPaper/${paperId}`
    );
    return res;
  },

  async getCommentList(paperId: string) {
    const res: jointResponse = await defaultInstance.get(
      `${proxySuffix}/comment/getAll/${paperId}`
    );
    return res;
  },
};

export default apiMap;
