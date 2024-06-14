//App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Routes, Route } from "react-router-dom"; 
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import Addproduct from './Components/Addproduct/Addproduct';
import ListProduct from './Components/ListProduct/ListProduct';


const App = () => {
  return (
    <div>
     <Navbar/> 
      <Routes>
         <Route path="*" element={<Admin />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  )
}

export default App
 