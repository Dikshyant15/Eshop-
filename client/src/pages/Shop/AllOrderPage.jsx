import React from 'react'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'
import AllOrders from "../../components/Shop/AllOrders";

const ShopAllOrders= () => {
  return (
    <div>
        <ShopHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopSidebar active={2} />
            </div>
            <div className="w-full justify-center flex">
                <AllOrders />
            </div>
          </div>
    </div>
  )
}

export default ShopAllOrders