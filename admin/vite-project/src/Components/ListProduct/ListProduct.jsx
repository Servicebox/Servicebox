// eslint-disable-next-line no-unused-vars
import React,{useState, useEffect} from 'react'
import './ListProduct.css';
import cross_icon from '../../Assets/cross_icon.png'


const ListProduct = () => {
const [allproducts, setAllProducts] = useState([]);

const fetchInfo = async ()=>{
    await fetch('https://servicebox35.pp.ru/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
}
useEffect(()=>{
    fetchInfo();
},[])
    const remove_product = async (id)=>{
        await fetch('https://servicebox35.pp.ru/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id}),
        })
        await fetchInfo();
   
    }


  return (
    <div className='list-product'>
        <p>All product List</p>
      <div className='listproduct-format-main'>
        <p>Товар</p>
        <p>Описание</p>
        <p>Старая цена</p>
        <p>Новая цена</p>
        <p>Категория</p>
        <p>Удалить</p>
      </div>
      <div className='listproduct-allproducts'>
<hr/>
{allproducts.map((product)=>{
    return (
        <div key={product.id} className='listproduct-format-main listproduct-format'>
            <img className='listproduct-product-icon' src={product.image} alt='' />
            <p>{product.name}</p>
            <p>₽{product.old_price}</p>
            <p>₽{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt='' />
        </div>
    );
})}
      </div>
    </div>
  )
}

export default ListProduct
