import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_Product] = useState([]);
    const [all_services, setAll_Services] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response = await fetch('https://servicebox35.pp.ru/api/allproducts', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) throw new Error(`Network response was not ok ${response.statusText}`);
                let data = await response.json();
                setAll_Product(data);
            } catch (error) {
                console.error('Fetch allproducts error:', error);
            }
        };

        const fetchCartItems = async () => {
            const token = localStorage.getItem('auth-token');
            if (token) {
                try {
                    let response = await fetch('https://servicebox35.pp.ru/api/getcart', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
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
                let response = await fetch('https://servicebox35.pp.ru/api/addtocart', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
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
                let response = await fetch('https://servicebox35.pp.ru/api/removefromcart', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
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

    const contextValue = { getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;