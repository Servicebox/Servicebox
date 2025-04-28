import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../Assets/upload_area.svg';

const Addproduct = () => {
    const [productDetails, setProductDetails] = useState({
        name: "", images: [], category: "", new_price: "", old_price: "", description: "", quantity: ""
    });

    const imageHandler = async (e) => {
        const files = Array.from(e.target.files).slice(0, 3);
        if (files.length < 1) {
            alert("Загрузите хотя бы одно изображение");
            return;
        }
        const formData = new FormData();
        files.forEach(file => formData.append('product', file));
        try {
            const response = await fetch('https://servicebox35.pp.ru/api/uploads', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setProductDetails(prev => ({ ...prev, images: data.image_urls }));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert("Ошибка загрузки изображений");
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        const payload = {
            ...productDetails,
            new_price: Number(productDetails.new_price),
            old_price: Number(productDetails.old_price),
            quantity: Number(productDetails.quantity)
        };
        if (payload.images.length < 1) {
            alert("Загрузите хотя бы одно изображение");
            return;
        }
        try {
            const response = await fetch('https://servicebox35.pp.ru/api/addproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("Товар успешно добавлен!");
                setProductDetails({ name: "", images: [], category: "", new_price: "", old_price: "", description: "", quantity: "" });
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ошибка добавления товара");
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
                    <div className="image-preview-container">
                        {productDetails.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                className='preview-image'
                                alt={`Preview ${index}`}
                                onError={(e) => {
                                    e.target.src = 'fallback-image-url';
                                }}
                            />
                        ))}
                    </div>
                    {productDetails.images.length < 4 && (
                        <img src={upload_area} className='addproduct-thumnnail-img' alt='' />
                    )}
                </label>
                <input
                    onChange={imageHandler}
                    type='file'
                    multiple
                    accept="image/*"
                    id="file-input"
                    hidden
                />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>Создать</button>
        </div>
    );
};


export default Addproduct;