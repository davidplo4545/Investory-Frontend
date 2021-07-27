import React, {useEffect, useState} from 'react'
import { LineChart, ResponsiveContainer, CartesianGrid, Tooltip, Legend, YAxis, XAxis, Line } from 'recharts';
import { format, parseISO } from "date-fns";
import { Forward5 } from '@material-ui/icons';
const CompareLineChart = ({portfolio, comparedAssetPortfolio}) =>{
    const [data, setData] = useState(null)
    useEffect(() =>{
      const portfolioRecords = portfolio.records
      const assetPortfolioRecords = comparedAssetPortfolio.records
      const tempData = []
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
                    tickLine={false} />
            <YAxis  axisLine={false}
                    tickLine={false}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend />
          <Line type="monotone" dataKey="price1" stroke="#8884d8" dot={false}/>
          <Line type="monotone" dataKey="price2" stroke="#82ca9d" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    )

    function CustomTooltip({ active, payload, label }) {
      if (active) {
        return (
          <div className="tool-tip">
            <p>{formatTooltipDate(label)}</p>
            <p>${formatToolTipNumber(payload, "price1")}</p>
            <p>${formatToolTipNumber(payload, "price2")}</p>
          </div>
        );
      }
      return null;
    }
}

export default CompareLineChart;