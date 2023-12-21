// ProductsApi.js
export const fetchProducts = async (authId, authKey, method, limit, page) => {
    const url = "https://optfm.ru/api/";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        auth_id: authId, 
        auth_key: authKey, 
        method: method, 
        limit: limit, 
        page: page 
      })
    };
  
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Ошибка при выполнении запроса:', error);
    }
  };
  
  export const fetchImage = async (authId, authKey, elementId) => {
    const url = "https://optfm.ru/api/";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        auth_id: authId, 
        auth_key: authKey, 
        method: 'catalog.getImage', 
        element_id: elementId
      })
    };
  
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      // Обработка получения изображения
      return data;
    } catch (error) {
      throw new Error('Ошибка при выполнении запроса изображения:', error);
    }
  };