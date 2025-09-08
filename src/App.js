import React from 'react';
import Routes from "./Routes";
import { ToastContainer } from 'react-toastify';
import { CartProvider } from "./components/context/CartContext";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <CartProvider>   
           <Routes />
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} />
      </CartProvider>
     
  
    </>
  );
}

export default App;
