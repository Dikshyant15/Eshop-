import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellersAdmin } from '../../redux/actions/seller';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';




const AllSeller = () => {
  const dispatch = useDispatch()
  const { sellers } = useSelector((state) => state.seller)
  const row = []
  const [sellerId, setSellerId] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllSellersAdmin())

  }
    , [dispatch])

  const deleteSeller = (id) => {
    axios.delete(`${server}/seller/delete-seller-admin/${id}`, { withCredentials: true }).then((res) => {
      toast.success(res.data.message)
    }

    )
    dispatch(getAllSellersAdmin());



  }


  {
    sellers && sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        address: item.address,
        joinedAt: item.createdAt
      })


    })
  }
  const column = [
    { field: "id", headerName: "Seller ID", minWidth: 140 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 140
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 140
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 140
    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 140
    },
    {
      field: "  ",
      minWidth: 140,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      minWidth: 140,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setSellerId(params.id) || setOpen(!open)} >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ]; return (
    <div className="w-full flex justify-center pt-5 ">
      <div className="w-[97%] ">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
        <DataGrid
          rows={row}
          columns={column}
          pageSize={4}
          disableSelectionOnClick
          autoHeight
        />
      </div>


      {open && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 onClick={() => setOpen(false)} />
            </div>
            <p className='text-2xl justify-center '>Are you sure you want to delete the seller?</p><hr />
            <div className=' flex justify-center gap-10 p-5'><Button variant='contained' onClick={() => deleteSeller(sellerId)}>Yes</Button>
              <Button variant='contained' onClick={() => setOpen(false)}>No</Button></div>
          </div>
        </div>)}

    </div>

  )
}

export default AllSeller