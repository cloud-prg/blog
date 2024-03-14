import { paperProps } from './paper';

export interface paperAndLabelProps {
  id: number;
  label: string;
  papers: paperProps[];
}

export interface paginationDataSourceProps {
  items: paperProps[];
  total: number;
}

export interface paginationDataSourceByLabelProps {
  items: paperAndLabelProps[];
  total: number;
}

export type booksDataSourceProps =
  | paginationDataSourceProps
  | paginationDataSourceByLabelProps;

export interface queryItemProps {
  name: string;
  value: string | any;
}
