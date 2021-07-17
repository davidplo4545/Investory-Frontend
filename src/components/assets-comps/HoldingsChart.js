import React, {useState, useEffect} from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;


const HoldingChart = ({portfolio}) =>{
    const holdings = portfolio.holdings
    const totalValue = portfolio.total_value
    const [data, setData] = useState([])
    useEffect(() =>{
        const holdingsPercentages = []
        holdings.forEach(holding => holdingsPercentages.push({value: holding.total_value / totalValue}))
        setData(holdingsPercentages)
    },[])

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx +  radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${data[index].asset} ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={220}
                cy={100}
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
                <Tooltip/>
            </Pie>
        </PieChart>
    );
	}
export default HoldingChart;


