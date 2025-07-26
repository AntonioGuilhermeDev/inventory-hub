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

export const getEstablishmentRazaoSocial = async (id) => {
  try {
    const response = await API.get('/establishments/' + id);
    return response.data.razao_social;
  } catch (error) {
    throw error;
  }
};
