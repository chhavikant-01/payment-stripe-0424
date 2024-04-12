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

  const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;



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
        <StripeCheckout
      stripeKey={stripePublicKey}
        token={makePayment}
        name='Buy Me a Coffee'
        amount={product.price * 100}
        shippingAddress
        billingAddress
         >
          <button className='btn-large green'>Buy Me a Coffee in just ${product.price}</button>
         </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
