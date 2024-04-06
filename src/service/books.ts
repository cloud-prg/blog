import { jointResponse } from '@/utils/responseHandler';
import { baseInstance, defaultInstance } from './instance';
import { paginationDataSourceByLabelProps } from '@/type/books';
import { proxySuffix } from '#/setupProxy';

const apiMap = {
  async getPaperListByPage(params: {
    searchValue?: string;
    label?: string;
    page: number;
    pageSize: number;
  }) {
    try {
      const { label, searchValue } = params;

      let requestUrl: string = `${proxySuffix}/paper`

      if (searchValue) {
        requestUrl += '/getSearchPaperListPagination'
      } else if (label) {
        requestUrl += '/getPaperListPaginationByLabel'
      } else {
        requestUrl += '/getPaperListPagination/'
      }

      let res: jointResponse = await defaultInstance.post(requestUrl, params);

      // if (label) {
      //   const { items } = res.data as paginationDataSourceByLabelProps;
      //   res.data.items = items.map((item) => {
      //     return item.papers[0];
      //   });
      // }

      return res;
    } catch (error) {
      console.log(`===error getPaperListByPage error`, error)
    }
  },
};

export default apiMap;
