import React from 'react'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProducts = () => {
  return (
    <div>
        <ShopHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopSidebar active={3} />
            </div>
            <div className="w-full justify-center flex">
                <AllProducts />
            </div>
          </div>
    </div>
  )
}

export default ShopAllProducts