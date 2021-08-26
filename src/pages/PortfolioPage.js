import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserContext'
import { getPortfolio } from '../api/portfolios'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import HoldingsPieChart from '../components/charts/HoldingsPieChart'
import HoldingsTable from '../components/tables/HoldingsTable'
import { Button, Grid, Paper, Box, Typography, makeStyles, ButtonGroup, Accordion, AccordionSummary, useTheme } from '@material-ui/core'
import PortfolioDataPaper from '../components/portfolios/PortfolioDataPaper'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) =>{
    return({
        root:{
            '& h4':{
                fontWeight: 'bold',
                [theme.breakpoints.down('md')]: {
                    margin:'3rem',
                },
            },
            '& p':{
                fontWeight:'bold',
                fontSize: '1.1rem'
            },
        },
        title:{
            marginTop:'1rem',
            fontFamily:'Cabin Sketch, cursive',

            [theme.breakpoints.down('lg')]: {
                marginTop:'3rem',
                paddingLeft:'0.5rem',
            },
        },
        pieChartPaper:{
            padding:'3rem',
            [theme.breakpoints.down('md')]: {
                padding:'1rem',
            },
            [theme.breakpoints.down('sm')]: {
                padding:'0',
                paddingBottom:'1rem',
                border:'none',
            },
        },
        
        holdingGrid:{
            direction:'column',
            [theme.breakpoints.down('xl')]: {
                direction:'row'
            },
        },
        resultTypo:{
            fontWeight:'bold',
            display:'inline-block',
            color:theme.palette.text.secondary,
        }
    })
})

const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD'})

const PortfolioPage = ({match}) =>{
    const user = useContext(UserContext)
    const [portfolio, setPortfolio] = useState(null)
    const portfolioId = match.params.portfolioId
    const [expanded, setExpanded] = useState(true)
    const [selectedHolding , setSelectedHolding] = useState(null)
    const [activeCellIndex, setActiveCellIndex] = useState(null)
    const conversionRate = 3.22
    const [currency, setCurrency] = useState("USD")
    const theme = useTheme()

    useEffect(() => { 
        getPortfolio(user.token, portfolioId, setPortfolio)
    },[portfolioId, user.token])
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded);
      };
    const classes = useStyles()
    return ( 
        
        <React.Fragment>
            {portfolio  &&       
        <Grid 
            container 
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start" >
                <Grid container xl={4} 
                className={classes.holdingGrid}
                justifyContent="center"
                spacing={1}
                alignItems="stretch" 
                style={{ marginTop:'1rem', height:'auto'}}>
                    <Grid item container md={6} lg={12} direction="column"
                    justifyContent="center"
                    >
                        <Paper className={classes.pieChartPaper}>
                            <Grid container 
                            direction="column"
                            justifyContent="center" 
                             alignItems="center">
                                <Grid item>
                                    <HoldingsPieChart
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
                                </Grid>
                                <Grid item>
                                    <PortfolioActionsGroup portfolio={portfolio}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid> 
                    <Grid item md={6} lg={12} style={{width: '100%', marginTop:'0'}}>
                        <PortfolioDataPaper portfolio={portfolio}/>        
                    </Grid> 
                    </Grid>
                    <Grid item container direction="column" xl={7} md={12}>
                            <Grid item>
                                <Typography gutterBottom variant="h4" className={classes.title}>{portfolio.name}</Typography>
                            </Grid>
                <Accordion style={{marginBottom: '1rem'}}
                            onChange={handleChange('panel1')}
                            expanded={expanded}> 
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{borderBottom:`1px solid ${theme.palette.text.secondary}`}}>
                        <Typography variant="subtitle1" style={{color:theme.palette.text.secondary, fontWeight:'bold'}}>
                            {expanded ? `Hide Portfolio Chart` : `Show Portfolio Chart`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item container direction="column">
                            <Grid item container className={classes.root} direction="row" justifyContent="space-between">
                                <Grid item style={{marginBottom:'1rem'}}>
                                    <Typography variant="subtitle1" color="textPrimary">Value:</Typography>
                                    <Typography variant="body1" color="textSecondary">{numberFormatter.format(portfolio.total_value)}</Typography>                                    
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Gain:</Typography>
                                    <Typography variant="body1" style={{color:portfolio.gain > 0 ? "#9dc88d" : "#e27d60"}}>{numberFormatter.format(portfolio.gain)}</Typography>                                    
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Return:</Typography>
                                    <Typography variant="body1" style={{color:portfolio.return > 0 ? "#9dc88d" : "#e27d60"}}>{portfolio.return.toFixed(2)}%</Typography>                                    
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

const PortfolioActionsGroup = ({portfolio}) =>{
    const history = useHistory()
    const theme = useTheme()

    const navigateToPortfolioEdit = () =>{
        history.push({
            pathname: `/portfolios/${portfolio.id}/edit`,
            state: {portfolio:portfolio}
        })
    }
    const navigateToPortfolioCompare = () =>{
        history.push({
            pathname: `/portfolios/${portfolio.id}/compare`,
            state: {portfolio:portfolio}
        })
    }

    return(
        <ButtonGroup style={{marginTop:'1rem'}}>
            <Button onClick={navigateToPortfolioEdit}
            style={{color:theme.palette.text.secondary}}>
                Edit Portfolio
            </Button>
            <Button onClick={navigateToPortfolioCompare}
            style={{color:theme.palette.text.secondary}}>
                Compare
            </Button>
        </ButtonGroup>
    )
}

export default PortfolioPage