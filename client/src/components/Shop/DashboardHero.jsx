import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';  // Ensure this import is at the top level
import { DataGrid } from '@mui/x-data-grid';
import { getAllOrderOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";

const DashboardHero = () => {
    const { seller } = useSelector((state) => state.seller)
    const { allProducts } = useSelector((state) => state.product)
    const { product } = useSelector((state) => state.product)
    const { orders } = useSelector((state) => state.order)
    const[latestOrder,setLatestOrder]= useState([])

    const getAllLatestOrders = async(shopId)=>{
        await axios.get(`${server}/order/get-latest-order-shop/${shopId}`).then((res)=>{
            setLatestOrder(res.data.latestOrders)
        })
    }

    useEffect(()=>{
        getAllOrderOfShop(seller._id)
        getAllLatestOrders(seller._id)
    },[seller._id])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 1},
        {/*
          field: "productName",
          headerName: "Product Name",
          minWidth: 130,
          flex: 0.7,
      */},
    
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
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " View Order Details",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];
    
    const rows = []

    {latestOrder &&
        latestOrder.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        // productName:item.cart.productName,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    })
};

    return (
        <div className="w-full p-8">
            <div className='flex flex-row gap-[55.75rem]'>
                <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
                <h3 className="text-[24px] font-Poppins text-red-400"> Welcome {seller.name} </h3>
            </div>
            <div className="w-full block 800px:flex items-center justify-between">
                <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            Account Balance{" "}
                            <span className="text-[16px]">(with 10% service charge)</span>
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">availableBalance</h5>
                    <Link to="/dashboard-withdraw-money">
                        <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            All Orders
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
                    <Link to="/dashboard-orders">
                        <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            All Products
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{product && product.length}</h5>
                    <Link to="/dashboard-products">
                        <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
                    </Link>
                </div>
            </div>
            <br />
            <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
            <div className="w-full min-h-[45vh] bg-white rounded">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>
        </div >)
}

export default DashboardHero