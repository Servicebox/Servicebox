// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './components/Contexst/ShopContext';
import ErrorBoundary from './ErrorBoundary';
//import Widget from './components/Widget/Widget';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ShopContextProvider>
          <App />
          {/* <Widget link="tg://resolve?domain=@Tomkka" imageName="telegram" />*/}
        </ShopContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();