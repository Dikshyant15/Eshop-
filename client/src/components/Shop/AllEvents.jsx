import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEventsShop } from "../../redux/actions/event";
// import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";


const AllEvents = () => {
  const { event } = useSelector((state) => state.event)
  const { seller } = useSelector((state) => state.seller)

  const dispatch = useDispatch()

  useEffect(
    ()=>{
      dispatch(getAllEventsShop(seller._id))

    }
  )
  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 220, flex: 0.7 },
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 180,
      flex: 0.6,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "startDate",
      headerName: "Event Start Date",
      type: "number",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "endDate",
      headerName: "Event End Date",
      type: "number",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Link to={`/product/${params.id}`}>
      //         <Button>
      //           <AiOutlineEye size={20} />
      //         </Button>
      //       </Link>
      //     </>
      //   );
      // },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Button onClick={() => handleDelete(params.id)}>
      //         <AiOutlineDelete size={20} />
      //       </Button>
      //     </>
      //   );
      //},
    },
  ];


  const rows = [];

  {
    event && event.forEach(element => {
      rows.push({
        id: element._id,
        name: element.eventName,
        price: element.originalPrice,
        stock: element.stock,
        sold: element.sold_out,
        startDate: element.start_Date,
        endDate: element.finish_Date
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