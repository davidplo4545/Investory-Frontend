import React, {useEffect, useContext, useState} from 'react'
import { useLocation } from 'react-router';
import { Paper, Grid, makeStyles, Box, Typography, Link as MuiLink, useTheme, CircularProgress } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import { getPortfolio, postComparedAssetPortfolio } from '../api/portfolios';
import HoldingsChart from '../components/charts/HoldingsPieChart';
import CompareLineChart from '../components/charts/CompareLineChart'
import {Link} from 'react-router-dom';
import ComparisonDataBox from '../components/portfolios/ComparisonDataBox';
import PortfolioCompareForm from '../components/forms/PortfolioCompareForm';

const useStyles = makeStyles((theme) =>{
    return({
        portfolioPaper: {
            background: 'transparent',
            marginTop:'1rem',
            padding:'3rem',
            [theme.breakpoints.down('xs')]: {
                 padding:'0.7rem',
            },
          },
    })
})

const ComparePortfolioPage = ({match}) =>{
    const user = useContext(UserContext)
    const location = useLocation()
    const portfolioId = match.params.portfolioId 
    const [portfolio, setPortfolio] = useState(null)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [comparedAssetPortfolio, setComparedAssetPortfolio] = useState(null)
    const [comparedAsset, setComparedAsset] = useState(null)
    const [selectedHolding , setSelectedHolding] = useState(null)
    const [activeCellIndex, setActiveCellIndex] = useState(null)
    const [error ,setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const theme = useTheme()
    useEffect(() =>{
        if(location.state){
            setPortfolio(location.state.portfolio)
        }
        else{
            getPortfolio(user.token, portfolioId, setPortfolio)
        }

        
    },[user.token, location.state, portfolioId])



    const classes = useStyles()

    const comparePortfolioToAsset = (e) =>{
        setError("")
        if(selectedAsset){
            const requestData = {asset: selectedAsset.id}
            postComparedAssetPortfolio(user.token,
                portfolioId,
                requestData,
                setComparedAsset, 
                setComparedAssetPortfolio, 
                setIsLoading,
                setError)
        }
    }


    return(
        <Grid container style={{height: '100%', marginBottom:'10rem'}}
                    direction="row" 
                    justifyContent="center"
                    spacing={1}>
            <Grid item xl={4} md={12}>
                <Paper className={classes.portfolioPaper} 
                    elevation={7}>
                    <Grid container direction="column"
                            alignItems="center"
                            justifyContent="center">
                        <Grid item>
                            {portfolio &&
                            <HoldingsChart
                            portfolio={portfolio}
                            isAnimation={false}
                            width={350} 
                            height={350} 
                            innerRadius={120} 
                            outerRadius={160} 
                            isSingle={false}
                            selectedHolding={selectedHolding} 
                            setSelectedHolding={setSelectedHolding} 
                            activeCellIndex={activeCellIndex} 
                            setActiveCellIndex={setActiveCellIndex}/> 
                            }
                        </Grid>
                        <PortfolioCompareForm
                        selectedAsset={selectedAsset}
                        setSelectedAsset={setSelectedAsset}
                        comparePortfolioToAsset={comparePortfolioToAsset}/>

                        <Typography variant="body1" color="textSecondary" style={{marginTop:'1rem'}}>
                            {error}
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xl={8} xs={12} md={12}>
                {portfolio &&
                    <Grid container direction="column">
                        <Grid item style={{minHeight:'500px', height:'500px'}}>
                            {comparedAssetPortfolio && comparedAsset ?
                                <React.Fragment>
                                    <Box style={{borderBottom:`1px solid ${theme.palette.text.primary}`,marginLeft:'1rem', marginTop:'1rem', paddingBottom:'0.5rem'}}>
                                        {isLoading &&
                                            <CircularProgress size={32} style={{marginRight:'1rem', color:theme.palette.text.secondary}}/>
                                        }
                                        <MuiLink component={Link} to={`/portfolios/${portfolio.id}`}
                                        style={{display:'inline-block'}}>
                                            <Typography variant="h4" 
                                            style={{color: portfolio.total_gain > 
                                             comparedAssetPortfolio.total_gain ? "#9dc88d" : "#e27d60",
                                             fontFamily:'Cabin Sketch'}}>
                                                <b>{`${portfolio.name} `}</b>
                                            </Typography> 
                                        </MuiLink>
                                        <Typography variant="h4" style={{display:'inline-block', marginRight:'0.7rem', marginLeft:'0.7rem'}}> 
                                        {`Vs`}
                                        </Typography> 
                                        <MuiLink component={Link} to={`/asset/${comparedAsset.id}`}>
                                            <Typography variant="h4" 
                                            style={{display:'inline-block', 
                                            color: portfolio.total_gain < comparedAssetPortfolio.total_gain ? "#9dc88d" : "#e27d60",
                                            fontFamily:'Cabin Sketch'}}>
                                                <b>{comparedAsset.name }</b>
                                            </Typography> 
                                        </MuiLink>
                                        
                                    </Box>

                                    <CompareLineChart portfolio={portfolio}
                                    comparedAssetPortfolio={comparedAssetPortfolio}/>
                                </React.Fragment>:
                                <Box>
                                        
                                        <Typography gutterBottom variant="h4" 
                                        style={{borderBottom:`1px solid ${theme.palette.text.secondary}`, 
                                        display:'flex',
                                        paddingBottom:'0.5rem', 
                                        width:'100%',
                                        marginTop:'1rem',
                                        fontFamily:'Cabin Sketch'}}>
                                            {isLoading &&
                                            <CircularProgress size={32} style={{marginRight:'1rem',marginBottom:'0.5rem', color:theme.palette.text.secondary}}/>
                                        }
                                            <b>{portfolio.name}</b>
                                        </Typography>
                                    <Typography style={{marginLeft:'0.5rem'}} variant="h5" color="textSecondary">
                                        Choose an asset and click <b>Compare</b> to get started!
                                    </Typography>
                                </Box>
                            }
                        </Grid>
                        <Grid item style={{marginTop:'6rem'}}>
                            {portfolio && comparedAsset &&
                            <ComparisonDataBox portfolio={portfolio}
                            comparedAsset={comparedAsset}
                            comparedAssetPortfolio={comparedAssetPortfolio}/>
                        }
                        </Grid>
                    </Grid>
                }
            </Grid>
    </Grid>
    )}

export default ComparePortfolioPage;