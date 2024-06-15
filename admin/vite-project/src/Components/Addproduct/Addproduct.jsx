// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import './Addproduct.css'
import upload_area from '../../Assets/upload_area.svg'

const Addproduct = () => {

    const [image, setImage] = useState(null);
    const [productDetalis, setProductDetalis] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: "",      
    });
    
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

const changeHandler = (e) => {
    setProductDetalis({ 
        ...productDetalis,
        [e.target.name]: e.target.value,
    });
};

const Add_Product = async () => {
    if (!productDetalis.category) {
        alert("Please select a category.");
        return;
    }

    let responseData;
    const formData = new FormData();
    if (image) {
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('/api/uploads', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error(`Upload failed: ${uploadResponse.statusText}`);
            }

            responseData = await uploadResponse.json();

            if (responseData.success) {
                productDetalis.image = responseData.image_url;
                console.log(productDetalis);

                const addProductResponse = await fetch('/api/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productDetalis),
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
                <input value={productDetalis.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>цена</p>
                    <input value={productDetalis.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
                </div>
                <div className='addproduct-itemfield'>
                    <p>цена со скидки</p>
                    <input value={productDetalis.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
                </div>
            </div>
<div className='addproduct-itemfield'>
    <p>product category</p>
    <select value={productDetalis.category} onChange={changeHandler} name='category' className='add-product-selector'>
        <option value="">Выбор категории</option>
        <option value="part">part</option>
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