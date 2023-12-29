import React from 'react'
import Checkout from '../components/Checkout/Checkout'
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";



const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br /><br /><br />
      <Checkout />
      <Footer />
    </div>
  )
}

export default CheckoutPage