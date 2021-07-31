import React, {useState} from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

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

    return(
        <React.Fragment>
            <h4>Investment Calculator</h4>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form className="investment-calculator-form" onSubmit={handleSubmit}>
                    <KeyboardDatePicker
                        disableToolbar
                        shouldDisableDate={disableDates}
                        // variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
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
                        InputProps={{ inputProps: { min: 0, max:100 } }}/>
                    {result !== 0 &&
                        <React.Fragment>
                            <p>Price per share at start: {priceAtStartDate.toFixed(3)}$</p>
                            <p>Investment value today: {result.toFixed(3)}$</p>
                            <p>Rate of return: {returnRate.toFixed(0)}%</p>
                        </React.Fragment>
                    }
                    <Button color='default' type="submit" value="Submit">Submit</Button>
                </form>
            </MuiPickersUtilsProvider>
        </React.Fragment>
    )
}

export default InvestmentCalculator