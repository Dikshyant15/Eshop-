import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { server } from '../../server';
import axios from 'axios';




const AllEvent = () => {
  const [data, setData] = useState([])


  useEffect(() => {
    axios.get(`${server}/event/admin-get-all-events`, { withCredentials: true }).then((res) => {
      setData(res.data.adminAllEvents)
    })

  }, [])
  const row = []

  data && data.forEach((item) => {
    row.push({
      id: item._id,
      eventName: item.eventName,
      price: item.discountPrice,
      stock: item.stock,
      sold: item.sold_out

    }
    )



  })
  const column = [
    { field: "id", headerName: "Product Id", minWidth: 150, },
    {
      field: "eventName",
      headerName: "Name",
      minWidth: 180,

    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,

    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,

    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,

    },
    {
      field: "Preview",

      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ]; return (
    <div>
      <h3 className="text-[22px] font-Poppins pb-2">All Events</h3>

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

export default AllEvent