import React, { useState } from 'react'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'
import DashboardHero from '../../components/Shop/DashboardHero'

const ShopDashboardPage = () => {
  
  return (
    <div>
      <ShopHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <ShopSidebar active={1}  />
        </div>
        <DashboardHero />
      </div>
    </div>
  )
}

export default ShopDashboardPage