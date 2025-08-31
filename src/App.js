import React from 'react';
import Routes from "./Routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    
      <Routes />
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} />
    </>
  );
}

export default App;
