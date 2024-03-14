import dayjs from 'dayjs';
export const copyText = (value: string) => {
  navigator.clipboard.writeText(value);
};

export const formatDate = (date: Date) => {
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
};

export const createQueryString = (
  searchParams: any,
  // data: { name: string; value: any }[]
  data: { name: string; value: string }[]
) => {
  const params = new URLSearchParams(searchParams.toString());

  data.forEach(({ name, value }) => {
    params.set(name, value);
  });
  return params.toString();
};
