import axios from 'axios';
import { getToken } from '../utils/user';
const token = getToken();

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

export const getProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};
