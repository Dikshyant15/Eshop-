import React from 'react'
import CreateEvent from '../../components/Shop/CreateEvent'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'

const CreateEventsPage = () => {
  return (
    <div>
    <ShopHeader />
    <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
            <ShopSidebar active={6} />
        </div>
        <CreateEvent />
    </div>
</div>  )
}

export default CreateEventsPage