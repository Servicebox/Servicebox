import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import cart_icon from './Assets/cart_icon.png'


import './NavBar.css'
import { ShopContext } from './Contexst/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);

  return (
      <div className="navbar">
          <div className="nav-logo">
          
              
          </div>
          <ul className='nav-menu'>
    
    <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none'}} to='/Shop'>Магазин</Link>{menu==="shop"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("parts")}}> <Link style={{textDecoration:'none'}} to='/parts'>Запчасти</Link>{menu==="parts"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("electronics")}}> <Link style={{textDecoration:'none'}} to='/electronics'>Аксессуары</Link>{menu==="electronics"?<hr/>:<></>} </li>
    <li onClick={()=>{setMenu("usedspareparts")}}><Link style={{textDecoration:'none'}} to='/usedspareparts'> б/у запчсти</Link>{menu==="usedspareparts"?<hr/>:<></>} </li>
  </ul>
  </div>    
  );
}


export default Navbar