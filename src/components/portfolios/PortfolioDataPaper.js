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
    return(
        <Paper className={classes.returnsPaper}>
            <Typography gutterBottom style={{
                borderBottom: `1px solid ${theme.palette.secondary.light}`}} 
            variant="h5" color="textSecondary">Portfolio Returns:</Typography>
            <Grid container>
                <Grid item xs={6} style={{borderRight:`1px solid ${theme.palette.secondary.dark}`}}>
                    <Typography gutterBottom variant="body2" component="h2">
                        1 Month:
                        <Typography variant="body2" className={classes.resultTypo}>
                            56%
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h2" >
                        3 Month:
                        <Typography variant="body2" className={classes.resultTypo}>
                            56%
                        </Typography>
                        </Typography>
                    <Typography gutterBottom variant="body2" component="h2">
                        6 Month:
                        <Typography variant="body2" className={classes.resultTypo}>
                            56%
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h2"> 
                        YTD:
                        <Typography variant="body2" className={classes.resultTypo}>
                            56%
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h2">
                        1 Year:
                        <Typography variant="body2" className={classes.resultTypo}>
                            56%
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h2">
                        3 Year: 
                        <Typography variant="body2" className={classes.resultTypo}>
                            56%
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{paddingLeft:'1rem'}}>
                    <Typography gutterBottom variant="body2" component="h2">
                        Realized Gain/Loss:
                        <Typography variant="body2" className={classes.resultTypo}>
                            {formatNumber(portfolio.realized_gain, "USD", true)}
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h2">
                        Unrealized Gain/Loss:
                        <Typography variant="body2" className={classes.resultTypo}>
                            {formatNumber(portfolio.gain, "USD", true)}
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h2">
                        Total Gain/Loss:
                        <Typography variant="body2" className={classes.resultTypo}>
                            {formatNumber(portfolio.gain + portfolio.realized_gain, "USD", true)}
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default PortfolioDataPaper