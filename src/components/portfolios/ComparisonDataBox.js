import React from 'react'
import {Link} from 'react-router-dom';
import {  Grid, makeStyles, Box, Typography, Link as MuiLink } from '@material-ui/core';
import { formatNumber } from '../base/helpers';
const useStyles = makeStyles((theme) =>{
    return({
        resultsGrid:{
            '& .MuiBox-root':{
                padding: '1rem',
            },
            '& a:hover':{
                textDecoration:'none',
            },
            '& h2':{
                textDecoration:'none',
                fontWeight:'bold',
                color: theme.palette.text.primary,
                borderBottom: `1px solid ${theme.palette.text.secondary}`,
                '&:hover':{
                    color:theme.palette.text.secondary,
                }
            },
            '& p':{
                color: theme.palette.text.secondary,
            }
        }
    })
})
const ComparisonDataBox = ({portfolio, comparedAsset, comparedAssetPortfolio}) =>{
    const classes = useStyles()

    return(
    <Box>
        <Grid container 
        className={classes.resultsGrid}
        justifyContent="space-between"
        direction="row">
            <Grid item xs={12} md={4}>
                <Box>
                    <MuiLink component={Link} to={`/portfolios/${portfolio.id}`}>
                        <Typography variant="subtitle1" 
                        component="h2">
                            {portfolio.name}
                        </Typography>
                    </MuiLink>
                    <Typography gutterBottom style={{marginTop:'0.5rem'}} variant="body2">
                        Total Value: <b>{formatNumber(portfolio.total_value)}</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Total Cost: <b>{formatNumber(portfolio.total_cost)}</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Return: <b>{portfolio.return.toFixed(2)}%</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Unrealized Gain: <b>{formatNumber(portfolio.gain)}</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Realized Gain: <b>{formatNumber(portfolio.realized_gain)}</b>
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                {comparedAsset &&
                <Box>
                    <MuiLink component={Link} to={`/asset/${comparedAsset.id}`}>
                        <Typography variant="subtitle1" component="h2">
                            {comparedAsset.name}
                        </Typography>
                    </MuiLink>
                    <Typography gutterBottom style={{marginTop:'0.5rem'}} variant="body2">
                        Total Value: <b>{formatNumber(comparedAssetPortfolio.total_value)}</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Total Cost: <b>{formatNumber(comparedAssetPortfolio.total_cost)}</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                    Return: <b>{comparedAssetPortfolio.return.toFixed(2)}%</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Unrealized Gain: <b>{formatNumber(comparedAssetPortfolio.gain)}</b>
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        Realized Gain: <b>{formatNumber(comparedAssetPortfolio.realized_gain)}</b>
                    </Typography>
                </Box>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                <Box>
                {portfolio.total_gain > comparedAssetPortfolio.total_gain ?
                    <Typography gutterBottom variant="subtitle1" component="h2">You Won!</Typography>:
                    <Typography gutterBottom variant="subtitle1" component="h2">You Lost!</Typography>
                }
                    {portfolio.total_gain > comparedAssetPortfolio.total_gain ?
                        <Typography variant="body2">
                            <b>Congragulations!</b> <br/>Your portfolio has beaten: <br/> <b>{comparedAsset.name}</b>.
                        </Typography>:
                        <Typography variant="body2">
                            <b>Ouch!</b> <br/> You would've been better of investing in:<br/> <b>{comparedAsset.name}</b> <br/> instead of your portfolio.   
                        </Typography>
                    }
                </Box>
            </Grid>
        </Grid>
    </Box>
    )
}

export default ComparisonDataBox;