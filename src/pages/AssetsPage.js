import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import {getAllAssets} from '../api/assets.js'
import AssetTable from '../components/tables/AssetTable'
import RightSidebarData from '../components/assets/RightSidebarData'
import { Grid, Box, makeStyles } from '@material-ui/core'

const useStyles =  makeStyles((theme) => ({
    grid:{
      width: "100%",
      [theme.breakpoints.down('sm')]: {
        flexDirection:'column'
      },
      [theme.breakpoints.up('md')]: {
        flexDirection:'column'
  
      },
      [theme.breakpoints.up('lg')]: {
        flexDirection:'row',
        justifyContent:'space-between',
        width: "100%",  
      },
    },
    
  }));

const AssetsPage = ({match}) =>{
    const assetType = match.params.assetType
    const user = useContext(UserContext)
    const [assets, setAssets] = useState([])
    const [isValid, setIsValid] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        if (assetType !== "us" && assetType !== "isr" && assetType !== "crypto")
            setIsValid(false)
        else
            {
                setIsValid(true)
                getAllAssets(user.token,assetType,setAssets)
            }
      },[assetType]);

    return(
        <Grid container className={classes.grid}>
            <Grid item xl={9} sm={12} style={{width: '100%', flex:1}}>
                {isValid ?
                    <AssetTable assetType={assetType} assets={assets}/>
                    :
                    <div>Not Valid</div>
                }
            </Grid>
            <Grid item xl={3} sm={12}>
                <RightSidebarData isSingleAsset={false} asset={null}/>
            </Grid>
        </Grid>
        
    )
}

export default AssetsPage