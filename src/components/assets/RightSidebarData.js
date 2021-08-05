import React from 'react'
import RecentlyViewedAssetsBox from './RecentlyViewedAssetsBox'
import InvestmentCalculator from './InvestmentCalculator'
import {  Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>{
    return{
        grid:{
            width: '100%',
            height: '100%',
            [theme.breakpoints.down('xs')]: {
                width: "100%",
            },
            [theme.breakpoints.down('sm')]: {
                flexDirection:'row',
                border:"none",
                // 'justify-content':'center',
            },
            [theme.breakpoints.up('md')]: {
                flexDirection:'row',
                paddingLeft: '25px',
                marginLeft: '1rem',
                borderLeft: "1px solid gray",
            },
        }
    }
})
const RightSidebarData = ({isSingleAsset, asset}) =>{
    const classes = useStyles();
    return(
        <Grid container
        className={classes.grid}>
            {/* Only show investment calculator in /assets/id url */}
            {isSingleAsset &&
            <React.Fragment>
                <Grid item xs={12} className="investment-calculator">
                    {asset.records.length > 0 ?
                        <InvestmentCalculator records={asset.records}/>
                            : 
                            <div/>
                    }
                </Grid>
                <Grid item xs={12} className="portfolios-in">
                    <h4>Portfolios in:</h4>
                    <p>Growth Portfolio</p>
                    <p>Value Portfolio</p>
                    <p>Cryptos</p>
                </Grid>
                </React.Fragment>
            }
            <Grid item xs={12}>
                <RecentlyViewedAssetsBox asset={asset}/>
            </Grid>
        </Grid>
    )
}

export default RightSidebarData