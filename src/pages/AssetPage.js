import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import axios from 'axios'
import { Link } from "react-router-dom";
import RightSidebarData from '../components/assets/RightSidebarData'
import './assetPage.css'
import {Button, Grid, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) =>{
    return{
        grid:{
            background:'red',
        }
    }
})

const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    const [asset, setAsset] = useState(null)
    const [isValid, setIsValid] = useState(false)
    const assetId = match.params.assetId

    useEffect(() => {
        const getAsset = async () =>{ 
            const domain = "http://127.0.0.1:8000/api"
            await axios.get( domain + `/assets/${assetId}`,{
                headers:{
                    'Authorization': `Token ${user.token}`
                }
            })
            .then((res) =>{
                setAsset(res.data)
            })
            .catch((error) =>{
                setIsValid(false)
            })
        }
        getAsset()
        setIsValid(true)
    },[match]);
    return(
        
        <React.Fragment>
            {asset ?
            <Grid container alignItems="stretch">
                <Grid item xl={9} md={8} sm={12} className="asset-data">
                    <div className="asset-headers">
                        <div className="header-info">
                            <h2>{asset.symbol} - {asset.name}</h2>
                            {asset.last_price !== undefined && asset.last_price > 10 &&
                                <h3 className="last-price">${asset.last_price.toFixed(2)}</h3>
                            }

                            {asset.last_price !== undefined && asset.last_price < 10 &&
                                <h3 className="last-price">${asset.last_price.toFixed(4)}</h3>
                            }
                        </div> 
                        {/* <div className="header-buttons">
                            <Button color="default"><Link to={'/portfolios'}>Add to portfolio</Link></Button>
                        </div>                        */}
                    </div>
                    <AssetAreaChart asset={asset} records={asset.records}/>
                    <div className="asset-info">
                        <div className="first-info">
                            <p>Type: {asset.type}</p>
                            {asset.sector &&
                                <React.Fragment>
                                    <p>Sector: {asset.sector}</p>
                                    <p>Industry: {asset.industry}</p>
                                </React.Fragment>
                            }
                            <p>Market Cap: 1.3B</p>
                        </div>
                        <div className="second-info">
                            <p>Returns:</p>
                            <p>YTD: 5%</p>
                            <p>1 Month: 9%</p>
                            <p>6 Month: 9%</p>
                            <p>1 Year: 9%</p>
                            <p>3 Year: -5%</p>
                            <p>5 Year: 50%</p>
                        </div>
                        <div className="third-info">
                            <p>Sector: {asset.sector}</p>
                            <p>Industry: {asset.industry}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xl={3} md={3} sm={12}>
                    {asset &&
                        <RightSidebarData isSingleAsset={true} asset={asset}/>
                    }
                </Grid>

            </Grid>
            :
            <React.Fragment>not valid</React.Fragment>
            }
        </React.Fragment>
    )


}



export default AssetPage