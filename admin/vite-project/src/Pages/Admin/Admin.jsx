// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Route, Routes } from 'react-router'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'

import Addproduct from '../../Components/Addproduct/Addproduct';
import ListProduct from '../../Components/ListProduct/ListProduct';



const Admin = () => {
  return (
    <div className='admin'>
    <Sidebar/>
    <Routes>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>

    </Routes>
    </div>
  )
}

export default Admin
