import React,{useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {makeStyles, Box, Typography} from '@material-ui/core'

const useStyles =  makeStyles((theme) => ({
  datagrid:{
    color: theme.palette.text.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: 8,
      '& p, .MuiDataGrid-cell, .MuiDataGrid-columnHeaderTitle':{
      fontSize: 10,
      },
      fontWeight:'bold',
    },
    [theme.breakpoints.up('xs')]: {
      fontSize: 14,
      '& p, .MuiDataGrid-cell, .MuiDataGrid-columnHeaderTitle':{
        fontSize: 12,
        },
    },
    '& .MuiDataGrid-columnsContainer':{
      fontSize:11,
    }
  }
}));
const HoldingsTable = ({holdings, setSelectedHolding, setActiveCellIndex}) =>{

  const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD'})

  const columns = [   
    {
      field: 'id',
      headerName: 'Id',
      type: 'number',
      hide:true,
      editable: false,
    }, 
    {
        field: 'asset.name',
        headerName: 'Name',
        editable: false,
        flex:1,
        renderCell: (params) => (
          <Box style={{paddingTop:'1rem', paddingBottom:'1rem'}}>
            <Typography variant="body2">
              {params.row.asset.name}
            </Typography>
            <Typography variant="body2">
              <b>{params.row.asset.symbol}</b>
            </Typography>
          </Box> 
        ),
    },
    {
      field: 'total_cost',
      headerName: 'Cost Basis',
      renderHeader: (params) => (
        <strong>
          <Typography variant="body2">Total</Typography>
          <Typography variant="body2">Cost</Typography>
        </strong>
      ),
      editable: false,
      flex:0.5,
      minWidth: 100,
      valueFormatter: (params) => {
          return `${numberFormatter.format(params.value)}`
        },
    },
    {
      field: 'total_value',
      headerName: 'Value',
      minWidth: 90,
      flex:0.5,
      editable: false,
      valueFormatter: (params) => {
          return `${numberFormatter.format(params.value)}`
        },
    },
    {
      field: 'gainPercentage',
      renderHeader: (params) => (
        <strong>
          <Typography variant="body2">Gain</Typography>
          <Typography variant="body2">(Return)</Typography>
        </strong>
      ),
      flex:0.5,
      minWidth:60,
      editable: false,
      renderCell: (params) => (
          <Box>
            <Typography variant="body2">
              {numberFormatter.format(params.row.gain)}
            </Typography>
            <Typography variant="body2"
            style={{color:params.value >=  0 ? "#9dc88d" : "#e27d60"}}>
              <b>({params.value.toFixed(2)}%)</b>
            </Typography>
          </Box>
      ),
    },
    ];



    const classes = useStyles()

    const handleRowClick = (param, event) => {
      const holding = param.row
      setSelectedHolding(holding)  
      setActiveCellIndex(holdings.indexOf(holding))
    };
    return(

      <DataGrid 
      disableColumnMenu
        className={classes.datagrid}
        pageSize={10} 
        style={{minHeight:'700px'}}
        autoHeight={true} 
        columns={columns} 
        onRowClick={handleRowClick}
        rows={holdings}
        rowsPerPageOptions={[]}/>
    )
}

export default HoldingsTable