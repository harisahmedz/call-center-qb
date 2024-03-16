// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TableAgentStats from 'src/views/tables/TableAgentStats'

const AgentStatsPage = () => {
    return (
        <Grid container spacing={6}>

            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Agent Stats' titleTypographyProps={{ variant: 'h6' }} />
                    <TableAgentStats />

                </Card>
            </Grid>

        </Grid>
    )
}

export default AgentStatsPage