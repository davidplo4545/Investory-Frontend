import React, {useEffect, useContext, useState} from 'react'
import { Autocomplete } from '@material-ui/lab';
import { useLocation } from 'react-router';
import { Paper, Grid, Button, TextField } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import { getPortfolio, postComparedAssetPortfolio } from '../api/portfolios';
import { getAllAssets1 } from '../api/assets';
import HoldingsChart from '../components/assets-comps/HoldingsChart';
const ComparePortfolioPage = ({match}) =>{
    const user = useContext(UserContext)
    const location = useLocation()
    const portfolioId = match.params.portfolioId 
    const [portfolio, setPortfolio] = useState(null)
    const [assets, setAssets] = useState([])
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [comparedAssetPortfolio, setComparedAssetPortfolio] = useState(null)
    useEffect(() =>{
        if(location.state){
            setPortfolio(location.state.portfolio)
        }
        else{
            getPortfolio(user.token, portfolioId, setPortfolio)
        }
        getAllAssets1(user.token, '', setAssets)
        // postComparedAssetPortfolio(user.token, portfolioId, requestData)
        
        
        // Call api/portfolio/id/compare
    },[])

    const handleAssetSelectionChanged = (e, values) =>{
        if(values !== selectedAsset)
            {
                setSelectedAsset(values)
            }
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        if(selectedAsset){
            const requestData = {asset: selectedAsset.id}
            console.log(portfolio)
            postComparedAssetPortfolio(user.token, portfolioId, requestData, setComparedAssetPortfolio)
        }
    }
    return(
    <Grid container style={{height: '100%'}}>
        {portfolio &&
        <React.Fragment>
        <Grid item xl={3} md={3} style={{backgroundColor:'green'}}>
                <HoldingsChart className="holdings-pie-chart" portfolio={portfolio} width={350} height={350} innerRadius={90} outerRadius={140}/> 
                <form onSubmit={handleFormSubmit}>
                    <Autocomplete
                        options={assets}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => option.id === value.id}
                        onChange={handleAssetSelectionChanged}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Choose Asset" variant="outlined" />}
                        />
                    <Button type="submit">Compare</Button>
                </form>
        </Grid>
        <Grid item xl={6} md={6} xs={12} style={{backgroundColor:'red'}}>
            <h1>compare</h1>
        </Grid>
        <Grid item xl={3} md={3} style={{backgroundColor:'blue'}}>
        {comparedAssetPortfolio &&
            <HoldingsChart className="holdings-pie-chart" portfolio={comparedAssetPortfolio} width={350} height={350} innerRadius={90} outerRadius={140}/> 
        }
        </Grid>
        </React.Fragment>
        }
        {/* <h1>Portfolio Compare</h1> */}
    </Grid>
    )}

export default ComparePortfolioPage;