// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'



import TableMembersOrder from 'src/views/tables/TableMembersOrder'


const CallCenterPage = () => {
  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='CC Members Order' titleTypographyProps={{ variant: 'h6' }} />
          <TableMembersOrder />
          
        </Card>
      </Grid>

    </Grid>
  )
}

export default CallCenterPage