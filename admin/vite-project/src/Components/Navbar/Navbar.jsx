// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import navlogo from '../../Assets/nav-logo.svg';
import navProfile from '../../Assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt='' className="nav-logo"/>
      <img src={navProfile} alt='' className="nav-profile"/>
<nav>
      <ul>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/listproduct">List Products</Link></li>
        <li><Link to="/addproduct">Add Product</Link></li>
      </ul>
    </nav>
    </div>
  )
}

export default Navbar
