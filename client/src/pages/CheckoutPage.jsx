import React from 'react'
import Checkout from '../components/Checkout/Checkout'
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CheckoutSteps from '../components/Checkout/CheckoutSteps';



const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br /><br /><br />
      <CheckoutSteps active={1} />
      <Checkout />
      <Footer />
    </div>
  )
}

export default CheckoutPage