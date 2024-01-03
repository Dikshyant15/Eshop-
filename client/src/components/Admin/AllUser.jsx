import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllUsers } from '../../redux/actions/user';
import { toast } from 'react-toastify';
import { server } from '../../server';

const AllUser = () => {
  const dispatch = useDispatch()
  const row = []
  const [userId, setUserId] = useState("")
  const [open, setOpen] = useState(false)
  const { users } = useSelector((state) => state.user)
  console.log(userId)

  //taking the id from the table cell 
  const deleteUser = (id) => {
    axios.delete(`${server}/user/delete-user-admin`, { id }, { withCredentials: true }).then((res) => {
      toast.success(res.data.message)
    }

    )


  }

  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, [dispatch]);



  {
    users &&
      users.forEach((item) => {
        row.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          joinedAt: item.createdAt
        })


      })
  }
  const column = [
    { field: "id", headerName: "User ID", minWidth: 205 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 205,

    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 205,

    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 205,

    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 205,

    },

    {
      field: " ",
      minWidth: 205,
      type: "number",
      headerName: "Delete User",
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(!open)} >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">      <DataGrid
          rows={row}
          columns={column}
          pageSize={4}
          disableSelectionOnClick
          autoHeight
        />

          {open && (<div className="z-10 flex bg-white">asdas
          </div>)}

        </div>
      </div>
    </div>


  )
}

export default AllUser