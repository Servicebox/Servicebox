import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../Assets/upload_area.svg';

const Addproduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: "",
        description: "",  // новое поле для описания
        quantity: "", // Поле для количества
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ 
            ...productDetails, 
            [e.target.name]: e.target.value
        });
    };

const Add_Product = async () => {
    if (!productDetails.category) {
        alert("Please select a category.");
        return;
    }

    const formData = new FormData();
    formData.append('name', productDetails.name);
    formData.append('category', productDetails.category);
    formData.append('new_price', productDetails.new_price);
    formData.append('old_price', productDetails.old_price);
    formData.append('description', productDetails.description);
    formData.append('quantity', productDetails.quantity); 

    if (image) {
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('https://servicebox35.pp.ru/api/uploads', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error(`Upload failed: ${uploadResponse.statusText}`);
            }

            const responseData = await uploadResponse.json(); // Объявляем переменную здесь

            if (responseData.success) {
                productDetails.image = responseData.image_url;

                console.log("Product details being sent:", productDetails);

                const addProductResponse = await fetch('https://servicebox35.pp.ru/api/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productDetails),
                });

                if (!addProductResponse.ok) {
                    throw new Error(`Add product failed: ${addProductResponse.statusText}`);
                }

                const addProductResponseData = await addProductResponse.json();
                addProductResponseData.success ? alert("Product added") : alert("Failed");
            }
        } catch (error) {
            console.error("Error during product addition:", error);
            alert("Something went wrong. Please try again.");
        }
    } else {
        alert("Please upload an image.");
    }
};

 return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>название товара</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>цена</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
                </div>
                <div className='addproduct-itemfield'>
                    <p>цена со скидки</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>описание товара</p>
                <textarea value={productDetails.description} onChange={changeHandler} name='description' placeholder='Type here'></textarea>
            </div>

   <div className='addproduct-itemfield'>
                <p>количество на складе</p>
                 <input value={productDetails.quantity} onChange={changeHandler} type='number' name='quantity' placeholder='Type here' />
            </div>
            <div className='addproduct-itemfield'>
                <p>product category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value="">Выбор категории</option>
                    <option value="part">для СЦ</option>
                    <option value="electronic">electronic</option>
                    <option value="usedsparepart">usedsparepart</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnnail-img' alt='' />
                </label>
                <input onChange={imageHandler} type='file' name='image' id="file-input" hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default Addproduct;