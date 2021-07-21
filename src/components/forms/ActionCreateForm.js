import React, {useState} from 'react'
import { Select, FormControl, InputLabel, MenuItem, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const ActionCreateForm = ({assets}) =>{
    const [actionType, setActionType] = useState("")
    // const [assetType, setAssetType] = useState("")
    const [asset, setAsset] = useState()
    const [quantity, setQuantity] = useState("0")
    const [sharePrice, setSharePrice] = useState("0")
    const [completedAt, setCompletedAt] = useState()
    const formFields = [
        {field: "select", label:"Action Type", choices:['BUY', 'SELL']},
        {field: "autocomplete", label:"Asset", choices:assets},
        {field: "text", type:"number", label:"Quantity"},
        {field: "text", type:"number", label:"Share Price"},
        {field: "date", label:"Completed at"}
    ]
    const handleQuantityChanged = (event) =>{
        setQuantity(event.target.value)
    }

    const handleSharePriceChanged = (event) =>{
        setSharePrice(event.target.value)
    }

    const handleSubmit = () =>{

    }

    const handleAssetSelectionChanged = (e, values) =>{
        if (values)
            setAsset(values)
    }
 
    
    return (
        <form className="action-form" onSubmit={handleSubmit}>
            <FormControl>
                <InputLabel>Action Type</InputLabel>
                <Select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                >
                    <MenuItem value={"BUY"}>Buy</MenuItem>
                    <MenuItem value={"SELL"}>Sell</MenuItem>
                </Select>
            </FormControl>
            <Autocomplete
                options={assets}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={handleAssetSelectionChanged}
                renderInput={(params) => <TextField {...params} label="Choose Asset" variant="outlined" />}
            />
            <TextField type="number" label="Quantity" value={quantity} title="Quantity" onChange={handleQuantityChanged}/>
            <TextField type="number" label="Share Price" value={sharePrice} title="Share Price" onChange={handleSharePriceChanged}/>
            <TextField
                id="date"
                label="Completed At"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Button type="submit">Add</Button>
        </form>    
    )
}


export default ActionCreateForm