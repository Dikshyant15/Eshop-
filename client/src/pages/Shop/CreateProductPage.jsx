import React from 'react'
import CreateProduct from '../../components/Shop/CreateProduct'
import ShopHeader from '../../components/Shop/Layout/ShopHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'


const CreateProductPage = () => {
    return (
        <div>
            <ShopHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <ShopSidebar active={4} />
                </div>
                <CreateProduct />
            </div>
        </div>
    )
}

export default CreateProductPage