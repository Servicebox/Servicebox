import axios from 'axios';
export const BASE_URL = "https://optfm.ru/api/"
export async function fetchProducts(authId, authKey, method, limit, page) {
    const instance = axios.create({
        baseURL: 'https://optfm.ru/api/',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const requestData = {
        auth_id: authId,
        auth_key: authKey,
        method: method,
        limit: limit,
        page: page
    };

    try {
        const response = await instance.post('/', requestData);

        const data = response.data;

        if (data.status === 1) {
            const products = data.response.items.map(item => ({
                id: item.id,
                name: item.name,
                prices: item.prices.map(priceItem => ({
                    id: priceItem.id,
                    name: priceItem.name,
                    currency: priceItem.currency,
                    price: priceItem.price
                }))
            }));
            return products;
        } else {
            throw new Error('Ошибка при получении товаров: ' + data.error.error_msg);
        }
    } catch (error) {
        throw new Error('Ошибка при выполнении запроса: ' + error);
    }
}