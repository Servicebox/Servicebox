import axios from 'axios';

const api = axios.create({
  baseURL: '/' // Используем относительный путь, так как фронтенд и бэкенд находятся на одном домене
});

export const sendMsg = async (data) => {
  try {
    const response = await api.post('/telegram', data); // Используем просто /telegram как адрес для POST запроса
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};