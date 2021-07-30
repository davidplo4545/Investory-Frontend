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
  
const AssetAreaChart = ({asset, records}) =>{
    const [interval, setInterval] = useState(365)
    const formatNumber = (number) =>{
        if (number === 0)
            return number.toFixed(0)
        if (number < 1)
            return number.toFixed(4)
        if (number > 10)
            return number.toFixed(2)
        return number.toFixed(3)
        }
    
    const formatToolTipNumber = (payload) =>{
        try{
            let number = payload[0].payload.price
            return formatNumber(number)
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

    useEffect(() =>{
        if (records && records.length)
        {
            let daysDifference = Math.abs(Date.parse(records[records.length-1].date) - Date.parse(records[0].date))
            daysDifference = Math.ceil(daysDifference / (1000 * 60 * 60 * 24)); 
            if (daysDifference > 730)
                setInterval(365)
            else if(daysDifference > 365)
                setInterval(70)
            else if(daysDifference > 100)
                setInterval(30)
        }
    },[records])
  
    return (
        <ResponsiveContainer width="99%" height={400}>
                <AreaChart data={records}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9dc88d" stopOpacity={0.4} />
                        <stop offset="90%" stopColor="#9dc88d" stopOpacity={0.05} />
                    </linearGradient>
                    </defs>

                    <Area dataKey="price" stroke="#9dc88d" fill="url(#color)" />

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
                    tickFormatter={(number) => `$${formatNumber(number)}`}
                    />

                    <Tooltip content={<CustomTooltip/>}/>

                    <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
    )

        
    function CustomTooltip({ active, payload, label }) {
        if (active) {
          return (
            <div className="tool-tip">
              <p>{formatTooltipDate(label)}</p>
              <p>${formatToolTipNumber(payload)}</p>
            </div>
          );
        }
        return null;
      }
}

export default AssetAreaChart