// ShopContext.js

import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) {
        cart[index] = 0;
    }
    return cart;
};

// Добавляем fetchWithAuth
const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('auth-token');
    const headers = options.headers || {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    const newOptions = { ...options, headers };
    return fetch(url, newOptions);
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkTokenValidity = () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            try {
                const decoded = jwtDecode(token); // Используем именованный импорт
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    // Токен истек
                    localStorage.removeItem('auth-token');
                    localStorage.removeItem('refresh-token');
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
                localStorage.removeItem('auth-token');
                localStorage.removeItem('refresh-token');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkTokenValidity();

        // Установить интервал для проверки каждые 5 минут
        const interval = setInterval(checkTokenValidity, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchWithAuth('https://servicebox35.pp.ru/api/allproducts');
                if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
                const data = await response.json();
                setAll_Product(data);
            } catch (error) {
                console.error('Fetch products error:', error);
            }
        };

        const fetchCartItems = async () => {
            const token = localStorage.getItem('auth-token');
            if (token) {
                try {
                    let response = await fetchWithAuth('https://servicebox35.pp.ru/api/getcart', {
                        method: 'POST',
                        body: JSON.stringify({}),
                    });
                    if (!response.ok) throw new Error(`Network response was not ok ${response.statusText}`);
                    let data = await response.json();
                    setCartItems(data);
                } catch (error) {
                    console.error('Fetch getcart error:', error);
                }
            }
        };

        fetchProducts();
        fetchCartItems();
    }, []);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        const token = localStorage.getItem('auth-token');
        if (token) {
            try {
                let response = await fetchWithAuth('https://servicebox35.pp.ru/api/addtocart', {
                    method: 'POST',
                    body: JSON.stringify({ "itemId": itemId }),
                });
                let data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Add to cart error:', error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
        const token = localStorage.getItem('auth-token');
        if (token) {
            try {
                let response = await fetchWithAuth('https://servicebox35.pp.ru/api/removefromcart', {
                    method: 'POST',
                    body: JSON.stringify({ "itemId": itemId }),
                });
                await response.json();
            } catch (error) {
                console.error('Remove from cart error:', error);
            }
        }
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo && itemInfo.new_price) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }


    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        isAuthenticated,
        setIsAuthenticated
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;