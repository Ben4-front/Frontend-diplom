import axios from 'axios';

const BASE_URL = 'https://students.netoservices.ru/fe-diplom/';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});