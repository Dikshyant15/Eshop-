import React, { useState } from 'react'
import styles from '../../styles/styles'
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { MdBorderClear } from "react-icons/md";
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import AllOrder from './AllOrder';
import AllUser from './AllUser';
import AllProduct from './AllProduct';
import AllSeller from './AllSeller';
import AllEvent from './AllEvent';

const AdminDashboardMain = ({ active }) => {
  const row = []
  const columns = []
  return (
    <div className="w-full p-4">
      {active && active === 1 ?
        (
          <>
            <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>

            <div className='grid grid-cols-3'>

              <div className="w-full block 800px:flex items-center justify-between">
                <div className="w-full mb-4 800px:w-[50%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                  <div className="flex items-center">
                    <AiOutlineMoneyCollect
                      size={30}
                      className="mr-2"
                      fill="#00000085"
                    />
                    <h3
                      className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                    >
                      Total Earning
                    </h3>
                  </div>
                  <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">$ adminBalance</h5>
                </div>
              </div>
              <div className="w-full mb-4 800px:w-[50%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                  <GrWorkshop size={30} className="mr-2" fill="#00000085" />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    All Sellers
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">no of sellers</h5>
                <Link to="/admin-sellers">
                  <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
                </Link>
              </div>
              <div className="w-full mb-4 800px:w-[50%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                  <FiShoppingBag size={30} className="mr-2" fill="#00000085" />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    All Orders
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">no of orders</h5>
                <Link to="/admin-orders">
                  <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
                </Link>
              </div>
            </div>

            <br />
            <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
            <div className="w-full min-h-[45vh] bg-white rounded">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </>
        ) : ""}
      {/*nav controls*/}
      {active && active === 2 ? (<div><AllOrder /></div>) : ""}
      {active && active === 3 ? (<div><AllUser/></div>) : ""}
      {active && active === 4 ? (<div><AllProduct /></div>) : ""}
      {active && active === 5 ? (<div><AllSeller /></div>) : ""}
      {active && active === 6 ? (<div><AllEvent/></div>) : ""}
      {/*active && active === 7 ? (<div><AllOrder /></div>) : ""}
        {active && active === 8 ? (<div><AllOrder /></div>) : ""*/}
    </div>

  )
}




export default AdminDashboardMain