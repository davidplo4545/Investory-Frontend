import React from 'react'
import { Grid, makeStyles, Box, Typography, useTheme, Link} from '@material-ui/core'
const useStyles = makeStyles((theme) =>{
    return{
        gridItem:{
            // border: `1px solid ${theme.palette.text.secondary}`,
            padding: theme.spacing(2),
            borderRadius: '15px',
            [theme.breakpoints.down('md')]: {
                marginTop:theme.spacing(1),
                margin:'1rem',
              },
        },
    }
})

const renderText = (header, value, symbol="") =>{
    let result
    if (value)
    {
        if(isNaN(value))
            result = value
        else
        {
            if(symbol === "")
            {
                // format big numbers 100,000,000 => 100M
                if(value >= 10 ** 6 && value < 10 ** 9)
                    result = `${(value/10 ** 6).toFixed(2)}M`
                else if(value >= 10 ** 9 && value < 10 ** 12)
                    result = `${(value/10 ** 9).toFixed(2)}B`
                else if(value >= 10 ** 12)
                    result = `${(value/10 ** 12).toFixed(2)}T`
                else
                    result = `${(value).toFixed(2)}`
            }
            else
                result = `${value.toFixed(2)}${symbol}`
        }
            
        return(
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {header}: <b>{result ? result : ""}</b>
            </Typography>
        )
    }
    return <Typography variant="body2" color="textSecondary" gutterBottom/>
}

const StockDataBox = ({asset}) =>{
    const classes = useStyles()
    const theme = useTheme()
    return(
        <Grid container item justifyContent="space-between"
            alignItems={'stretch'}>
            <Grid item xs={12} md={12} lg={3} className={classes.gridItem}>
                <Box>
                    <Box>
                    <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>General:</Typography>
                        {renderText("Type", asset.type)}
                        {renderText("Location", asset.location)}
                        {renderText("Sector", asset.sector)}
                        {renderText("Industry", asset.industry)}
                        {renderText("Website", asset.website_url)}
                        {renderText("Full Time Employees", asset.fulltime_employees)}
                    </Box>
                    <Box>
                        <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>Valuation:</Typography>
                        {renderText("Market Cap", asset.market_cap)}
                        {renderText("52-Week High", asset.one_year_high)}
                        {renderText("52-Week Low", asset.one_year_low)}
                        {renderText("Trailing P/S", asset.ps_ratio)}
                        {renderText("Revenue Growth",asset.revenue_growth, "%")}
                        {renderText("Trailing P/E", asset.trailing_pe)}
                        {renderText("Forward P/E", asset.forward_pe)}
                        {renderText("PEG Ratio", asset.peg_ratio)}
                        {renderText("Book Value", asset.book_value)}
                        {renderText("Price to Book", asset.price_to_book)}
                        {renderText("Current Ratio", asset.current_ratio)}
                        {renderText("EV", asset.enterprise_value)}
                    </Box>

                </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={6} className={classes.gridItem}>
                <Box>
                    <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>Description:</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>{asset.business_summary}</Typography>
                    
                </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={3} className={classes.gridItem}>
                <Box>
                <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>Returns:</Typography>
                {renderText("3 Month", asset.three_month_return, "%")}
                {renderText("6 Month", asset.six_month_return, "%")}
                {renderText("YTD", asset.ytd_return, "%")}
                {renderText("1 Year", asset.one_year_return, "%")}
                {renderText("3 Year", asset.three_year_return, "%")}
                <Typography variant="h6" color="textPrimary" style={{borderBottom: `1px solid ${theme.palette.text.primary}`}} gutterBottom>Analysis:</Typography>
                {renderText("Analysts Number", asset.num_of_analysts)}
                {renderText("Mean Analyst Price", asset.mean_analyst_price, '$')}
            </Box>
            </Grid>
    </Grid>
    )
}

export default StockDataBox