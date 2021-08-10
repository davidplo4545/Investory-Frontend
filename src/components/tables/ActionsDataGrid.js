import React, {useState} from 'react'
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { Paper, Button, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
  
const CustomLoadingOverlay = () => {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }

const useStyles = makeStyles((theme) =>{
    return({
        root:{
            '& .MuiDataGrid-main': {
                color: theme.palette.common.black
              },
        },
        flexRow:{
            display:'flex',
            width: '100%',
            justifyContent:'space-between',
            flexDirection:'row',
        },
        datagrid:{
          '& .MuiDataGrid-cell , .MuiDataGrid-columnHeaderTitle':{
            color: theme.palette.text.primary,
          },
        }
    })
})


const ActionsDataGrid = ({ rows, setRows, isLoading, setIsActionsChanged}) =>{

  const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD'})

  const columns = [    
  {
      field: 'type',
      headerName: 'Type',
      type: 'singleSelect',
      minWidth: 100,
      flex:0.1,
      sortable: false,
      valueOptions: [
          'BUY',
          'SELL',
      ],
      editable: true,
      },
      
  {
      field: 'asset',
      headerName: 'Id',
      type: 'number',
      hide:true,
      sortable: false,
      minWidth: 50,
      editable: false,
  },
  {
      field: 'name',
      headerName: 'Name',
      flex:0.25,
      sortable: false,
      minWidth: 150,
  },
  {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      flex:0.1,
      minWidth: 100,
      sortable: false,
      editable: true,
  },
  {
      field: 'share_price',
      headerName: 'Share Price',
      type: "number",
      flex:0.15,
      sortable: false,
      minWidth: 135,
      editable: true,
      valueFormatter: (params) => {
        return `${numberFormatter.format(params.value)}`
      },
  },
  {
      field: 'completed_at',
      headerName: 'Date',
      flex:0.15,
      type: 'date',
      editable:true,
      valueFormatter: (params) => {
          const date = new Date(params.value);
          let day = date.getDate()
          day = day < 10 ? `0${day}` : day
          let month = date.getMonth() + 1
          month = month < 10 ? `0${month}` : month
          let year = date.getFullYear()
          const valueFormatted = [day,month ,year].join('/')
          return valueFormatted
        },

      description: 'This column has a value getter and is not sortable.', 
      minWidth: 150,
  },
  {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      flex:0.2,
      minWidth: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
          >
            DELETE
          </Button>
        </div>
      ),
    }
  ];


  const handleEditCellChange = ({id, field, props}) =>{
      const rowIndex = rows.findIndex(row => row.id === id)
      if (field === 'completed_at')
      {
          let date = typeof(props.value) === 'object' ? props.value.toISOString().split('T')[0] : props.value
          rows[rowIndex][field] = date;
      }
      else
          rows[rowIndex][field] = props.value;

      setRows(rows)
      setIsActionsChanged(true)
  }
  
  const handleCellClicked = (params) =>{

      if (params.field === "delete")
      {
          const newRows = rows.filter((row) => row.id !== params.id)
          setRows(newRows)
          setIsActionsChanged(true)
      }
      return
  }

  const classes = useStyles()
  return(
      <Paper className={classes.root} elevation={10} style={{padding: 20}}>
          
          <DataGrid disableColumnMenu 
          className={classes.datagrid}
          onEditCellChange={handleEditCellChange}
          pageSize={12}
          autoHeight={true} 
          columns={columns} 
          components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
          loading={isLoading}
          onCellClick={handleCellClicked}
          rows={rows}
          rowsPerPageOptions={[]}/>
      </Paper>
  )
}

export default ActionsDataGrid