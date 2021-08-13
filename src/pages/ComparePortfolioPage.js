import React, {useEffect, useContext, useState} from 'react'
import { Autocomplete } from '@material-ui/lab';
import { useLocation } from 'react-router';
import { Paper, Grid, Button, TextField, makeStyles, Box, Typography, useTheme } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import { getPortfolio, postComparedAssetPortfolio } from '../api/portfolios';
import { getAllAssets1 } from '../api/assets';
import HoldingsChart from '../components/charts/HoldingsPieChart';
import CompareLineChart from '../components/charts/CompareLineChart'

const useStyles = makeStyles((theme) =>{
    return({
        portfolioPaper: {
            background: 'transparent',
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
        }
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
    const [selectedHolding , setSelectedHolding] = useState(null)
    const [activeCellIndex, setActiveCellIndex] = useState(null)
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
            postComparedAssetPortfolio(user.token, portfolioId, requestData, setComparedAssetPortfolio)
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
                <Box elevation={8} style={{paddingTop:10, paddingLeft:10, marginBottom:'3rem', minHeight:'500px', height:'500px'}}>
                    {portfolio &&
                        <React.Fragment>
                        {comparedAssetPortfolio ?
                            <React.Fragment>
                                <Typography gutterBottom variant="h4" style={{borderBottom:`1px solid ${theme.palette.primary.main}`}}>{portfolio.name} Vs {comparedAssetPortfolio.holdings[0].asset.name}</Typography>
                                <CompareLineChart portfolio={portfolio}
                                comparedAssetPortfolio={comparedAssetPortfolio}/>
                            </React.Fragment>:
                            <Box>
                                <Typography gutterBottom variant="h4" style={{borderBottom:`1px solid ${theme.palette.primary.main}`}}>{portfolio.name}</Typography>
                                <Typography variant="h4">Waiting for you to choose an asset...</Typography>
                            </Box>

                        }
                        </React.Fragment>
                    }
                </Box>
            </Grid>
    </Grid>
    )}

export default ComparePortfolioPage;