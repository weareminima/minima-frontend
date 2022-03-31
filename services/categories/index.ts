import axios from 'axios';
import { deserialize } from 'json-api-deserialize';

const CATEGORIES = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/categories`,
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

export default CATEGORIES;
