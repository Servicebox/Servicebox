import React, { useEffect } from 'react';

import { BrowserRouter, Routes,Router,Route , useNavigate} from 'react-router-dom';
 import NavBar from '../NavBar';
//import Hero from '../Hero/Hero';

//import Offers from '../Offers/Offers';
import NewCollections from '../NewCollections/NewCollections';
import Popular from '../Popular/Popular';
import Item from '../Item/Item';
import "./Shop.css"


 const Shop = () => {
    const navigate = useNavigate()
 
    return (
        <div className=''>
   <NewCollections />
   <Popular />   
   </div>
    );
}

export default Shop;