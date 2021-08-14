import React, {useEffect, useState} from 'react'
import { LineChart, ResponsiveContainer, CartesianGrid, Tooltip, Legend, YAxis, XAxis, Line } from 'recharts';
import { Typography } from '@material-ui/core';
import { format, parseISO } from "date-fns";
import { useTheme } from '@material-ui/core';
const CompareLineChart = ({portfolio, comparedAssetPortfolio}) =>{
  const [data, setData] = useState(null)
  const [interval, setInterval] = useState(365)
  const theme = useTheme()
  const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD'})
  const numberFormatter1 = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD', maximumFractionDigits:0})

  useEffect(() =>{
    const portfolioRecords = portfolio.records
    const assetPortfolioRecords = comparedAssetPortfolio.records
    const tempData = []
    if (portfolioRecords && portfolioRecords.length)
    {
        let daysDifference = Math.abs(Date.parse(portfolioRecords[portfolioRecords.length-1].date) - Date.parse(portfolioRecords[0].date))
        daysDifference = Math.ceil(daysDifference / (1000 * 60 * 60 * 24)); 
        if (daysDifference > 730)
            setInterval(365)
        else if(daysDifference > 365)
            setInterval(70)
        else if(daysDifference > 100)
            setInterval(30)
    }
    for(let i=0; i<Math.min(portfolio.records.length, assetPortfolioRecords.length); i++){
      try{
        tempData.push({
          date:portfolioRecords[i].date,
          Portfolio: portfolioRecords[i].price,
          Asset: assetPortfolioRecords[i].price
        })
      }
      catch(e){
        console.log(e)
      }
    }
    setData(tempData)
  },[portfolio, comparedAssetPortfolio])

  const formatToolTipNumber = (payload, type) =>{
    try{
        let number = payload[0].payload[type]
        return numberFormatter.format(number)
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


  return(
  <ResponsiveContainer width="99%" height="99%">
      <LineChart
        data={data}
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <CartesianGrid opacity={0.1} vertical={false} />
          <XAxis dataKey="date"
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
        <YAxis  axisLine={false} 
                tickLine={false}
                tickFormatter={(number) => `${numberFormatter1.format(number)}`}
                            />
        <Tooltip content={<CustomTooltip/>}/>
        <Legend />
        <Line isAnimationActive={true}
        type="monotone" 
        dataKey="Portfolio"
        stroke="#8884d8"
        dot={false}/>
        <Line isAnimationActive={true}
        type="monotone" 
        dataKey="Asset" 
        stroke="#82ca9d" 
        dot={false}/>
      </LineChart>
    </ResponsiveContainer>
  )

  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="tool-tip" style={{background:theme.palette.type === 'light' ? '#fff' : '#424242'}}>
          <Typography variant="body2" style={{color:theme.palette.type === 'light' ? '#424242' : '#fff'}}>{formatTooltipDate(label)}</Typography>
          <Typography variant="body2" style={{color:"#8884d8"}}>Portfolio: {formatToolTipNumber(payload, "Portfolio")}</Typography>
          <Typography variant="body2" style={{color:"#82ca9d"}}>Asset: {formatToolTipNumber(payload, "Asset")}</Typography>
        </div>
      );
    }
    return null;
  }
}

export default CompareLineChart;