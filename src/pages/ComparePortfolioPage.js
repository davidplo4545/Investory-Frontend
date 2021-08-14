import React, {useEffect, useContext, useState} from 'react'
import { Autocomplete } from '@material-ui/lab';
import { useLocation } from 'react-router';
import { Paper, Grid, Button, TextField, makeStyles, Box, Typography, Link as MuiLink, useTheme, CircularProgress } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import { getPortfolio, postComparedAssetPortfolio } from '../api/portfolios';
import { getAllAssets1 } from '../api/assets';
import HoldingsChart from '../components/charts/HoldingsPieChart';
import CompareLineChart from '../components/charts/CompareLineChart'
import {Link} from 'react-router-dom';
import ComparisonDataBox from '../components/portfolios/ComparisonDataBox';

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
        chooseAssetForm:{
            flexDirection:'row',
            alignItems:"stretch", 
            justifyContent:"space-between",
            marginTop:'1rem',
            [theme.breakpoints.down('md')]: {
                flexDirection:'column',
                alignItems:"center", 
                justifyContent:'center',
                '& .MuiAutocomplete-root, .MuiButton-root':{
                    marginBottom:'1rem',
                }
                
           },
        },
    })
})

const ComparePortfolioPage = ({match}) =>{
    const user = useContext(UserContext)
    const location = useLocation()
    const portfolioId = match.params.portfolioId 
    const [portfolio, setPortfolio] = useState(null)
    const [assets, setAssets] = useState([])
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [comparedAssetPortfolio, setComparedAssetPortfolio] = useState(null)
    const [comparedAsset, setComparedAsset] = useState(null)
    const [selectedHolding , setSelectedHolding] = useState(null)
    const [activeCellIndex, setActiveCellIndex] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const theme = useTheme()
    useEffect(() =>{
        if(location.state){
            setPortfolio(location.state.portfolio)
        }
        else{
            getPortfolio(user.token, portfolioId, setPortfolio)
        }

        getAllAssets1(user.token, '', setAssets)
        
    },[])

    const handleAssetSelectionChanged = (e, values) =>{
        if(values !== selectedAsset)
            {
                setSelectedAsset(values)
            }
    }

    const classes = useStyles()

    const comparePortfolioToAsset = (e) =>{
        if(selectedAsset){
            const requestData = {asset: selectedAsset.id}
            postComparedAssetPortfolio(user.token,
                portfolioId,
                requestData,
                setComparedAsset, 
                setComparedAssetPortfolio, 
                setIsLoading)
        }
    }


    return(
        <Grid container style={{height: '100%'}}
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
                        <Grid item container 
                        spacing={2}
                        className={classes.chooseAssetForm}>
                            <Autocomplete
                                options={assets}
                                getOptionLabel={(option) => option.name}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={handleAssetSelectionChanged}
                                style={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="Choose Asset" variant="outlined" />}
                                />
                            <Button variant="contained" 
                            color="primary" 
                            onClick={comparePortfolioToAsset}
                            type="submit">Compare</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xl={8} xs={12} md={12}>
                {portfolio &&
                    <Grid container direction="column">
                        <Grid item style={{minHeight:'500px', height:'500px'}}>
                            {comparedAssetPortfolio && comparedAsset ?
                                <React.Fragment>
                                    <Box style={{borderBottom:`1px solid ${theme.palette.primary.main}`,marginLeft:'1rem', marginTop:'1rem', paddingBottom:'0.5rem'}}>
                                        {isLoading &&
                                            <CircularProgress size={32} style={{marginRight:'1rem'}} color="primary"/>
                                        }
                                        <MuiLink component={Link} to={`/portfolios/${portfolio.id}`}>
                                            <Typography variant="h4" style={{display:'inline-block', color: portfolio.total_value > comparedAssetPortfolio.total_value ? "#9dc88d" : "#e27d60"}}>
                                                {`${portfolio.name} `}
                                            </Typography> 
                                        </MuiLink>
                                        <Typography variant="h4" style={{display:'inline-block', marginRight:'0.7rem', marginLeft:'0.7rem'}}> 
                                        {`Vs`}
                                        </Typography> 
                                        <MuiLink component={Link} to={`/asset/${comparedAsset.id}`}>
                                            <Typography variant="h4" style={{display:'inline-block', color: portfolio.total_value < comparedAssetPortfolio.total_value ? "#9dc88d" : "#e27d60"}}>
                                                {comparedAsset.name }
                                            </Typography> 
                                        </MuiLink>
                                        
                                    </Box>

                                    <CompareLineChart portfolio={portfolio}
                                    comparedAssetPortfolio={comparedAssetPortfolio}/>
                                </React.Fragment>:
                                <Box>
                                    {isLoading &&
                                        <CircularProgress size={32} style={{marginRight:'1rem'}} color="primary"/>
                                    }
                                    <Typography gutterBottom variant="h4" 
                                    style={{borderBottom:`1px solid ${theme.palette.primary.main}`, 
                                    paddingBottom:'0.5rem', 
                                    marginTop:'1rem',
                                    display:'inline-block'}}>
                                        {portfolio.name}
                                    </Typography>
                                    <Typography style={{marginLeft:'0.5rem'}} variant="h5">
                                        Choose an asset and click Compare to get started!
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