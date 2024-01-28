import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye,AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEventsShop } from "../../redux/actions/event";
import { getAllOrderOfShop } from '../../redux/actions/order';
// import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";


const AllEvents = () => {
  const { seller } = useSelector((state) => state.seller)
  const { orders } = useSelector((state) => state.order)

  const dispatch = useDispatch()

  useEffect(
    ()=>{
      dispatch(getAllOrderOfShop(seller._id)) 
    },[dispatch]
  )
  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 220, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      flex: 0.6,
     
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemQty",
      headerName: "Item Quantity",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "View order details",
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


  const rows = [];

  {
    orders && orders.forEach(element => {
      rows.push({
        id: element._id,
        status: element.status,
        itemQty: element.cart.length,
        total: `USD ${element.totalPrice}`,
      }
      )


    });
  }

  return (
    <div className=" w-full p-5">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}

export default AllEvents