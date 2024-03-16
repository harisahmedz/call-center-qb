// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Button, CardActions, CardContent, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { getApi } from 'api/methods'
import TableDense from 'src/views/tables/TableDense'
import Chip from '@mui/material/Chip'
import { Modal, Box } from '@mui/material';


const OrdersTrackingPage = () => {
    const [orderID, setOrderID] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [complaintType, setComplaintType] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');



    const statusObj = {
        default: { color: 'error' },
        normal: { color: 'primary' },
        aml: { color: 'warning' },
        express: { color: 'success' }
    }
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Here you would replace the URL with your actual API endpoint
        const payload = {
            orderID,
            phoneNo
        }

        // const apiURL = `https://backend.qistbazaar.pk/api/orders/orderstatus?orderID=${orderID}&phoneNo=${orderID}`;

        try {
            const response = await getApi('/orders/orderstatus', payload);
            console.log('response', response)
            if (response && response?.data) {
                // Assuming the API returns an array and we're interested in the first item
                setOrderDetails(response.data[0]);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
            setOrderDetails(null); // Reset or handle errors appropriately
        }
    };

    const handleComplaintTypeChange = (event) => {
        const value = event.target.value;
        setComplaintType(value);

        // Clear the description when a new type is selected
        if (value !== 'other') {
            setComplaintDescription('');
        }
    };

    const modalView = (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="complain-modal-title"
            aria-describedby="complain-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    outline: 'none'
                }}
            >
                <Typography id="complain-modal-title" variant="h6" component="h2">
                    Submit a Complaint
                </Typography>
                <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Order ID"
                        value={orderID}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Complaint Type"
                        value={complaintType}
                        onChange={handleComplaintTypeChange}
                        SelectProps={{
                            native: true,
                        }}
                        sx={{ mb: 2 }}
                    >
                        <option value=""></option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="product">Product Issue</option>
                        <option value="service">Service Issue</option>
                        <option value="other">Other</option>
                    </TextField>
                    {complaintType === 'other' && (
                        <TextField
                            fullWidth
                            label="Describe your issue"
                            value={complaintDescription}
                            onChange={(e) => setComplaintDescription(e.target.value)}
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                    )}
                    <Button variant="contained" color="primary" onClick={handleCloseModal}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );

    return (
        <>
            {modalView}
            <Grid container spacing={6}>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Order Tracking' titleTypographyProps={{ variant: 'h6' }} />
                        <form onSubmit={handleSubmit}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={5}>
                                        <TextField fullWidth label='Order No.' placeholder='eg:40XXX' value={orderID}
                                            onChange={(e) => setOrderID(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField fullWidth label='Phone No.' value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value)} placeholder='03000000000' />
                                    </Grid>
                                    <Grid item xs={6} sm={2}>

                                        <Button size='large' type='submit' sx={{ mr: 2, }} variant='contained'>
                                            Submit
                                        </Button>

                                    </Grid>
                                </Grid>
                            </CardContent>

                            

                        </form>
                        {orderDetails && (
                        <>
                            <CardContent>
                                <Grid container justifyContent="flex-end" spacing={5}>
                                    <CardActions>
                                        <Button size='large' type='button' spacing={2} sx={{ mr: 2 }} variant='outlined' color="success">
                                            Enquired
                                        </Button>
                                        <Button size='large' type='button' variant='outlined' color="error" onClick={handleOpenModal}>
                                            Complain
                                        </Button>
                                    </CardActions>
                                </Grid>
                            </CardContent>
                            <TableDense />
                        </>)
                        }
                        {orderDetails && (
                            <CardContent>
                                <Grid container item xs={12} spacing={5}>
                                    <Grid item xs={12} md={6} >
                                        <CardHeader title='Order Information' sx={{ pl: '0' }} titleTypographyProps={{ variant: 'h6' }} />
                                        {/* Displaying order information */}
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Product Name: </Typography><Typography variant='body2'>{orderDetails.productName}</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Installment Amount: </Typography><Typography variant='body2'>{orderDetails.installmentAmount.toLocaleString()} For {orderDetails.month} Months</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Advance Amount: </Typography><Typography variant='body2'>{orderDetails.advanceAmount.toLocaleString()}</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Total Amount: </Typography><Typography variant='body2'>{orderDetails.totalAmount.toLocaleString()}</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Order Note: </Typography><Typography> {orderDetails.orderNote}</Typography></Grid>
                                        {/* Add more details as needed */}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CardHeader title='Customer Information' sx={{ pl: '0' }} titleTypographyProps={{ variant: 'h6' }} />
                                        {/* <Typography variant="h6"> Information</Typography> */}
                                        {/* Displaying customer information */}
                                        <Grid container alignItems="center"><Typography variant='button' sx={{ mr: 1 }}>Portal Status: </Typography>

                                            <Chip
                                                label={'Express'}
                                                color={statusObj['express']?.color}
                                                sx={{
                                                    m: 1,
                                                    height: 24,
                                                    fontSize: '0.75rem',
                                                    textTransform: 'capitalize',
                                                    '& .MuiChip-label': { fontWeight: 500 }
                                                }}
                                            />
                                        </Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Phone No:  </Typography><Typography variant='body2'>{orderDetails.phoneNo}</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Alternative Phone No:  </Typography><Typography variant='body2'>{orderDetails.alternativePhoneNo}</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Area: </Typography><Typography variant='body2'>{orderDetails.area}</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> City: </Typography><Typography variant='body2'> {orderDetails.city}</Typography></Grid>
                                        <Grid container><Typography variant='button' sx={{ mr: 1 }}> Date: </Typography><Typography variant='body2'> {orderDetails.formattedCreatedAt}</Typography></Grid>
                                        {/* Add more details as needed */}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        )}</Card>
                </Grid>


            </Grid>
        </>
    )
}

export default OrdersTrackingPage
