import React from 'react'
import RecentlyViewedAssetsBox from './RecentlyViewedAssetsBox'
import InvestmentCalculator from './InvestmentCalculator'
import {  Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>{
    return{
        grid:{
            width: '100%',
            height: '100%',
            flexDirection:'column',
            [theme.breakpoints.only('xs')]: {
                width: "100%",
                padding:0,
                margin:0,
            },
            [theme.breakpoints.down('sm')]: {
                padding:'1rem',
                flexDirection:'row',
                justifyContent:'space-around',
                border:"none",
                '& .MuiGrid-item':{
                    width:'100%',
                }
                // 'justify-content':'center',
            },
            [theme.breakpoints.up('md')]: {
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
                <Grid item style={{padding:'1rem', border:'1px solid gray'}}>
                    {asset.records.length > 0 ?
                        <InvestmentCalculator records={asset.records}/>
                            : 
                            <div/>
                    }
                </Grid>
                <Grid item style={{marginTop:'1rem'}}>
                    <h4>Portfolios in:</h4>
                    <p>Growth Portfolio</p>
                    <p>Value Portfolio</p>
                    <p>Cryptos</p>
                </Grid>
                </React.Fragment>
            }
            <Grid item style={{width:'100%'}}>
                <RecentlyViewedAssetsBox asset={asset}/>
            </Grid>
        </Grid>
    )
}

export default RightSidebarData