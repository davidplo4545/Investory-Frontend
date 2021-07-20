import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
// import { getPortfolio } from '../api/portfolios'
import AssetChart from '../components/assets-comps/AssetChart'
import HoldingsChart from '../components/assets-comps/HoldingsChart'
import HoldingsTable from '../components/assets-comps/HoldingsTable'
import { ResponsiveContainer } from 'recharts'
import { Button } from '@material-ui/core'
import axios from 'axios'
import './portfolios.css'

  


const PortfolioPage = ({match}) =>{
    const user = useContext(UserContext)
    const [portfolio, setPortfolio] = useState({})
    const [portfolioGain, setPortfoioGain] = useState(0)
    const [portfolioReturn, setPortfolioReturn] = useState(0)
    const portfolioId = match.params.portfolioId
    useEffect(() => {
        // getPortfolio(user.token, portfolioId, setPortfolio)
        const getPortfolio = async () => {
            const domain = "http://127.0.0.1:8000/api"
            await axios.get(domain + `/portfolios/${portfolioId}`,{
                headers:{
                    'Authorization': `Token ${user.token}`
                }
            })
            .then((res) => {
                setPortfolio(res.data)
                setPortfoioGain(res.data.total_value - res.data.total_cost)
                setPortfolioReturn( (res.data.total_value / res.data.total_cost - 1) * 100)
            })
        }
        
        getPortfolio()
    },[])
    
    // console.log(portflio)
    return ( 
        <div className="portfolio-page">
            <div className="holdings-pie-chart">
                
                <HoldingsChart className="holdings-pie-chart" portfolio={portfolio} width={350} height={350} innerRadius={90} outerRadius={140}/> 
                <div className="portfolio-actions">
                    <Button  color="default">Edit Actions</Button>
                    <Button color="default">Edit</Button>
                    <Button color="default">Edit</Button>
                </div>
            </div>       
            {/* {portfolio !== null &&              */}
            <div className="portfolio-line-chart">
                <h2>{portfolio.name}</h2>
                <div className="portfolio-wrapper">
                    <div className="portfolio-details">
                        {Object.keys(portfolio).length !== 0 && 
                        <p>Value:<br/>
                            <p className="portfolio-number">{portfolio.total_value.toFixed(2)}$</p>
                        </p>
                        }
                        <p>Gain:<br/>
                            <p className="portfolio-number" style={{color:portfolioGain > 0 ? "#9dc88d" : "red"}}>{portfolioGain.toFixed(2)}$</p>
                        </p>
                        <p>Return:<br/>
                            <p className="portfolio-number" style={{color: portfolioReturn > 0 ? "#9dc88d" : "red"}}>{portfolioReturn.toFixed(2)}%</p>
                        </p>
                    </div>
                    <AssetChart records={portfolio.records} />
                </div>
                <h2>Portflio Holdings:</h2>
                <HoldingsTable holdings={portfolio.holdings}/>
            </div>
            {/* } */}

        </div>
        
    )
}

export default PortfolioPage