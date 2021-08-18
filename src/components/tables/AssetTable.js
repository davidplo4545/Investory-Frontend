import React from 'react'
import {useHistory} from 'react-router-dom'
import {  Button,   makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import PageviewIcon from '@material-ui/icons/Pageview';


const useStyles =  makeStyles((theme) => ({
  datagrid:{
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      fontSize: 11,
      fontWeight:'bold',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    },
  }
}));

const AssetTable = ({assets}) =>{
  let history = useHistory();
  const classes = useStyles()

  const columns = [   
    {
      field: 'asset',
      headerName: 'Id',
      type: 'number',
      hide:true,
      editable: false,
    }, 
    {
        field: 'view',
        headerName: 'View',
        editable: false,
        minWidth: 90,
        flex: 0.3,
        disableClickEventBubbling: true,
        renderCell: (params) => (
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              endIcon={<PageviewIcon />}
            >
              <p className={classes.datagrid} style={{color:'#424242'}}>VIEW</p>
            </Button>
          </div>
        ),
      },
    {
        field: 'symbol',
        headerName: 'Ticker',
        minWidth: 100,
        flex:0.3,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 0.4,
        editable: false,
    },
    {
        field: 'last_price',
        headerName: 'Price',
        minWidth: 90,
        flex: 0.3,
        editable: false,
        valueFormatter: (params) => {
            return `${params.value.toFixed(3)}$`
          },
    }
    ];

  const handleCellClicked = (params) =>{
    // Redirect to the clicked on asset page
    if (params.field === "view")
    {
      history.push({
        pathname:`/asset/${params.id}`,
        });
    }
    return
  }
  return(
          <DataGrid 
            className={classes.datagrid}
              pageSize={15} 
              autoHeight={true} 
              columns={columns} 
              onCellClick={handleCellClicked}
              rows={assets}
              rowsPerPageOptions={[]}/>
            
  )
}

export default AssetTable