import React, {useState, useEffect} from 'react';
import {  PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', 'black', '#FF8042'];

const RADIAN = Math.PI / 180;


const HoldingsPieChart = ({portfolio,width, height, innerRadius, outerRadius, cx, cy}) =>{
    const [holdingsTitle, setHoldingsTitle] = useState("")
    const [holdings, setHoldings] = useState([])
    useEffect(() =>{
        console.log(portfolio)
        setHoldings(portfolio.holdings)
        setHoldingsTitle(`${portfolio.name} \n ${portfolio.total_value}`)
    },[portfolio])

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx +  radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill="black" fontSize="10" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${holdings[index].asset.symbol} ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <React.Fragment>
            {holdings && holdings.length &&
        <PieChart width={width} height={height}>
                <text fontSize="14" style={{fill:'white'}} x={width/2} y={height/2 -10} textAnchor="middle" dominantBaseline="middle">
                    {portfolio.name}
                </text>
                <text fontSize="12" style={{fill:'white'}} x={width/2} y={height/2 + 10} textAnchor="middle" dominantBaseline="middle">
                    {Object.keys(portfolio).length > 0 &&
                        portfolio.total_value.toFixed(2) + '$'
                    }
                </text>
            <Pie
            animationDuration={3000}
                data={[...holdings]}
                cx={cx}
                cy={cy}
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#8884d8"
                dataKey="percentage"
            >
                {
                    holdings.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
                <Tooltip/>
            </Pie>
        </PieChart>
        }
        </React.Fragment>
    );
	}
export default HoldingsPieChart;


