import React from 'react'
import Payment from '../components/Payment/Payment'
import Header from '../components/Layout/Header'
// import Checkout from '../components/Checkout/Checkout'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
      <Header />
      <br /><br />
      <CheckoutSteps />
      <Payment />
      <br /><br />
      <Footer />
    </div>
  )
}

export default PaymentPage