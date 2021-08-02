import { Grid, Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import {Link as MuiLink, makeStyles}  from '@material-ui/core';

const useStyles = makeStyles((theme) =>{
    return ({
        gridItem:{
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            paddingBottom: theme.spacing(0.5),
            // fontFamily: 'Helvetica',
            '&:hover':{
                color: theme.palette.primary.main,
            }
        },
        link:{
            color:theme.palette.text.primary,
            '&:hover':{
                textDecoration:'none',
                color: theme.palette.primary.main,
                background:'white',
            }
        }
    })
})
const RecentlyViewedAssetsBox = ({asset}) =>{
    const [recentlyViewedAssets, setRecentlyViewedAssets] = useState([])
    const classes = useStyles()

    const getRecentlyViewedAssets = () =>{
        let recAssets = JSON.parse(localStorage.getItem('recentlyViewedAssets'))
        if(asset)
        {
            const link = `/asset/${asset.id}`
            
            if (recAssets == null)
            {
                const recAssets = []
                recAssets.push({name:asset.name,symbol:asset.symbol,link:link})
                localStorage.setItem('recentlyViewedAssets', JSON.stringify(recAssets))
            }
            else{
                if (recAssets.length > 9)
                    recAssets.pop()
                recAssets = recAssets.filter((asset) => asset.link !== link)
                recAssets.unshift({name:asset.name,symbol:asset.symbol,link:link})
                localStorage.setItem('recentlyViewedAssets', JSON.stringify(recAssets))
            }
        }
        setRecentlyViewedAssets(recAssets)
    }

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    useEffect(() =>{
        getRecentlyViewedAssets()
    }, [asset])

    return(
        <Grid 
            container 
            style={{marginTop:'1rem'}}
            direction="column"
            alignItems="flex-start">
        <Typography variant="h6">Recently viewed tickers:</Typography>
        {recentlyViewedAssets &&
        <React.Fragment>
        {recentlyViewedAssets.map((asset) => {
            return <Grid item  className={classes.gridItem} key={generateKey(asset.name)} xl={12} style={{width:'100%'}}>
                        <MuiLink className={classes.link}  component={Link} key={asset.link} to={asset.link}>
                            <Typography fontSize={16}  variant="subtitle1">{asset.symbol}</Typography>
                            <Typography fontWeight="fontWeightBold" variant="body1" style={{fontSize:'0.7rem'}}>{asset.name}</Typography>
                        </MuiLink>
                    </Grid>
        })

        }</React.Fragment>}
        
    </Grid>
    )
}

export default RecentlyViewedAssetsBox