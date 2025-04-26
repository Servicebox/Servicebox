import React from 'react';

import { useNavigate } from 'react-router-dom';

//import Hero from '../Hero/Hero';

//import Offers from '../Offers/Offers';

import "./Shop.css"


const Shop = () => {
  const navigate = useNavigate()

  return (
    <div className=''>
      <a href="https://ru.servicebox.shop/" className="link" />
    </div>
  );
}

export default Shop;