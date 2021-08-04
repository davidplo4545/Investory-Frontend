import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserContext'
import { getPortfolio } from '../api/portfolios'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import HoldingsPieChart from '../components/charts/HoldingsPieChart'
import HoldingsTable from '../components/tables/HoldingsTable'
import { Button, Grid, Paper } from '@material-ui/core'
import axios from 'axios'
import './portfolios.css'

const PortfolioPage = ({match}) =>{
    let history = useHistory()
    const user = useContext(UserContext)
    const [portfolio, setPortfolio] = useState(null)
    const [holdings, setHoldings] = useState(null)
    const portfolioId = match.params.portfolioId
    useEffect(() => { 
        getPortfolio(user.token, portfolioId, setPortfolio)
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
        
        <React.Fragment>
            {portfolio  &&       
        <Grid 
            container 
            direction="row"
            // alignItems="center"
            justifyContent="center" >
                <Grid item xl={4} className="holdings-pie-chart">
                    
                    <HoldingsPieChart className="holdings-pie-chart" portfolio={portfolio} isSingle={false} width={350} height={350} innerRadius={90} outerRadius={140}/> 
                    <div className="portfolio-actions">
                        <Button onClick={navigateToPortfolioEdit} color="default">Edit Actions</Button>
                        <Button color="default" onClick={navigateToPortfolioCompare}>Compare</Button>
                        <Button color="default">Edit</Button>
                    </div>
                </Grid>       
                <Grid item xl={8} md={12} className="portfolio-line-chart">
                    <h2>{portfolio.name}</h2>
                    <div className="portfolio-wrapper">
                        <div className="portfolio-details">
                            <div>Value:<br/>
                                <p className="portfolio-number">{portfolio.total_value.toFixed(2)}$</p>
                            </div>
                            <div>Gain:<br/>
                                <p className="portfolio-number" style={{color:portfolio.gain > 0 ? "#9dc88d" : "red"}}>{portfolio.gain.toFixed(2)}$</p>
                            </div>
                            <div>Return:<br/>
                                <p className="portfolio-number" style={{color: portfolio.return > 0 ? "#9dc88d" : "red"}}>{portfolio.return.toFixed(2)}%</p>
                            </div>
                        </div>
                        <AssetAreaChart records={portfolio.records} />
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


        </Grid>
        }
    </React.Fragment>
        
    )
}

export default PortfolioPage