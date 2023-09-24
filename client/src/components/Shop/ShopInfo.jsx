import React from 'react'
import styles from '../../styles/styles'
import { Link } from 'react-router-dom'

const ShopInfo = ({isOwner}) => {
    return (
        <div className='w-full py-5'>
            <div className="w-full flex item-center justify-center">
                {/*<img
                    src={`${data.avatar?.url}`}
                    alt=""
                    className="w-[150px] h-[150px] object-cover rounded-full"
                />*/}
            </div>

            <div>
                <h3 className="text-center py-2 text-[20px] ">Shop Name</h3>
                <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                    description
                </p>
            </div>

            <div className="p-3">
                <h5 className="font-[600]">Address</h5>
                <h4 className="text-[#000000a6]">address</h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Phone Number</h5>
                <h4 className="text-[#000000a6]">phoneNumber</h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Total Products</h5>
                <h4 className="text-[#000000a6]"></h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Shop Ratings</h5>
                <h4 className="text-[#000000b0]"></h4>
            </div>
            <div className="p-3">
                <h5 className="font-[600]">Joined On</h5>
                <h4 className="text-[#000000b0]"></h4>
            </div>




            <div className="py-3 px-4">
                <Link to="/settings">
                    <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                        <span className="text-white">Edit Shop</span>
                    </div>
                </Link>
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                   
                >
                    <span className="text-white">Log Out</span>
                </div>
            </div>
        </div>
    )
}

export default ShopInfo