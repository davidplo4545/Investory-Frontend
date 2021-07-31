import React, {useEffect, useState} from 'react'
import { LineChart, ResponsiveContainer, CartesianGrid, Tooltip, Legend, YAxis, XAxis, Line } from 'recharts';
import { format, parseISO } from "date-fns";
const CompareLineChart = ({portfolio, comparedAssetPortfolio}) =>{
  const [data, setData] = useState(null)
  const [interval, setInterval] = useState(365)
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
      for(let i=0; i<portfolio.records.length; i++){
        tempData.push({
          date:portfolioRecords[i].date,
          price1: portfolioRecords[i].price,
          price2: assetPortfolioRecords[i].price
        })
      }
      setData(tempData)
    },[portfolio, comparedAssetPortfolio])
    const formatNumber = (number) =>{
      if (number === 0)
          return number.toFixed(0)
      if (number < 1)
          return number.toFixed(4)
      if (number > 10)
          return number.toFixed(2)
      return number.toFixed(3)
      }
    const formatToolTipNumber = (payload, type) =>{
      try{
          let number = payload[0].payload[type]
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
    return(
    <ResponsiveContainer width="100%" height="100%">
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
                    tickLine={false}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend />
          <Line isAnimationActive={true} type="monotone" dataKey="price1" stroke="#8884d8" dot={false}/>
          <Line isAnimationActive={true} type="monotone" dataKey="price2" stroke="#82ca9d" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    )

    function CustomTooltip({ active, payload, label }) {
      if (active) {
        return (
          <div className="tool-tip">
            <p>{formatTooltipDate(label)}</p>
            <p>Price1: ${formatToolTipNumber(payload, "price1")}</p>
            <p>Price2: ${formatToolTipNumber(payload, "price2")}</p>
          </div>
        );
      }
      return null;
    }
}

export default CompareLineChart;