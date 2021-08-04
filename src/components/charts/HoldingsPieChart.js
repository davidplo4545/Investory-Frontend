import { requirePropFactory, useTheme } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {  PieChart, Pie, Cell, Tooltip } from 'recharts';


const RADIAN = Math.PI / 180;
const LIGHTCOLORS = ['#AF7AC5','#9B59B6','#884EA0','#BB8FCE','#A569BD','#8E44AD','#7D3C98','#6C3483','#5B2C6F','#4A235A']
const DARKCOLORS = ['#0E6251','#117864','#148F77','#17A589','#1ABC9C','#48C9B0','#76D7C4','#A3E4D7','#D0ECE7','#A3E4D7','#E8F8F5']


const HoldingsPieChart = ({portfolio, isSingle, width, height, innerRadius, outerRadius, cx, cy}) =>{
    const theme = useTheme()
    const [holdings, setHoldings] = useState([])
    const [colors, setColors] = useState([])
    
    useEffect(() =>{
        const tempColors = []
        for (var i=0; i < 10; i++) 
            tempColors.push(getRandomColor())
        setColors(tempColors)
        setHoldings(portfolio.holdings)
    },[portfolio])
    const getRandomColor = () => {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
        }
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx +  radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <React.Fragment>
                {!isSingle &&
                <text x={x} y={y} fill={theme.palette.primary.dark} fontSize="10" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${holdings[index].asset.symbol} ${(percent * 100).toFixed(0)}%`}
                    </text>
                }
            </React.Fragment>
        );
    };
    return (
        <React.Fragment>
            {holdings && holdings.length &&
        <PieChart width={width} height={height}>
            {isSingle &&
            <React.Fragment>
                <text fontSize="14" style={{fill:theme.palette.primary.main}} x={width/2} y={height/2 -10} textAnchor="middle" dominantBaseline="middle">
                    {portfolio.name}
                </text>
                <text fontSize="12" style={{fill:theme.palette.primary.main}} x={width/2} y={height/2 + 10} textAnchor="middle" dominantBaseline="middle">
                    {Object.keys(portfolio).length > 0 &&
                        portfolio.total_value.toFixed(2) + '$'
                    }
                </text>
            </React.Fragment>
                }
            <Pie
                data={[...holdings]}
                cx={'50%'}
                cy={'50%'}
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#8884d8"
                dataKey="percentage"
            >
                {
                    holdings.map((entry, index) => <Cell key={`cell-${index}`} 
                    fill={theme.palette.type === "light" ? 
                    LIGHTCOLORS[index % LIGHTCOLORS.length] :
                    DARKCOLORS[index % DARKCOLORS.length] } />)
                }
                <Tooltip/>
            </Pie>
        </PieChart>
        }
        </React.Fragment>
    );
	}
export default HoldingsPieChart;


