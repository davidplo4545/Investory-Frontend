import {  useTheme } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {  PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import { formatNumber } from '../base/helpers';

// const RADIAN = Math.PI / 180;
const LIGHTCOLORS = ['#AF7AC5','#9B59B6','#884EA0','#BB8FCE','#A569BD','#8E44AD','#7D3C98','#6C3483','#5B2C6F','#4A235A']
const DARKCOLORS = ['#0E6251','#117864','#148F77','#17A589','#1ABC9C','#48C9B0','#76D7C4','#A3E4D7','#D0ECE7','#A3E4D7','#E8F8F5']

const HoldingsPieChart = ({portfolio, isSingle, width, height, innerRadius, outerRadius, selectedHolding, setSelectedHolding, activeCellIndex, setActiveCellIndex, isAnimation=true}) =>{
    const theme = useTheme()
    const [holdings, setHoldings] = useState([])

    useEffect(() =>{
        setHoldings(portfolio.holdings)
    },[portfolio])

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
          fill } = props;
      
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
        setActiveCellIndex(index)
        const holding = data.payload.payload
        setSelectedHolding(holding)
      }

    const onCellLeave = () =>{
        setActiveCellIndex(null)
        setSelectedHolding(null)
    }
    return (
        <React.Fragment>
        {holdings && holdings.length &&
        <PieChart width={width} height={height}>
            {!isSingle && selectedHolding &&
                <text x={width /2} y={height /2 -30} 
                style={{fontWeight:'bold'}}
                fill={theme.palette.text.secondary}
                fontSize={selectedHolding.asset.name.length > 32 ? 10 : 14}
                textAnchor="middle" 
                dominantBaseline="central">
                        {`${selectedHolding.asset.name}\n`}<br/>
                </text>
            }
            {!isSingle && selectedHolding &&
                <text  style={{fontWeight:'bold'}} x={width/2} y={height/2}
                 textAnchor="middle" 
                 dominantBaseline="middle"
                 fill={theme.palette.text.secondary}>
                    {(selectedHolding.percentage).toFixed(2)}%
                </text>
            }
            {!isSingle && selectedHolding &&
                <text  style={{fontWeight:'bold'}} 
                    x={width/2} 
                    y={height/2 + 20} 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fill={theme.palette.text.secondary}>
                    {formatNumber(selectedHolding.total_value, selectedHolding.asset.currency)}
                </text>
            }
            {!isSingle && selectedHolding &&
                <text  style={{fontWeight:'bold'}} 
                    x={width/2 -3} 
                    y={height/2 + 40} 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fill={selectedHolding.gain > 0 ? '#9dc88d' : '#e27d60'}>
                    {selectedHolding.gain > 0 && '+'}{`${formatNumber(selectedHolding.gain,  selectedHolding.asset.currency)}`}
                </text>
            }

            {!isSingle && !selectedHolding &&
                <text x={width /2} y={height /2 -30} 
                style={{fontWeight:'bold'}}
                fill={theme.palette.text.secondary}
                textAnchor="middle" 
                dominantBaseline="central">
                        {`${portfolio.name}\n`}<br/>
                </text>
            }

            {!isSingle && !selectedHolding &&
                <text  style={{fontWeight:'bold'}} x={width/2} y={height/2}
                 textAnchor="middle" 
                 dominantBaseline="middle"
                 fill={theme.palette.text.secondary}>
                    {formatNumber(portfolio.total_value)}
                </text>
            }

            {!isSingle && !selectedHolding &&
                <text  style={{fontWeight:'bold'}} 
                    x={width/2 -3} 
                    fontSize={14}
                    y={height/2 + 25} 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fill={portfolio.gain > 0 ? '#9dc88d' : '#e27d60'}>
                    ({portfolio.gain > 0 && '+'}{`${formatNumber(portfolio.gain)}`})
                </text>
            }

            <Pie
                data={[...holdings]}
                isAnimationActive={isAnimation}
                cx={'50%'}
                cy={'50%'}
                // labelLine={false}
                // label
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                activeShape={!isSingle && renderActiveShape} 
                activeIndex={!isSingle && activeCellIndex}
                onMouseEnter={!isSingle && onCellEnter}
                onMouseLeave={!isSingle && onCellLeave}
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


