import React from 'react';
import Routes from "./Routes";
import Status from './Status';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Status/>
      <Routes />
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} />
    </>
  );
}

export default App;
