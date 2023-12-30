import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";

const AllUser = () => {
  const row = []
  const handleDelete = () =>{console.log("hiii")}
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
            <Button onClick={handleDelete}>
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