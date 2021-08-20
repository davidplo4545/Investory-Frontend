import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import axios from 'axios'
import RightSidebarData from '../components/assets/RightSidebarData'
import {Box, Grid, makeStyles, Typography, useTheme} from '@material-ui/core'

const useStyles = makeStyles((theme) =>{
    return{
        gridItem:{
            border: `1px solid ${theme.palette.text.secondary}`,
            padding: theme.spacing(2),
            borderRadius: '15px',
            [theme.breakpoints.down('md')]: {
                marginTop:theme.spacing(1),
                margin:'1rem',
              },
        },
    }
})

const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    const [asset, setAsset] = useState(null)
    const [isValid, setIsValid] = useState(false)
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
                setIsValid(false)
            })
        }
        getAsset()
        setIsValid(true)
    },[match]);

    const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD'})
    const classes = useStyles()
    const theme = useTheme()
    return(
        
        <React.Fragment>
            {asset ?
            <Grid container alignItems="stretch" justifyContent="center" spacing={3} style={{marginTop:'0.5rem'}}>
                <Grid container item lg={8} md={8} sm={12} direction="column" spacing={3}>
                    <Grid item style={{marginLeft:'1rem'}}>
                            <Typography gutterBottom style={{fontWeight:'bold'}} variant="h4">{asset.symbol} - {asset.name}</Typography>
                            <Typography color="textSecondary" variant="h5" style={{fontWeight:'bold'}}>{numberFormatter.format(asset.last_price)}</Typography>
                    </Grid>
                    <Grid item>
                        <AssetAreaChart asset={asset} records={asset.records}/>
                    </Grid>
                    <Grid container item justifyContent="space-between"
                         alignItems={'stretch'}>
                        <Grid item xs={12} md={12} lg={4} className={classes.gridItem}>
                            <Box>
                                <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>Info:</Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>Type: {asset.type}</Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>Location: {asset.type}</Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>Sector: {asset.sector}</Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>Industry: {asset.industry}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} lg={4} className={classes.gridItem}>
                            <Box>
                                <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>Description:</Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tellus ut neque convallis pretium. Pellentesque tincidunt tellus diam, lobortis condimentum magna placerat vitae. Fusce sagittis lacus quis lorem dapibus, a eleifend neque feugiat. Vivamus eget mi dui. Aenean dolor nulla, congue sit amet pellentesque a, elementum pretium massa. Suspendisse ut ipsum sed velit blandit pretium quis id ipsum. Etiam fermentum ligula eu nunc condimentum feugiat. In non ligula eleifend, ulhiCras lacus magna, egestas id nisl luctus, facilisis consectetur erat. Aenean a elit bibendum, posuere ipsum eu, consectetur nisl.</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3} className={classes.gridItem}>
                            <Box>
                            <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>Returns:</Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>YTD: 5%</Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>1 Month: 9%</Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>6 Month: 9%</Typography>
                            <Typography variant="body2" color="textSecondary" color="textSecondary" gutterBottom>1 Year: 9%</Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>3 Year: -5%</Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>5 Year: 50%</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={3} md={3} sm={12}>
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