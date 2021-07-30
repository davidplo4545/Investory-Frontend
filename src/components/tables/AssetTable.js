import React,{useState} from 'react'
import MaterialTable  from 'material-table';
import {useHistory} from 'react-router-dom'
import { Paper, Button, Grid, Box } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';



const AssetTable = ({assetType, assets}) =>{
    let history = useHistory();
    const [selectedRow] = useState(null);
    console.log(assets)
    const handleRowClicked = (rowData) =>{
        const id = rowData.id
        history.push({
            pathname:`/asset/${id}`,
           });
    }

    const columns = [    
        {
            field: 'symbol',
            headerName: 'Ticker',
            minWidth: 40,
            flex:0.15,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 50,
            flex: 0.2,
            editable: false,
        },
        {
            field: 'last_price',
            headerName: 'Price',
            // type: 'number',
            minWidth: 30,
            flex: 0.1,
            editable: false,
            valueFormatter: (params) => {
                return `${params.value.toFixed(3)}$`
              },
        },
        {
            field: 'view',
            headerName: 'View',
            editable: false,
            minWidth: 40,
            flex: 0.1,
            disableClickEventBubbling: true,
            renderCell: (params) => (
              <div>
                {/* {params.value.getFullYear()} */}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                //   startIcon={<DeleteIcon />}
                >
                  VIEW
                </Button>
              </div>
            ),
          }
        ];

    return(
        <Paper elevation={11} style={{width:'100%', padding:'20px', background:'transparent'}}>
            <Grid container style={{width: '100%'}}>
            <Grid item xl={8}>
                <h1>Search your asset here:</h1>
                <DataGrid  style={{color:'white'}}
                    // onEditCellChange={handleEditCellChange}
                    pageSize={10} 
                    autoHeight={true} 
                    columns={columns} 
                    // onCellClick={handleCellClicked}
                    rows={assets}
                    rowsPerPageOptions={[]}/>
            </Grid>
            <Grid item xl={4}>
                <Box style={{background:'transparent', height: '100%'}}>
                <h1>Recently viewed</h1>
                </Box>
            </Grid>
        </Grid>
        </Paper>
    )
}

export default AssetTable