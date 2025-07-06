import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async(email, password) => {
    const response = await API.post('/login', {
        email,
        password
    });
    return response.data;
};