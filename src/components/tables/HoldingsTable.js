import React,{useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/core'

const useStyles =  makeStyles((theme) => ({
  datagrid:{
    color: theme.palette.text.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: 11,
      fontWeight:'bold',
    },
    [theme.breakpoints.up('xs')]: {
      fontSize: 14,
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
        field: 'asset.symbol',
        headerName: 'Ticker',
        editable: false,
        valueFormatter: (params) => {
          return `${params.row.asset.symbol}`
        },
    },
    {
        field: 'asset.name',
        headerName: 'Name',
        editable: false,
        valueFormatter: (params) => {
          return `${params.row.asset.name}`
        },
    },
    {
      field: 'cost_basis',
      headerName: 'Cost Basis',
      editable: false,
      valueFormatter: (params) => {
          return `${numberFormatter.format(params.value)}`
        },
    },
    {
        field: 'asset.last_price',
        headerName: 'Price',
        editable: false,
        valueFormatter: (params) => {
            return `${numberFormatter.format(params.row.asset.last_price)}`
          },
    },
    {
      field: 'total_cost',
      headerName: 'Cost',
      editable: false,
      valueFormatter: (params) => {
          return `${numberFormatter.format(params.value)}`
        },
    },
    {
      field: 'total_value',
      headerName: 'Value',
      editable: false,
      valueFormatter: (params) => {
          return `${numberFormatter.format(params.value)}`
        },
    },
    {
      field: 'gainPercentage',
      headerName: '% Gain',
      editable: false,
      valueFormatter: (params) => {
          return `${params.value.toFixed(3)}%`
        },
    },
    {
      field: 'percentage',
      headerName: '% of Portfolio',
      editable: false,
      valueFormatter: (params) => {
          return `${(params.value * 100).toFixed(0)}%`
        },
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