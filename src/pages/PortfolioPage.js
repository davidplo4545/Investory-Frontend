import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserContext'
import { getPortfolio, getSharedPortfolio } from '../api/portfolios'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import HoldingsPieChart from '../components/charts/HoldingsPieChart'
import HoldingsTable from '../components/tables/HoldingsTable'
import { Button, Grid, Paper, TextField, Box, Typography, makeStyles, ButtonGroup, Accordion, AccordionSummary, useTheme } from '@material-ui/core'
import PortfolioDataPaper from '../components/portfolios/PortfolioDataPaper'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { patchPortfolioIsShare } from '../api/portfolios'

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

const PortfolioPage = ({match, shortUrl=null}) =>{
    const user = useContext(UserContext)
    const history = useHistory()
    const [portfolio, setPortfolio] = useState(null)
    const [expanded, setExpanded] = useState(true)
    const [selectedHolding , setSelectedHolding] = useState(null)
    const [activeCellIndex, setActiveCellIndex] = useState(null)
    const theme = useTheme()
    
    useEffect(() => { 
        if(match)
        {
            const portfolioId = match.params.portfolioId
            getPortfolio(user.token, portfolioId, setPortfolio, history)
        }
        else if(shortUrl)
            getSharedPortfolio(shortUrl, setPortfolio, history)
            
    },[user.token, shortUrl, match])
    
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
                                    <PortfolioActionsGroup portfolio={portfolio} setPortfolio={setPortfolio}/>                                    
                                </Grid>
                                {portfolio.is_shared &&
                                    <Grid item>
                                        <ClipboardBox portfolio={portfolio}/>
                                    </Grid>
                                }

                            </Grid>
                            

                        </Paper>
                    </Grid> 
                    <Grid item md={6} lg={12} style={{width: '100%', marginTop:'0'}}>
                        <PortfolioDataPaper portfolio={portfolio}/>        
                    </Grid> 
                    </Grid>
                    <Grid item container direction="column" xl={7} md={12}>
                            <Grid item container style={{justifyContent:'space-between'}}>
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

const PortfolioActionsGroup = ({portfolio, setPortfolio}) =>{
    const history = useHistory()
    const theme = useTheme()
    const user = useContext(UserContext)


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

    const changePortfolioIsShare = () =>{
        const requestData = {'is_shared':!portfolio.is_shared}
        patchPortfolioIsShare(
            user.token, 
            portfolio.id, 
            requestData, 
            portfolio,
            setPortfolio)
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
            <Button variant="outlined" 
                style={{ color: theme.palette.text.secondary}}
                onClick={() => changePortfolioIsShare()}>
                {portfolio.is_shared ? "UnShare" : "Share"}
            </Button>
        </ButtonGroup>
    )
}

const ClipboardBox = ({portfolio}) =>{
    const theme = useTheme()
    const url = `${window.location.host}/shared/${portfolio.short_url}`

    const copyToClipboard = (e) =>{
        navigator.clipboard.writeText(url)
        document.execCommand('copy');
        e.target.focus();
    }

    return(
        <Box style={{justifyContent:'center',
            marginTop:'1rem',
            border:`1px solid ${theme.palette.text.secondary}`,
            borderRadius:'1rem',
            padding:'0.5rem'}}>
            <TextField
                value={url}
                style={{paddingRight:'0.5rem',
                color:theme.palette.text.primary,
            borderRight:`1px solid ${theme.palette.text.secondary}`}}
                />
                <Button
                    style={{color:theme.palette.text.secondary, margin:0}}
                    onClick={copyToClipboard}
                    endIcon={<AttachFileIcon/>}>
                        Copy
                </Button>
        </Box>
    )
}

export default PortfolioPage