// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import './Addproduct.css'
import upload_area from '../../Assets/upload_area.svg'



const Addproduct = () => {

    const[image,setImage] = useState(false);
    const [productDetalis,setProductDetalis] = useState({
        name:"",
        image:"",
        category:"",
        new_price:"",
        old_price:"",      
        
    })
    
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetalis({...productDetalis,[e.target.name]:e.target.value})
    }

    const Add_Product = async ()=>{
console.log(productDetalis)
let responseData;
let product = productDetalis;
let formData = new FormData();
formData.append('product',image);

await fetch('https://servicebox35.pp.ru/api/uploads',{
    method:'POST',
    headers:{
        Accept:'apllication/json',
    },
    body:formData,
}) .then((resp) => resp.json()).then((data)=>{responseData=data})
if(responseData.success)
    {
        product.image = responseData.image_url;
        console.log(product);
        await fetch('https://servicebox35.pp.ru/api/addproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("product added"):alert("failed")
        })
    } 
    }



  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>product title</p>
        <input value={productDetalis.name} onChange={changeHandler} type='text'name='name' placeholder='Type here' />

      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
            <p>price</p>
            <input value={productDetalis.old_price} onChange={changeHandler} type='text'name='old_price' placeholder='Type here' />
        </div>
        <div className='addproduct-itemfield'>
            <p>offer price</p>
            <input value={productDetalis.new_price} onChange={changeHandler} type='text'name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className='addproduct-itemfield'>
<p>product category</p>
<select value={productDetalis.category} onChange={changeHandler} name='category' className='add-product-selector' >
<option value="part" > part</option>
<option value="electronic" > electronic</option>
<option value="usedsparepart" > usedsparepart</option>
</select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnnail-img' alt='' />

        </label>
        <input onChange={imageHandler} type='file' name='image' id="file-input" hidden />
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'> ADD</button>
    </div>
  )
}


export default Addproduct
