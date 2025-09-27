import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <li onClick={()=>{setMenu("parts")}}> <Link style={{textDecoration:'none'}} to='/parts'>Запчасти</Link>{menu==="parts"?<hr/>:<></>} </li>
  </ul>
  </div>    
  );
}


export default Navbar