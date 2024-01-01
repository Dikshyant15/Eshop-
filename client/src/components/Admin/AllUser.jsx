import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllUsers } from '../../redux/actions/user';

const AllUser = () => {
  const dispatch = useDispatch()
  const row = []
  const {users} = useSelector((state)=>state.user)
 

useEffect(() => {
  dispatch(adminGetAllUsers());
}, [dispatch]);



{users &&
  users.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      email: item.email,
      role:item.role,
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
          <Button >
            <AiOutlineDelete size={20} />
          </Button>
        </>
      );
    },
  },
];

return (
  <DataGrid
    rows={row}
    columns={column}
    pageSize={4}
    disableSelectionOnClick
    autoHeight

  />

)
}

export default AllUser