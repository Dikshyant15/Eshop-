import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForAdmin } from '../../redux/actions/order';

const AdminDashboardMain = ({ active }) => {
  const {allOrders} = useSelector((state)=>state.order)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllOrdersForAdmin())
  },[dispatch])

  const column = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1},
    {
      field: "shopName",
      headerName: "Shop Name",
      minWidth: 120,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 120,
      flex: 0.7,
    },


    {
      field: "createdAt",
      headerName: "Order Date",
      minWidth: 120,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 120,
      flex: 0.7,
    },

   
    
  ];
  const row = []

  { allOrders &&
    allOrders.forEach((item) => {
      row.push({
        id: item._id,
        status: item.status,
        shopName:item?.cart?.reduce((acc, item) => item.shop.name, 0),
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        // productName:item.cart.productName,
        total: "US$ " + item.totalPrice,
        createdAt:item.createdAt.slice(0,10)
      })
  })
}
  

  const { sellers } = useSelector((state)=> state.seller)
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
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers.length}</h5>
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
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{allOrders&&allOrders.length}</h5>
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
                columns={column}
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
      {/*active && active === 7 ? (<div><AllOrder /></div>) : ""*/}
    </div>

  )
}




export default AdminDashboardMain