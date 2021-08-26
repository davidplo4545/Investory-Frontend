import React from 'react'
import { makeStyles, Paper, Grid, Typography, useTheme } from '@material-ui/core'
import { formatNumber } from '../base/helpers'
const useStyles = makeStyles((theme) =>{
    return({
        returnsPaper:{
            padding:'2rem',
            height:'100%',
            [theme.breakpoints.down('sm')]: {
                border:'none',
            }
        },
    })
})
const PortfolioDataPaper = ({portfolio}) =>{
    const theme = useTheme()
    const classes = useStyles()

    const renderText = (header, number, hasSymbol=true) =>{

        if(!hasSymbol)
            return(
                <Typography gutterBottom 
                variant="body2" 
                component="h2"
                color="textSecondary">
                        {header}:
                        <b>{number.toFixed(0)}</b>
                </Typography>
            )
        return(
            <Typography gutterBottom 
            variant="body2" 
            component="h2"
            color="textSecondary">
                    {header}:
                    <b>{formatNumber(number, "USD", true)}</b>
            </Typography>
        )
    }
    return(
        <Paper className={classes.returnsPaper}>
            <Typography gutterBottom style={{
                borderBottom: `1px solid ${theme.palette.secondary.light}`}} 
            variant="h5" color="textSecondary">Portfolio Returns:</Typography>
            <Grid container>
                <Grid item xs={6} style={{borderRight:`1px solid ${theme.palette.secondary.dark}`}}>
                    {renderText("Current Value", portfolio.total_value)}
                    {renderText("Total Cost", portfolio.total_cost)}
                    {renderText("No. of Holdings", portfolio.holdings.length, false)}
                </Grid>
                <Grid item xs={6} style={{paddingLeft:'1rem'}}>
                    {renderText("Realized Gain/Loss", portfolio.realized_gain)}
                    {renderText("Unrealized Gain/Loss", portfolio.gain)}
                    {renderText("Total Gain/Loss", portfolio.gain + portfolio.realized_gain)}
                    
                </Grid>
            </Grid>
        </Paper>
    )
}

export default PortfolioDataPaper