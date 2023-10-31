import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";


const AllProducts = () => {
  const { product } = useSelector((state) => state.product)
  const { seller } = useSelector((state) => state.seller)
  const dispatch = useDispatch()


  useEffect(
    () => {
      dispatch(getAllProductsShop(seller._id))
    }, [dispatch]
  )
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 220, flex: 0.6 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 120,
      flex: 0.6,
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
      flex: 0.6,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.6,
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
      flex: 0.6,
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
    product && product.forEach(element => {
      rows.push(
        {
          id: element._id,
          name: element.productName,
          price: "US$ " + element.discountPrice,
          Stock: element.stock,
          sold: element?.sold_out,
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

export default AllProducts