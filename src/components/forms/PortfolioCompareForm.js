import React, {useState} from 'react'
import CompareIcon from '@material-ui/icons/Compare';
import { Grid, Button, makeStyles } from '@material-ui/core';
import AutoCompleteAsync from './AutoCompleteAsync';

const useStyles = makeStyles((theme) =>{
    return({
        chooseAssetForm:{
            flexDirection:'row',
            alignItems:"stretch", 
            justifyContent:"space-between",
            marginTop:'2rem',
            [theme.breakpoints.down('md')]: {
                flexDirection:'column',
                alignItems:"center", 
                justifyContent:'center',
                '& .MuiAutocomplete-root, .MuiButton-root':{
                    marginBottom:'1rem',
                }
                
           },
        },
    })
})
const PortfolioCompareForm = ({selectedAsset, setSelectedAsset, comparePortfolioToAsset}) =>{
    const [queriedAssets, setQueriedAssets] = useState([])

    const classes = useStyles()

    return(
        <Grid item container 
        spacing={3}
        className={classes.chooseAssetForm}>
            <AutoCompleteAsync queriedAssets={queriedAssets}
            setQueriedAssets={setQueriedAssets}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            width={250}/>

            <Button variant="contained" 
            color="secondary" 
            onClick={comparePortfolioToAsset}
            endIcon={<CompareIcon/>}
            type="submit">Compare</Button>
        </Grid>
    )
}
export default PortfolioCompareForm