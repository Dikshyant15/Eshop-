import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const AllProduct = () => {
  const row = []
  const column = []
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