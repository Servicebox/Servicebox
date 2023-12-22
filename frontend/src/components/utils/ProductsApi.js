export const fetchProducts = async (authId, authKey, method, limit, page) => {
    const url = "https://optfm.ru/api/";
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: new URLSearchParams({ 
        auth_id: authId, 
        auth_key: authKey, 
        method: method, 
        limit: limit, 
        page: page 
      })
    };
    
    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
      }
    };
    
  
    export const fetchImage = async (authId, authKey, elementId) => {
        const url = "https://optfm.ru/api/";
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: new URLSearchParams({ 
            auth_id: authId, 
            auth_key: authKey, 
            method: 'catalog.getImage', 
            element_id: elementId
          })
        };
        
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          const imageUrl = data.picture;
          return imageUrl;
        } catch (error) {
          console.error('Ошибка при выполнении запроса изображения:', error);
          throw error;
        }
      };