// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'; 

// ** MUI Imports
import {
  Box, Paper, Table, Collapse, TableRow, TableHead, TableBody,
  TableCell, Typography, IconButton, TableContainer
} from '@mui/material'

// ** Icons Imports

import useSWR from 'swr'
import { getApi } from 'api/methods'
import CircularProgress from '@mui/material/CircularProgress';
import { ChevronUp, ChevronDown, Magnify } from 'mdi-material-ui'
import { InputAdornment, TextField } from '@mui/material';
import { debounce } from 'lodash'; // Make sure to install lodash if it's not already installed


const formatDate = (dateString) => {
  if(dateString){
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const datePart = new Intl.DateTimeFormat('en-US', optionsDate)?.format(new Date(dateString));
    const timePart = new Intl.DateTimeFormat('en-US', optionsTime)?.format(new Date(dateString));

    // Returning JSX that formats the string across two lines
    return (
      <Fragment>
        <div>{datePart}</div>
        <div>at {timePart}</div>
      </Fragment>
    );
  } else{
    return 'No Date'
  }

};


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
        <TableCell align='left'>{formatDate(row.createdAt)}</TableCell>
        <TableCell align='left'>{row.name}</TableCell>
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
                    <TableCell >Cnic</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={row?.orderID}>
                      
                      <TableCell >{row.area},{row?.city}</TableCell>
                      <TableCell >{row?.cnic}</TableCell>
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


const fetcher = (endpoint, query) => () => getApi(endpoint, query);

const TableOrders = () => {
  // Define the endpoint and query parameters for fetching orders
  const [page, setPage] = useState(1);
  const itemsPerPage = 25; // Set this to whatever default you like
  const endpoint = '/orders/get';
  const { data: orders, error } = useSWR([endpoint, { _start: page, _limit: itemsPerPage }], fetcher(endpoint, { _start: page, _limit: itemsPerPage }));
  const totalPages = orders ? Math.ceil(orders.totalOrders / itemsPerPage) : 0;

  //SEARCH
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);



  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Debounce function to delay the search operation by 500 milliseconds
  const debouncedSearch = debounce(async (searchTerm) => {
    console.log(searchTerm)
    if (searchTerm.trim() === '') {
      setSearchResults(null);
      setLoading(false);
    } else {
      setLoading(true);
      setSearchError(null);

      const payload = {
        keyword: searchTerm,
      };

      try {
        const response = await getApi('/orders/search', payload);
        if (response.data) {
          setSearchResults(response.data);
          setLoading(false);
        } else {
          throw new Error(response.message || 'Error occurred while searching');
        }
      } catch (error) {
        setSearchError(error.message);
        setLoading(false);
      }
    }
  }, 500); // 500 milliseconds delay

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };


  const loadingView = (loading || !orders) &&(
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  
  const errorView =  ((searchError || error) && (searchTerm.trim() !=='')) && (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography color="error">{searchError|| error}</Typography>
      </Box>
    );
  
  const dataToDisplay = searchTerm.trim() !==''? searchResults : orders?.data;

  return (
    <>
    <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 },width: '95%', mr:'20px', ml:'20px' }}
        onChange={handleSearchChange}
        value={searchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' >
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
    
    
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order No.</TableCell>
            <TableCell align='left'>Date/Time</TableCell>
            <TableCell align='left'>Full Name</TableCell>
            <TableCell align='left'>Phone No</TableCell>
            <TableCell align='left'>Alt Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {(orders) && loading} */}
          {dataToDisplay?.map(row => (
            <Row key={row.orderID} row={row} />
          ))}
          
        </TableBody>
      </Table>
      {loadingView}
    {errorView}
          {!searchResults && (totalPages > 1 && (
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </Box>
    ))}
    </TableContainer>

  </>

    
  )
}

export default TableOrders
