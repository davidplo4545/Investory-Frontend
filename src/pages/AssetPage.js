import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import AssetAreaChart from '../components/charts/AssetAreaChart'
import axios from 'axios'
import RightSidebarData from '../components/assets/RightSidebarData'
import './assetPage.css'
import {Box, Grid, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) =>{
    return{
        gridItem:{
            border: `1px solid ${theme.palette.primary.main}`,
            padding: theme.spacing(2),
            borderRadius: '15px',
            [theme.breakpoints.down('md')]: {
                marginTop:theme.spacing(1),
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
    return(
        
        <React.Fragment>
            {asset ?
            <Grid container alignItems="stretch" justifyContent="center" spacing={3}>
                <Grid container item xl={9} md={8} sm={12} direction="column" spacing={3}>
                    <Grid item>
                            <Typography gutterBottom variant="h4">{asset.symbol} - {asset.name}</Typography>
                            <Typography variant="h5">{numberFormatter.format(asset.last_price)}</Typography>
                            {/* {asset.last_price !== undefined && asset.last_price > 10 &&
                            }

                            {asset.last_price !== undefined && asset.last_price < 10 &&
                                <Typography variant="h5">${asset.last_price.toFixed(4)}</Typography>
                            } */}
                    </Grid>
                    <Grid item style={{padding:0}}>
                        <AssetAreaChart asset={asset} records={asset.records}/>
                    </Grid>
                    <Grid container item justifyContent="space-between"
                         alignItems={'stretch'}>
                        <Grid item gutterBottom xs={12} md={12} lg={4} className={classes.gridItem}>
                            <Box>
                                <Typography variant="h6" style={{'textDecoration':'underline'}} gutterBottom>Info:</Typography>
                                <Typography variant="body2" gutterBottom>Type: {asset.type}</Typography>
                                <Typography variant="body2" gutterBottom>Sector: {asset.sector}</Typography>
                                <Typography variant="body2" gutterBottom>Industry: {asset.industry}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} lg={4} className={classes.gridItem}>
                            <Box>
                                <Typography variant="h6" style={{'textDecoration':'underline'}} gutterBottom>Description:</Typography>
                                <Typography variant="body2" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tellus ut neque convallis pretium. Pellentesque tincidunt tellus diam, lobortis condimentum magna placerat vitae. Fusce sagittis lacus quis lorem dapibus, a eleifend neque feugiat. Vivamus eget mi dui. Aenean dolor nulla, congue sit amet pellentesque a, elementum pretium massa. Suspendisse ut ipsum sed velit blandit pretium quis id ipsum. Etiam fermentum ligula eu nunc condimentum feugiat. In non ligula eleifend, ultrices dolor rhoncus, suscipit libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed non urna tempus, accumsan magna ac, mattis ligula. Cras lacus magna, egestas id nisl luctus, facilisis consectetur erat. Aenean a elit bibendum, posuere ipsum eu, consectetur nisl. Duis mattis eleifend vestibulum.</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3} className={classes.gridItem}>
                            <Box>
                            <Typography variant="h6" style={{'textDecoration':'underline'}} gutterBottom>Returns:</Typography>
                            <Typography variant="body2" gutterBottom>YTD: 5%</Typography>
                            <Typography variant="body2" gutterBottom>1 Month: 9%</Typography>
                            <Typography variant="body2" gutterBottom>6 Month: 9%</Typography>
                            <Typography variant="body2" gutterBottom>1 Year: 9%</Typography>
                            <Typography variant="body2" gutterBottom>3 Year: -5%</Typography>
                            <Typography variant="body2" gutterBottom>5 Year: 50%</Typography>
                            </Box>
                        </Grid>
                    </Grid>
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