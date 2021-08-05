import { requirePropFactory, Typography, useTheme } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {  PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';


const RADIAN = Math.PI / 180;
const LIGHTCOLORS = ['#AF7AC5','#9B59B6','#884EA0','#BB8FCE','#A569BD','#8E44AD','#7D3C98','#6C3483','#5B2C6F','#4A235A']
const DARKCOLORS = ['#0E6251','#117864','#148F77','#17A589','#1ABC9C','#48C9B0','#76D7C4','#A3E4D7','#D0ECE7','#A3E4D7','#E8F8F5']


const HoldingsPieChart = ({portfolio, isSingle, width, height, innerRadius, outerRadius, selectedHolding, setSelectedHolding, activeCellIndex, setActiveCellIndex}) =>{
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

    const renderActiveShape = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
          fill, payload, percent, value } = props;
      
        return (
          <g>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius+10}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
          </g>
        );
      };

    const onCellEnter = (data, index) =>{
        console.log(index, holdings)
        setActiveCellIndex(index)
        const holding = data.payload.payload
        setSelectedHolding(holding)
      }
    return (
        <React.Fragment>
            {holdings && holdings.length &&
        <PieChart width={width} height={height}>
            {!isSingle && selectedHolding &&
                <text x={width /2} y={height /2 -10} fill={theme.palette.primary.main} textAnchor="middle" dominantBaseline="central">
                        {`${selectedHolding.asset.symbol}\n`}<br/>
                </text>
            }
            {!isSingle && selectedHolding &&
                <text  style={{fill:theme.palette.primary.main, fontWeight:'bold'}} x={width/2} y={height/2 + 20} textAnchor="middle" dominantBaseline="middle">
                    {(selectedHolding.percentage * 100).toFixed(2)}%
                </text>
            }
            {!isSingle && selectedHolding &&
                <text  style={{fill:theme.palette.primary.main, fontWeight:'bold'}} x={width/2} y={height/2 + 35} textAnchor="middle" dominantBaseline="middle">
                    {(selectedHolding.total_value).toFixed(2)}$
                </text>
            }
            <Pie
                data={[...holdings]}
                cx={'50%'}
                cy={'50%'}
                // labelLine={false}
                // label
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                activeShape={!isSingle && renderActiveShape} 
                activeIndex={!isSingle && activeCellIndex}
                onMouseEnter={!isSingle && onCellEnter}
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


