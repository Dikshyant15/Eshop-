import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from "react-icons/ai";
import { Button } from '@mui/material';
import axios from 'axios';
import { server } from '../../server';


const AllProduct = () => {
  const [data,setData] = useState([])
  const row = []

  
  useEffect(()=>{
    axios.get(`${server}/product/admin-get-all-product`,{withCredentials:true}).then((res)=>{
      setData(res.data.adminAllProduct)
    })
  },[])

  {data.forEach((item)=>{
    row.push({
      id:item._id,
      name:item.productName,
      price:item.discountPrice,
      stock:item.stock,
      sold:item.sold_out
    })})}
  

  const column = [
    { field: "id", headerName: "Product Id", minWidth: 100, flex: 0.1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.1,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "Preview",
      headerName: "Preview Product",
      minWidth:100 ,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div>
    <DataGrid
      rows={row}
      columns={column}
      pageSize={4}
      disableSelectionOnClick
      autoHeight
    />
  </div>  )
}

export default AllProduct