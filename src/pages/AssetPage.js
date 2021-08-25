import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import axios from 'axios'
import RightSidebarData from '../components/assets/RightSidebarData'
import { Grid, Typography, useTheme} from '@material-ui/core'
import { formatNumber } from '../components/base/helpers'
import StockDataBox from '../components/assets/StockDataBox'


const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    const [asset, setAsset] = useState(null)
    const [error, setError] = useState("")
    const assetId = match.params.assetId
    useEffect(() => {
        const getAsset = async () =>{ 
            const domain = "http://localhost:8000/api"
            await axios.get( domain + `/assets/${assetId}`,{
                headers:{
                    'Authorization': `Token ${user.token}`
                }
            })
            .then((res) =>{
                setAsset(res.data)
            })
            .catch((error) =>{
                setError("Asset was not found.")
            })
        }
        getAsset()
    },[assetId, user.token]);

    return(
        
        <React.Fragment>
            {asset ?
            <Grid container alignItems="stretch" justifyContent="center" spacing={3} style={{marginTop:'0.5rem'}}>
                <Grid container item lg={8} md={8} sm={12} direction="column" spacing={3}>
                    <Grid item style={{marginLeft:'1rem'}}>
                            <Typography gutterBottom style={{fontWeight:'bold', display:'flex', alignItems:'center'}} 
                            variant="h4">
                                {asset.logo_url &&
                                    <img src={asset.logo_url} alt="company-logo"
                                    style={{maxHeight:'60px', minWidth:'50px', marginRight:'1rem'}}/>
                                }
                                {asset.symbol} - {asset.name}
                            </Typography>
                            <Typography color="textSecondary" variant="h5" style={{fontWeight:'bold'}}>
                                {formatNumber(asset.last_price, asset.currency)}
                            </Typography>
                    </Grid>
                    <Grid item>
                        <AssetAreaChart asset={asset} records={asset.records}/>
                    </Grid>
                    <StockDataBox asset={asset}/>
                </Grid>
                <Grid item lg={3} md={3} sm={12}>
                    {asset &&
                        <RightSidebarData isSingleAsset={true} asset={asset}/>
                    }
                </Grid>

            </Grid>
            :
            <Typography variant="h3">{error}</Typography>
            }
        </React.Fragment>
    )


}



export default AssetPage