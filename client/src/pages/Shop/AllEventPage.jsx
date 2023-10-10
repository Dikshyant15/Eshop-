import React from 'react'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'
import AllEvents from "../../components/Shop/AllEvents";

const ShopAllEvents= () => {
  return (
    <div>
        <ShopHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <ShopSidebar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <AllEvents />
            </div>
          </div>
    </div>
  )
}

export default ShopAllEvents