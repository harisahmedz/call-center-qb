// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { getApi } from 'api/methods'
import useSWR from 'swr'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import { Button, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const columns = [

  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'orders', label: 'Orders', minWidth: 100 },

]

// Modify createData to fit the API response structure
function createData(name, orders) {
  return { name, orders };
}

const fetcher = async (obj) => await getApi(obj[0], obj[1]);

const TableMembersOrder = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  // Fetch data with SWR
  const { data: membersOrders, error } = useSWR(
    ['/analytics/callcenter-orders', { startDate: startDate.toISOString().split('T')[0], endDate: endDate.toISOString().split('T')[0] }],
    fetcher
  );

  const createRowsFromData = (data) => {
    return Object.keys(data).map((key) => {
      if (key !== 'Total_Count') {
        return createData(key, data[key]);
      }
    }).filter(Boolean);
  }

  let rows = [];

  if (membersOrders && membersOrders.data) {
    rows = createRowsFromData(membersOrders.data[0]);
    console.log(rows, 'rows')
    
    // Sorting rows based on orders

    rows.sort((a, b) => b?.orders - a?.orders);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // Date picker change handlers
  const handleStartDateChange = (newValue) => {
    console.log(newValue)
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    console.log(newValue)
    setEndDate(newValue);
  };

  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {/* Date Range Selection */}
        <div style={{ display: 'flex', justifyContent: 'end', padding: '16px', gap:'10px' }}>

          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker

            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <Button variant="contained" onClick={handleDateRangeSearch}>Search</Button> */}
        </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id]

                    return (

                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>

                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </LocalizationProvider>
  )
}

export default TableMembersOrder
