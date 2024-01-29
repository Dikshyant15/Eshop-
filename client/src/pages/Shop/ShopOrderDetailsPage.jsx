import React from 'react'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import Footer from '../../components/Layout/Footer'
import ShopOrderDetails from "../../components/Shop/ShopOrderDetails";

const ShopOrderDetailsPage = () => {
  return (
    <div>
      <ShopHeader />
      <ShopOrderDetails />
      <Footer />
    </div>
  )
}

export default ShopOrderDetailsPage