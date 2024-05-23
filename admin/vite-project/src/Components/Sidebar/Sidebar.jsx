// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'
import add_product_icon from '../../Assets/Product_Cart.svg'
import list_product_icons from '../../Assets/Product_list_icon.svg'


const Sidebar = () => {
  return (
    <div className='sidebar'>
    
<Link to={'/addproduct'} style={{textDecoration:"none"}}>
<div className='sidebar-item'>
<img src={add_product_icon} alt='' />
<p>товары</p>
</div>
</Link>
<Link to={'/listproduct'} style={{textDecoration:"none"}}>
<div className='sidebar-item'>
<img src={list_product_icons} alt='' />
<p>список товаров</p>
</div>
</Link>
    </div>
  )
}

export default Sidebar
