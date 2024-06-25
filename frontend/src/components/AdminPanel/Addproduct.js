import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
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
    description: "",
    quantity: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`https://servicebox35.pp.ru/product/${id}`)
        .then(response => response.json())
        .then(data => setProductDetails(data))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    });
  };

  const saveProduct = async () => {
    const formData = new FormData();
    if (image) {
      formData.append('product', image);
    }

    let productEndpoint = 'https://servicebox35.pp.ru/addproduct';
    if (id) {
      productEndpoint = `https://servicebox35.pp.ru/updateproduct/${id}`;
    }

    if (image) {
      try {
        const uploadResponse = await fetch('https://servicebox35.pp.ru/uploads', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });
        const responseData = await uploadResponse.json();
        if (responseData.success) {
          productDetails.image = responseData.image_url;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    try {
      const response = await fetch(productEndpoint, {
        method: id ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productDetails)
      });

      if (response.ok) {
        alert(`Product ${id ? 'updated' : 'added'}`);
        navigate('/admin-panel/listproduct');
      } else {
        throw new Error('Product save failed');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Something went wrong. Please try again.');
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
          <option value="part">part</option>
          <option value="electronic">electronic</option>
          <option value="usedsparepart">usedsparepart</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnnail-img' alt='добавление изо' />
        </label>
        <input onChange={imageHandler} type='file' name='image' id="file-input" hidden />
      </div>
      <button onClick={saveProduct} className='addproduct-btn'>{id ? 'UPDATE' : 'ADD'}</button>
    </div>
  );
};

export default Addproduct;