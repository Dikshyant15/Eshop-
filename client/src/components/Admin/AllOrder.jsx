import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const AllOrder = () => {
  const row = []
  const column = []
  return (
    <div>
      <h3 className="text-[22px] font-Poppins pb-2">All Orders</h3>

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

export default AllOrder