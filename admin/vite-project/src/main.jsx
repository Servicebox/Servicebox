import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируйте createRoot из react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

//  корневой элемент в DOM
const rootElement = document.getElementById('root');

// рутовый элемент используя createRoot
const root = ReactDOM.createRoot(rootElement);

//  метод render на рутовом элементе
root.render(
  <BrowserRouter basename="/admin">
    <App />
  </BrowserRouter>
);