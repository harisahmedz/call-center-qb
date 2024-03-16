// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { CircularProgress } from '@mui/material'

// const formatDate = (dateString) => {
//   if(dateString){
//     const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
//     const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
//     const datePart = new Intl.DateTimeFormat('en-US', optionsDate)?.format(new Date(dateString));
//     const timePart = new Intl.DateTimeFormat('en-US', optionsTime)?.format(new Date(dateString));

//     // Returning JSX that formats the string across two lines
//     return (
//       <Fragment>
//         <div>{datePart}</div>
//         <div>at {timePart}</div>
//       </Fragment>
//     );
//   } else{
//     return 'No Date'
//   }

// };

const Row = props => {
  
  // ** Props
  const { row } = props

  
  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell align='left'>
          {row.orderID}
        </TableCell>
        {/* <TableCell align='left'>{formatDate(row.createdAt)}</TableCell> */}
        <TableCell align='left'>{row.name}</TableCell>
        <TableCell align='left'>{row.cnic}</TableCell>
        <TableCell align='left'>{row.phoneNo}</TableCell>
        <TableCell align='left'>{row.alternativePhoneNo}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2, mb:10 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='large' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell >Advance</TableCell>
                    <TableCell align='right'>Amount/Months</TableCell>
                    <TableCell align='right'>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={row?.orderID}>
                      <TableCell component='th' scope='row'>
                        {row?.productNames}
                      </TableCell>
                      <TableCell >{row.advanceAmount}</TableCell>
                      <TableCell align='right'>{row?.installmentAmount}/{row?.month}</TableCell>
                      <TableCell align='right'>{row?.totalAmount}</TableCell>
                    </TableRow>
                    
                </TableBody>
              </Table>
              
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    
                    <TableCell >From</TableCell>
                    {/* <TableCell >Cnic</TableCell> */}
                    <TableCell >Email</TableCell>
                    <TableCell >address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={row?.orderID}>
                     
                      <TableCell >{row.area},{row?.city}</TableCell>
                      {/* <TableCell >{row?.cnic}</TableCell> */}
                      <TableCell >{row?.email}</TableCell>
                      <TableCell >{row?.address}</TableCell>
                    </TableRow>
                    
                </TableBody>
              </Table>

              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>OrderNote</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={row?.orderID}>
                      <TableCell >
                        {row?.orderNote || "Didn't recieve"}
                      </TableCell>
                    </TableRow>
                    
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}



  

const TableAgentOrders = ({orders, loading, error}) => {
      const loadingView = (loading) &&(
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  
    if (error){ 
        return  (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );}

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order No.</TableCell>
            {/* <TableCell align='left'>Date/Time</TableCell> */}
            <TableCell align='left'>Full Name</TableCell>
            <TableCell align='left'>CNIC</TableCell>
            <TableCell align='left'>Phone No</TableCell>
            <TableCell align='left'>Alt Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {(orders) && loading} */}

          {orders && orders?.map(row => (
            <Row key={row.orderID} row={row} />
          ))}
          
        </TableBody>
      </Table>
        {loadingView}
        
          
    </TableContainer>
  )
}

export default TableAgentOrders
