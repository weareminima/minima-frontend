import { useMemo } from 'react';

import { useQuery } from 'react-query';

import CATEGORIES from 'services/categories';

export default function useCategories() {
  const query = useQuery('categories', () =>
    CATEGORIES.request({
      method: 'GET',
      url: '/',
      params: {
        sort: ['title'],
      },
    }).then((response) => response.data));

  const { data } = query;

  return useMemo(
    () => ({
      ...query,
      data: data?.data,
    }),
    [query, data?.data],
  );
}
