import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserContext'
// import { getPortfolio } from '../api/portfolios'
import AssetChart from '../components/assets-comps/AssetChart'
import HoldingsChart from '../components/assets-comps/HoldingsChart'
import HoldingsTable from '../components/assets-comps/HoldingsTable'
import { ResponsiveContainer } from 'recharts'
import { Button, Grid, Paper } from '@material-ui/core'
import axios from 'axios'
import './portfolios.css'

const PortfolioPage = ({match}) =>{
    let history = useHistory()
    const user = useContext(UserContext)
    const [portfolio, setPortfolio] = useState(null)
    const [portfolioGain, setPortfoioGain] = useState(0)
    const [portfolioReturn, setPortfolioReturn] = useState(0)
    const [holdings, setHoldings] = useState(null)
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
                let portHoldings = res.data.holdings
                portHoldings.forEach(holding => {
                    const {total_value, total_cost, cost_basis} = holding
                    console.log(holding)
                    holding.percentage = `${((total_value / res.data.total_value) * 100).toFixed(2)}%`
                    holding.gainPercentage = `${((total_value / total_cost - 1) * 100).toFixed(2)}%`
                    holding.total_cost = `${total_cost.toFixed(2)}$`
                    holding.total_value = `${total_value.toFixed(2)}$`
                    holding.cost_basis = `${cost_basis.toFixed(2)}$`
                    holding.asset.last_price = `${holding.asset.last_price.toFixed(2)}$`
                })
                setHoldings(portHoldings)
            })
        }
        
        getPortfolio()
    },[])
    
    const navigateToPortfolioEdit = () =>{
        history.push({
            pathname: `/portfolios/${portfolioId}/edit`,
            state: {portfolio:portfolio}
        })
    }
    const navigateToPortfolioCompare = () =>{
        history.push({
            pathname: `/portfolios/${portfolioId}/compare`,
            state: {portfolio:portfolio}
        })
    }
    return ( 
        <Grid 
            container 
            direction="row"
            // alignItems="center"
            justifyContent="center" >
            {portfolio  &&             
            <React.Fragment>
            <Grid item xl={4} className="holdings-pie-chart">
                
                <HoldingsChart className="holdings-pie-chart" portfolio={portfolio} width={350} height={350} innerRadius={90} outerRadius={140}/> 
                <div className="portfolio-actions">
                    <Button onClick={navigateToPortfolioEdit} color="default">Edit Actions</Button>
                    <Button color="default">Edit</Button>
                    <Button color="default">Edit</Button>
                </div>
            </Grid>       
            <Grid item xl={8} md={12} className="portfolio-line-chart">
                <h2>{portfolio.name}</h2>
                <div className="portfolio-wrapper">
                    <div className="portfolio-details">
                        {portfolio && 
                        <div>Value:<br/>
                            <p className="portfolio-number">{portfolio.total_value.toFixed(2)}$</p>
                        </div>
                        }
                        <div>Gain:<br/>
                            <p className="portfolio-number" style={{color:portfolioGain > 0 ? "#9dc88d" : "red"}}>{portfolioGain.toFixed(2)}$</p>
                        </div>
                        <div>Return:<br/>
                            <p className="portfolio-number" style={{color: portfolioReturn > 0 ? "#9dc88d" : "red"}}>{portfolioReturn.toFixed(2)}%</p>
                        </div>
                    </div>
                    <AssetChart records={portfolio.records} />
                </div>
            </Grid>
            <Grid container justifyContent="flex-start">
                <Grid item xl={9} md={12}>
                    <Paper elevation={6}>
                        <h2>Portflio Holdings:</h2>
                        <HoldingsTable holdings={portfolio.holdings}/>
                    </Paper>
                </Grid>
            </Grid>
            </React.Fragment>

             }

        </Grid>
        
    )
}

export default PortfolioPage