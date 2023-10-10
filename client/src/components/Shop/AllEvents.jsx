import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";


const AllEvents = () => {
  // const {products} = useSelector((state)=>state.products)
  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
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
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "endDate",
      headerName: "Event End Date",
      type: "number",
      minWidth: 130,
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

  return (
    <div className= " w-full p-5">
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