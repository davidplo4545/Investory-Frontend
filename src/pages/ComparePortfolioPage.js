import React, {useEffect, useContext, useState} from 'react'
import { Autocomplete } from '@material-ui/lab';
import { useLocation } from 'react-router';
import { Paper, Grid, Button, TextField, makeStyles, Card } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import { getPortfolio, postComparedAssetPortfolio } from '../api/portfolios';
import { getAllAssets1 } from '../api/assets';
import HoldingsChart from '../components/charts/HoldingsPieChart';
import CompareLineChart from '../components/charts/CompareLineChart'

const useStyles = makeStyles({
    paper: {
    //   width: "100%",
    //   height: "100%",
      background: 'transparent',
      padding:'3rem',
    }
  });

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

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        if(selectedAsset){
            const requestData = {asset: selectedAsset.id}
            postComparedAssetPortfolio(user.token, portfolioId, requestData, setComparedAssetPortfolio)
        }
    }


    return(
    <React.Fragment>
    {portfolio &&
        <Grid container style={{height: '100%'}} 
                    justifyContent="center">
            <Grid item xl={12} xs={12}>
                <form style={{display:'flex', flexDirection:'row'}} onSubmit={handleFormSubmit}>
                    <Autocomplete
                        options={assets}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => option.id === value.id}
                        onChange={handleAssetSelectionChanged}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Choose Asset" variant="outlined" />}
                        />
                    <Button variant="contained" color="primary" type="submit">Compare</Button>
                </form>
            </Grid>
            <Grid item xl={3} md={3}>
                <Paper className={classes.paper} elevation={7}>
                    <Grid container direction="column">
                        <HoldingsChart className="holdings-pie-chart"
                        portfolio={portfolio}
                        width={350} 
                        height={350} 
                        innerRadius={120} 
                        outerRadius={160} 
                        isSingle={false}
                        selectedHolding={selectedHolding} 
                        setSelectedHolding={setSelectedHolding} 
                        activeCellIndex={activeCellIndex} 
                        setActiveCellIndex={setActiveCellIndex}/> 
                    </Grid>
                </Paper>
            </Grid>
        <Grid item xl={9} md={9} xs={12}>
        {comparedAssetPortfolio && portfolio &&
            <CompareLineChart portfolio={portfolio}
             comparedAssetPortfolio={comparedAssetPortfolio}/>
        }
        </Grid>
        {/* <Paper className={classes.paper} xl={5} elevation={7}>
        <Grid item xl={3} md={3}>
        {comparedAssetPortfolio &&
            <HoldingsChart className="holdings-pie-chart"
            portfolio={comparedAssetPortfolio}
            width={350}
            height={350} 
            innerRadius={90} 
            outerRadius={140}
            isSingle={true}/> 
            // <h1> Compared Data</h1>
        }
        </Grid>
    </Paper> */}
        {/* <h1>Portfolio Compare</h1> */}
    </Grid>
}
        </React.Fragment>
    )}

export default ComparePortfolioPage;