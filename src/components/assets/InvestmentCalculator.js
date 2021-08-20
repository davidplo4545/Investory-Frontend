import React, {useState} from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Box } from '@material-ui/core';


const InvestmentCalculator = ({records}) =>{
    const [selectedDate, setSelectedDate] = useState(Date.parse(records[0].date));
    const [amount, setAmount] = useState(0)
    const [result, setResult] = useState(0)
    const [priceAtStartDate, setPriceAtStartDate] = useState(0)
    const [returnRate, setReturnRate] = useState(0)
    const handleDateChange = (date) => {
    setSelectedDate(date);
    };
    const disableDates = (date) =>{
        const firstRecordDate = Date.parse(records[0].date)
        return date < firstRecordDate
    }

    const handleAmountChange = (e) =>{
        if(parseInt(e.target.value) < 0)
        {
            setAmount(0)
        }
        // console.log(e.target.value)
        setAmount(e.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        let i =0
        while (selectedDate > Date.parse(records[i].date) && i < records.length - 1)
        {
            i++;
        }
        const startPrice = i > 0 ? records[i-1].price :records[i].price
        const lastPrice = records[records.length - 1].price
        setPriceAtStartDate(startPrice)
        setResult(lastPrice / startPrice * amount)
        setReturnRate((lastPrice / startPrice -1)* 100)
    }

    const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD', maximumFractionDigits:2})
    return(
        <React.Fragment>
            <Typography variant="h5" style={{borderBottom:'1px solid gray', paddingBottom:'0.5rem'}}>Investment Calculator</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={handleSubmit}>
                    <KeyboardDatePicker
                        disableToolbar
                        shouldDisableDate={disableDates}
                        // variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        style={{color:'red !imporant'}}
                        label="Date:"
                        disableFuture={true}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <TextField 
                        value={amount}
                        type="number" 
                        id="standard-basic" 
                        label="Value $"
                        onChange={handleAmountChange}
                        InputProps={{ inputProps: { min: 0, max:1000 } }}/>
                    {result !== 0 &&
                        <Box style={{marginTop:'1rem', marginBottom:'0.5rem'}}>
                            <Typography variant="body2">Price per share at start: {numberFormatter.format(priceAtStartDate)}</Typography>
                            <Typography  variant="body2">Investment value today: {numberFormatter.format(result)}</Typography>
                            <Typography  variant="body2">Rate of return: {returnRate.toFixed(0)}%</Typography>
                        </Box>
                    }
                    <Button color='primary' 
                    variant="contained"
                     type="submit" 
                     value="Submit"
                     style={{marginTop:'1rem'}}>Calculate</Button>
                </form>
            </MuiPickersUtilsProvider>
        </React.Fragment>
    )
}

export default InvestmentCalculator