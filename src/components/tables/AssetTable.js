import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Paper, Button, Grid, Box, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import PageviewIcon from '@material-ui/icons/Pageview';
import { CropLandscapeSharp } from '@material-ui/icons';


const useStyles =  makeStyles((theme) => ({
  paper: {
    background:'transparent',
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      padding:"10px",
    },
    [theme.breakpoints.up('md')]: {
      padding:"15px",
    },
    [theme.breakpoints.up('lg')]: {
      padding:"20px",
    },
  },
  grid:{
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    },
    [theme.breakpoints.up('md')]: {
      flexDirection:'column'

    },
    [theme.breakpoints.up('lg')]: {
      flexDirection:'row',
      justifyContent:'space-between',
      width: "100%",

      // padding:"20px",
    },
  },
  datagrid:{
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
              color="primary"
              size="small"
              startIcon={<PageviewIcon />}
            >
              <p className={classes.datagrid}>VIEW</p>
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
        // minWidth: 50,
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
      <Paper elevation={6} className={classes.paper}>
          <Grid container className={classes.grid}>
            <Grid item xl={9} style={{width: '100%', flex:1}}>
                <p>Search your asset here:</p>
                <DataGrid 
                  className={classes.datagrid}
                    pageSize={10} 
                    autoHeight={true} 
                    columns={columns} 
                    onCellClick={handleCellClicked}
                    rows={assets}
                    rowsPerPageOptions={[]}/>
            </Grid>
            <Grid item xl={4}>
                <Box style={{background:'transparent', height: '100%'}}>
                <p>Recently viewed</p>
                </Box>
            </Grid>
      </Grid>
      </Paper>
  )
}

export default AssetTable