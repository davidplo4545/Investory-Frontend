import React, {useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import DeleteIcon from "@material-ui/icons/Delete";
import { parseISO } from 'date-fns';
// import {actions} from './testing'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
  
const useStyles = makeStyles((theme) =>{
    return({
        root:{
            height:'auto',
            '& .MuiDataGrid-main': {
                color: theme.palette.common.black
              }
        },
        flexRow:{
            display:'flex',
            flexDirection:'row',
        }
    })
})

const ActionsDataGrid = ({isEdit, assets, rows, setRows}) =>{
    const columns = [    
    {
        field: 'type',
        headerName: 'Type',
        type: 'singleSelect',
        width: 100,
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
        sortable: false,
        minWidth: 150,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number',
        width: 100,
        sortable: false,
        editable: true,
    },
    {
        field: 'share_price',
        headerName: 'Share Price',
        type: "number",
        sortable: false,
        width: 135,
        editable: true,
    },
    {
        field: 'completed_at',
        headerName: 'Date',
        type: 'date',
        editable:true,
        // renderCell: (params) =>{
        //     // const [selectedDate, setSelectedDate] = useState(new Date(params.row.completed_at));
        //     const handleDateChange = (date) =>{
        //         console.log(date)
        //         console.log(params)
        //         const rowIndex = rows.findIndex(row => row.id === params.row.id)
        //         rows[rowIndex].completed_at = date
        //         setRows(rows)
        //         // // console.log('changed')
        //         // console.log(rows[rowIndex])
        //     }

        //     return (
        //     <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //         <KeyboardDatePicker
        //         disableToolbar
        //         // shouldDisableDate={disableDates}
        //         // variant="inline"
        //         format="dd/MM/yyyy"
        //         margin="normal"
        //         disableFuture={true}
        //         value={params.value}
        //         onChange={(date) => handleDateChange(date)}
        //         KeyboardButtonProps={{
        //         'aria-label': 'change date',
        //         }}
        //         />
        //     </MuiPickersUtilsProvider>
        // )},
        valueGetter: (params) => {
            const valueFormatted = new Date(params.value).toISOString().slice(0, 10);
            console.log(`new DAte${valueFormatted}`)
            return valueFormatted
          },
        description: 'This column has a value getter and is not sortable.', 
        width: 150,
    },
    {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        width: 140,
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

    const [newSymbol, setNewSymbol] = useState(null)
    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }
    const handleAssetSelectionChanged = (e, values) =>{
        if(values)
            setNewSymbol(values)
    }
    const handleFormSubmit = (e) =>{
        e.preventDefault()
        if (newSymbol)
        {
            const newAction = { 
                id: generateKey(newSymbol.name),
                asset: newSymbol.id,
                type:"BUY", 
                name:newSymbol.name, 
                quantity: 0, 
                share_price: 0, 
                completed_at: new Date() }
                setRows([
                    newAction,
                    ...rows
                    ])
        }
    }

    const handleEditCellChange = ({id, field, props}) =>{
        const rowIndex = rows.findIndex(row => row.id === id)
        rows[rowIndex][field] = props.value;
        setRows(rows)
    }
    
    const handleCellClicked = (params) =>{

        if (params.field === "delete")
        {
            const newRows = rows.filter((row) => row.id !== params.id)
            setRows(newRows)
        }
        return
    }
    const classes = useStyles()
    return(
        <Paper className={classes.root} elevation={10} style={{padding: 20}}>
            <div className={classes.flexRow}>
                <Typography variant="h4" color="primary">Data grid</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Autocomplete
                    options={assets}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => option.id === value.id}
                    onChange={handleAssetSelectionChanged}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Choose Asset" variant="outlined" />}
                    />
                    <Button variant="contained" color="primary" type="submit">Add symbol</Button>
                </form>
            </div>
            <DataGrid disableColumnMenu 
            onEditCellChange={handleEditCellChange}
            pageSize={rows.length < 100 ? rows.length : 100} 
            autoHeight={true} 
            columns={columns} 
            onCellClick={handleCellClicked}
            rows={rows}
            rowsPerPageOptions={[]}/>
        </Paper>
    )
}

export default ActionsDataGrid