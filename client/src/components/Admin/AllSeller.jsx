import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from '@mui/material';



const AllSeller = () => {
  const row = []
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
            <Button>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ]; return (
    <div>
      <DataGrid
        rows={row}
        columns={column}
        pageSize={4}
        disableSelectionOnClick
        autoHeight
      />
    </div>)
}

export default AllSeller