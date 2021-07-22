import React, {useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Paper, Button } from '@material-ui/core';
import { makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
// import {actions} from './testing'

const useStyles = makeStyles({
    root: {
        height: "auto",
    },
    flexRow:{
        display:"flex",
        "flex-direction":"row",
    },
  });


  

const ActionsDataGrid = ({assets, rows, setRows}) =>{
    // const [rows, setRows] = useState(actions)
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
        field: 'assetId',
        headerName: 'Id',
        type: 'number',
        hide:true,
        sortable: false,
        minWidth: 50,
        // valueGetter: getAssetId,
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
        description: 'This column has a value getter and is not sortable.', 
        width: 100,
    },
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
                assetId: newSymbol.id,
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
        // setRows(rows)
        const rowIndex = rows.findIndex(row => row.id == id)
        rows[rowIndex][field] = props.value;
        setRows(rows)
    }
    

    const classes = useStyles()
    return(
        <Paper className={classes.root} elevation={10} style={{padding: 20}}>
            <div className={classes.flexRow}>
                <h1>Data grid</h1>
                <Button>Edit</Button>
                <form onSubmit={handleFormSubmit}>
                    <Autocomplete
                    options={assets}
                    getOptionLabel={(option) => option.name}
                    onChange={handleAssetSelectionChanged}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Choose Asset" variant="outlined" />}
                    />
                    <Button type="submit">Add symbol</Button>
                </form>
            </div>
            <DataGrid disableColumnMenu 
            onEditCellChange={handleEditCellChange}
            pageSize={rows.length} 
            autoHeight={true} 
            columns={columns} 
            rows={rows}
            rowsPerPageOptions={[]}/>
        </Paper>
    )
}

export default ActionsDataGrid