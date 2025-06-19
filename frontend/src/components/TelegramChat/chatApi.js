import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://servicebox35.pp.ru';

export const sendMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/send-message`, messageData, {
            timeout: 10000 // 10 секунд таймаут
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        throw new Error('Не удалось отправить сообщение. Пожалуйста, попробуйте снова.');
    }
};

export const getMessages = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/get-messages`, {
            params: { userId },
            timeout: 8000 // 8 секунд таймаут
        });
        return response.data || [];
    } catch (error) {
        console.error('Ошибка получения сообщений:', error);
        return [];
    }
};