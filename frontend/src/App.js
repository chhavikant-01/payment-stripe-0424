import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {

  const [product, setProduct]=useState({
    name: "React from FB",
    price: 10,
    productBy: "FaceBook"
  })

  const makePayment = token =>{
    const body = {
      token,
      product
    }
    const headers = {
      "content-Type":"application/json"
    }

    return fetch(`http://localhost:9000/payment`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response=>{
      console.log("RESPONSE ", response)
      const {status}=response;
      console.log("STATUS ", status)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
        stripeKey={StripePublishableKey}
        token={makePayment}
        name='Buy React'
        amount={product.price * 100}
        shippingAddress
        billingAddress
         >
          <button className='btn-large green'>Buy React in just ${product.price}</button>
         </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
