import React, {useState, useEffect} from 'react'
import './charts.css'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";

import { format, parseISO } from "date-fns";
import { Typography, useTheme, useMediaQuery, makeStyles } from '@material-ui/core';
  
const useStyles = makeStyles((theme) =>{
    return({
        areaChart:{

        }
    })
})
const AssetAreaChart = ({asset, records}) =>{
    const theme = useTheme()
    const [interval, setInterval] = useState(365)
    const classes = useStyles()

    const formatToolTipNumber = (payload) =>{
        try{
            let number = payload[0].payload.price
            return formatNumber(number, true)
        }
        catch{
            return ""
        }}

    const formatTooltipDate = (label) =>{ 
        try{
            return format(parseISO(label), "d MMM, yyyy")
        } 
        catch{
            return ""    
        }  
    }

    const formatNumber = (number, isDecimalPoint=false) =>{
        let numberFormatter
        if (isDecimalPoint)
            numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD', maximumFractionDigits:2})
        else if(number > 10000)
        numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD', maximumFractionDigits:0})
        else
            numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD', maximumFractionDigits:2})
        return numberFormatter.format(number)


    }
    useEffect(() =>{
        if (records && records.length)
        {
            let daysDifference = Math.abs(Date.parse(records[records.length-1].date) - Date.parse(records[0].date))
            daysDifference = Math.ceil(daysDifference / (1000 * 60 * 60 * 24)); 
            if (daysDifference > 730)
                setInterval(365)
            else if(daysDifference > 365)
                setInterval(120)
            else if(daysDifference > 100)
                setInterval(30)
        }
    },[records])

    return (
        <ResponsiveContainer width="99%" height={400}>
                <AreaChart data={records} className={classes.areaChart}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.4} />
                        <stop offset="90%" stopColor={theme.palette.primary.main} stopOpacity={0.05} />
                    </linearGradient>
                    </defs>

                    <Area dataKey="price" stroke={theme.palette.primary.main} fill="url(#color)" />

                    <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    interval={interval}
                    tickFormatter={(str) => {
                            const date = parseISO(str);
                            try{
                                return format(date, "MMM yy");
                            }
                            catch(e)
                            {
                            }
                        }}
                    />

                    <YAxis
                    datakey="price"
                    axisLine={false}
                    tickLine={false}
                    // Make width dynamic on screen size
                    width={80}
                    tickCount={8}
                    tickFormatter={(number) => `${formatNumber(number)}`}
                    />

                    <Tooltip content={<CustomTooltip/>}/>

                    <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
    )

        
    function CustomTooltip({ active, payload, label }) {
        if (active) {
          return (
            <div className="tool-tip" style={{background:theme.palette.type === 'light' ? '#fff' : '#424242'}}>
              <Typography variant="body2" style={{color:theme.palette.type === 'light' ? '#424242' : '#fff'}}>{formatTooltipDate(label)}</Typography>
              <Typography variant="body2" style={{color:theme.palette.primary.main}}>{formatToolTipNumber(payload)}</Typography>
            </div>
          );
        }
        return null;
      }
}

export default AssetAreaChart