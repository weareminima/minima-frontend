import axios from 'axios';

const CONTACT = axios.create({
  baseURL: 'https://sheet.best/api/sheets/1775d872-0e20-4bfb-b82d-ae1995119104',
  headers: { 'Content-Type': 'application/json' },
});

export default CONTACT;
