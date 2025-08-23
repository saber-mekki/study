import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import  store from "./redux/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
      <PayPalScriptProvider options={{ "client-id": "AS-yWifWB7ymF9cYtAFxK9QyaGYvJ4XymiWcDH6HkJp2vtd3mZjdtq2Hlh9Oq45IE9CvVMjGU-lFuYmB" }}>
    <App />
    </PayPalScriptProvider>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
