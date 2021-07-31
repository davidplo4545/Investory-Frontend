import { Grid, Typography } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import {Link as MuiLink, makeStyles}  from '@material-ui/core';

const useStyles = makeStyles((theme) =>{
    return ({
        link:{
            fontWeight:'bold',
            textDecoration:'none',
            '&:hover':{
                textDecoration:'none',
            }
        },
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
            direction="column"
            alignItems="flex-start">
        <Typography variant="h6">Recently viewed tickers:</Typography>
        {recentlyViewedAssets.map((asset) => {
            return <Grid item key={generateKey(asset.name)} xl={12} style={{width:'100%'}}>
                        <MuiLink className={classes.link} component={Link} key={asset.link} to={asset.link}>
                            <Typography color="primary" variant="subtitle1" style={{fontSize: '1rem'}}>{asset.symbol}</Typography>
                            <Typography color="primary" variant="body2" style={{fontSize:'0.7rem'}}>{asset.name}</Typography>
                        </MuiLink>
                    </Grid>
        })

        }
    </Grid>
    )
}

export default RecentlyViewedAssetsBox