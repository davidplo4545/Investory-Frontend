import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserContext'
import { getPortfolio } from '../api/portfolios'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import HoldingsPieChart from '../components/charts/HoldingsPieChart'
import HoldingsTable from '../components/tables/HoldingsTable'
import { Button, Grid, Box, Typography, makeStyles, ButtonGroup, Accordion, AccordionSummary, useTheme } from '@material-ui/core'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import axios from 'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './portfolios.css'

const useStyles = makeStyles((theme) =>{
    return({
        root:{
            '& h4':{
                fontWeight: 'bold',
                fontFamily:'Quicksand',
            },
            '& p':{
                fontWeight:'bold',
                fontSize: '1.1rem'
            },
            '& h6':{
                fontWeight:'bold',
                textDecoration:'underline'
            }
        }
    })
})

const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD'})

const PortfolioPage = ({match}) =>{
    let history = useHistory()
    const user = useContext(UserContext)
    const [portfolio, setPortfolio] = useState(null)
    const portfolioId = match.params.portfolioId
    const [expanded, setExpanded] = useState(false)
    const [selectedHolding , setSelectedHolding] = useState(null)
    const [activeCellIndex, setActiveCellIndex] = useState(null)

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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(isExpanded)
      };
    const classes = useStyles()
    const theme = useTheme()
    return ( 
        
        <React.Fragment>
            {portfolio  &&       
        <Grid 
            container 
            direction="row"
            justifyContent="space-around" >
                <Grid item xl={4} className="holdings-pie-chart">
                    <HoldingsPieChart className="holdings-pie-chart"
                     selectedHolding={selectedHolding} 
                     setSelectedHolding={setSelectedHolding} 
                     portfolio={portfolio} 
                     isSingle={false} 
                     width={350} 
                     height={350} 
                     innerRadius={120} 
                     outerRadius={160} 
                     activeCellIndex={activeCellIndex} 
                     setActiveCellIndex={setActiveCellIndex}/> 

                    <ButtonGroup color="default" style={{marginTop:'1rem'}}>
                        <Button onClick={navigateToPortfolioEdit}>Edit Actions</Button>
                        <Button onClick={navigateToPortfolioCompare}>Compare</Button>
                        <Button>Edit</Button>
                    </ButtonGroup>
                </Grid>  
                    <Grid item container direction="column" xl={7} md={12}>
                            <Grid item>
                                <Typography gutterBottom variant="h4">{portfolio.name}</Typography>
                            </Grid>
                <Accordion style={{marginBottom: '1rem'}}
                            onChange={handleChange('panel1')}
                            expanded={expanded}> 
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{borderBottom:`1px solid ${theme.palette.primary.light}`}}>
                        <Typography variant="subtitle1">{expanded ? `Hide Portfolio Chart` : `Show Portfolio Chart`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item container direction="column">
                            <Grid item container className={classes.root} item direction="row" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1">Value:</Typography>
                                    <Typography variant="body1">{numberFormatter.format(portfolio.total_value)}</Typography>                                    
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Gain:</Typography>
                                    <Typography variant="body1" style={{color:portfolio.gain > 0 ? "#9dc88d" : "red"}}>{numberFormatter.format(portfolio.gain)}</Typography>                                    
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Return:</Typography>
                                    <Typography variant="body1" style={{color:portfolio.return > 0 ? "#9dc88d" : "red"}}>{portfolio.return.toFixed(2)}%</Typography>                                    
                                </Grid>

                            </Grid>
                            <Grid item>
                                <AssetAreaChart records={portfolio.records} />                                    
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                        <Grid item container direction="column">
                            <Grid item>
                                <Box>
                                    {/* <Typography variant="h4">Holdings:</Typography> */}
                                    <HoldingsTable setActiveCellIndex={setActiveCellIndex} setSelectedHolding={setSelectedHolding} holdings={portfolio.holdings}/>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
                


        </Grid>
        }
    </React.Fragment>
        
    )
}

export default PortfolioPage