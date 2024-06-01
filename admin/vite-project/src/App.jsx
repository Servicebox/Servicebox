//App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as  Routes, Route } from 'react-router-dom';
import ListProduct from './Components/ListProduct/ListProduct';
import AddProduct  from './Components/Addproduct/Addproduct';
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  return (
    <div>
     <Navbar/> 
     <Admin/>
  <Routes>
          <Route path="/" element={<Admin />} /> {/* Главная страница */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
         
        </Routes>
    </div>
  )
}

export default App
 