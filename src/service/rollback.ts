import axios from 'axios';
import { defaultInstance, fetchInstance } from './instance';
import { proxySuffix } from '#/setupProxy.js';
import {  responseProps } from '@/utils/responseHandler';

const apiMap = {
  async getPaperList() {
    const res:responseProps = await fetchInstance({
      url: `${proxySuffix}/paper/getPaperList`,
    });
    return res;
  },
};

export default apiMap;
