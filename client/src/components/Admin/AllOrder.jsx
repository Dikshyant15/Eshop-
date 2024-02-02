import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from '../../redux/actions/order';
import { AiOutlineArrowRight } from "react-icons/ai";



const AllOrder = () => {
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
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },


    {
      field: "createdAt",
      headerName: "Order Date",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
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
  return (
    <div>
      <h3 className="text-[22px] font-Poppins pb-2">All Orders</h3>

      <DataGrid
        rows={row}
        columns={column}
        pageSize={4}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}

export default AllOrder