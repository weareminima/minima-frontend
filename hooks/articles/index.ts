import { useMemo } from 'react';

import { useQuery } from 'react-query';

import ARTICLES from 'services/articles';

export default function useArticles() {
  const query = useQuery('articles', () =>
    ARTICLES.request({
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
