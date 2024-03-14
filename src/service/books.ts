import { jointResponse } from '@/utils/responseHandler';
import { baseInstance } from './instance';
import { paginationDataSourceByLabelProps } from '@/type/books';

const apiMap = {
  async getPaperListByPage(params: {
    searchValue?: string;
    label?: string;
    page: number;
    pageSize: number;
  }) {
    const { label, searchValue } = params;

    let requestUrl: string = ""

    if (searchValue) {
      requestUrl = '/paper/getPaperListPaginationBySearch'
    } else if (label) {
      requestUrl = '/paper/getPaperListPaginationByLabel'
    } else {
      requestUrl = '/paper/getPaperListPagination/'
    }

    let res: jointResponse = await baseInstance.post(requestUrl, params);

    // if (label) {
    //   const { items } = res.data as paginationDataSourceByLabelProps;
    //   res.data.items = items.map((item) => {
    //     return item.papers[0];
    //   });
    // }

    return res;
  },
};

export default apiMap;
