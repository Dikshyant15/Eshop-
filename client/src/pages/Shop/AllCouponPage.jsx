import React from 'react'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'
import AllCoupons from '../../components/Shop/AllCoupons';

const AllCouponsPage= () => {
  return (
    <div>
        <ShopHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopSidebar active={9} />
            </div>
            <div className="w-full justify-center flex">
                <AllCoupons />
            </div>
          </div>
    </div>
  )
}

export default AllCouponsPage