import axios from 'axios';
import { deserialize } from 'json-api-deserialize';

const ARTICLES = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/articles`,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: (data) => {
    try {
      const parsedData = JSON.parse(data);

      return {
        data: deserialize(parsedData.data),
        meta: parsedData.meta,
      };
    } catch (error) {
      return data;
    }
  },
});

export default ARTICLES;
