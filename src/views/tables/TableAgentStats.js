// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
// ** MUI Imports
import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Tabs,
  Tab,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete, TextField,
} from '@mui/material';
import { getApi } from 'api/methods';
import useSWR from 'swr';
import { DatePicker, LocalizationProvider } from '@mui/lab';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TableCollapsible from './TableCollapsible';
import TableAgentOrders from './TableAgentOrders';

const fetcher = async (obj) => await getApi(obj[0], obj[1]);


const TableAgentStats = () => {
    const [value, setValue] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedAgent, setSelectedAgent] = useState(null);

    let query ={
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    }

    const { data: agentStats, error } = useSWR(
        ['/analytics/callcenter-orders', query ],
        fetcher
    );
    let queryParams = selectedAgent?.name.split('/')[1] ? {...query,keyword:selectedAgent?.name.split('/')[1]} : query;

    const { data: detailedInfo, mutate: mutateDetailedInfo, error:detailsError } = useSWR(selectedAgent ? ['/analytics/agent-order-details',queryParams] : null, fetcher);

   useEffect(() => {
    if (agentStats && agentStats.data && agentStats.data.length > 0) {
      const firstAgentKey = Object.keys(agentStats.data[0])[1]; // Skip the first "Total_Count" key
      
      const firstAgent = {

        name: firstAgentKey,

        orders: agentStats.data[0][firstAgentKey],

      };
      setSelectedAgent(firstAgent);
      
    }
  }, [agentStats]); 
  useEffect(()=>{
    console.log('selectedAgent',selectedAgent,selectedAgent?.name.split('/')[1])
    mutateDetailedInfo()
  },[selectedAgent])
  

    
    console.log(selectedAgent?.name.split('/')[1], detailedInfo);

    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
    };

    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
    };

    const handleChange = (event, newValue) => {
        console.log(newValue, 'newValue',Object.keys(agentStats?.data[0] || {})[newValue]);
        const agentKey = Object.keys(agentStats.data[0])[newValue];

        const agent = {
          name: agentKey,
          orders: agentStats.data[0][agentKey],
        };
        console.log(agent,'agent')
        setSelectedAgent(agent)
        setValue(newValue);
    };

  return (
     <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        
        <div style={{ display: 'flex', justifyContent: 'end', padding: '16px', gap:'10px' }}>
          {/* Select Input for Agent Stats */}
          <Autocomplete
            value={selectedAgent}
            onChange={(event, newValue) => {
              setSelectedAgent(newValue);
              const agentIndex = Object.keys(agentStats?.data[0] || {}).indexOf(newValue?.name);
              console.log(agentIndex,'agentIndex',newValue )
              setValue(agentIndex);
            }}

            options={Object.keys(agentStats?.data[0] || {}).map(key => ({
              name: key,
              orders: agentStats.data[0][key],
            }))}
            getOptionLabel={(option) => `${option?.name} (${option.orders})`}
            renderInput={(params) => (
              <TextField {...params} label="Search agent" variant="outlined" fullWidth />
            )}
            style={{ marginBottom: 20, width:200 }}
            isOptionEqualToValue={(option, value) => option.name === value}
          />

          {/* Date Range Selection */}
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
        </div>
    
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {console.log(agentStats?.data)}
        {agentStats?.data && Object?.keys(agentStats?.data[0] || []).map((item, index) => (
            <Tab key={index} label={`${item} (${agentStats?.data[0][item]})`} />
          
        ))}
      </Tabs>
      {console.log(detailedInfo?.data, !detailedInfo, detailsError)}
        {!detailsError && <TableAgentOrders orders={detailedInfo?.data} loading={!detailedInfo} error ={detailsError}/>}

    </Paper>
    </LocalizationProvider>
  )
}

export default TableAgentStats
