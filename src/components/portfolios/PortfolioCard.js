import React from 'react'
import HoldingsPieChart from '../charts/HoldingsPieChart'
import { Card, Button, CardContent, Typography, Link as MuiLink, Box,
     CardActions, makeStyles, CardMedia } from '@material-ui/core'
import { formatNumber } from '../base/helpers'
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>{
    return({
        actionBtn:{
            background:theme.palette.warning.light,
            '&:hover':{
                background:theme.palette.warning.dark,
            }
        },
        holdingLink: {
            '&:hover':{
                color: theme.palette.primary.main,
                fontWeight:'bold',
            }
        },
        portfolioLink:{
            transition: 'all ease-in 0.3s',
            '&:hover':{
                textDecoration:'none',
                color: theme.palette.type === 'light' ? theme.palette.primary.light:
                theme.palette.secondary.light,
            }
        },
        deleteBtn:{
            color:'#fff',
            background: theme.palette.error.main,
            '&:hover':{
                background: theme.palette.error.dark,
            }
        }
    })
})

const PortfolioCard = ({portfolio, handleDialogShow}) =>{
    const classes = useStyles()
    const history = useHistory()



    const navigateToPortfolioCompare = (portfolioId) =>{
        history.push({
            pathname: `/portfolios/${portfolioId}/compare`,
        })
    }


    const navigateToPortfolio = (id) =>{
        history.push({
            pathname: `/portfolios/${id}`,
        })
    }
    console.log(portfolio)
    return(
        <Card elevation={2} style={{background:'transparent', width: "100%", height:"auto"}}>
                    <CardMedia>
                        {portfolio.holdings.length ? 
                        <HoldingsPieChart portfolio={portfolio} 
                        isSingle={true}
                        width={350}
                        height={230}
                        innerRadius={60} 
                        outerRadius={100}
                        cx={'50%'}
                        cy={'50%'}/> 
                        :

                        <Box style={{background:'transparent', width:350, height:230,
                        display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Typography variant="h5">Portfolio has no holdings</Typography>
                        </Box>
                        }
                    </CardMedia>
                    <CardContent>
                        <MuiLink className={classes.portfolioLink} color="textPrimary" component={Link} to={`/portfolios/${portfolio.id}`}>
                            <Typography gutterBottom className={classes.portfolioLink}
                            style={{fontWeight: 700, fontFamily:'Cabin Sketch, cursive'}} 
                            variant="h6"
                            component="h2">
                                {portfolio.name}
                            </Typography>
                        </MuiLink>
                        <Typography  color="textSecondary" style={{display:'inline-block', fontWeight:600}} variant="body1" component="h2">
                            Value: {`${formatNumber(portfolio.total_value)}`} 
                        </Typography>
                        <Typography variant="body1" style={{display:'inline-block', marginLeft:'0.3rem', color: portfolio.return < 0 ? '#E27D60' : '#379683'}}>
                             ({portfolio.return < 0 ? `${formatNumber(portfolio.gain)}` : `+${formatNumber(portfolio.gain)}`})

                        </Typography>
                        <LargetHoldingsList portfolio={portfolio}/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => navigateToPortfolio(portfolio.id)}>
                            View
                        </Button>
                        <Button variant="contained" className={classes.actionBtn} onClick={() => navigateToPortfolioCompare(portfolio.id)}>
                            Compare
                        </Button>
                        <Button variant="contained" className={classes.deleteBtn}
                         onClick={() => handleDialogShow(portfolio)}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
    )
}

const LargetHoldingsList= ({portfolio}) =>{
    const largestHoldings = portfolio.holdings.filter((holding) => holding.percentage > 20)
    const classes = useStyles()
    return (
        <Typography color="textSecondary" variant="body1" component="h2">
        Largest Holdings:
            <Typography variant="body1" style={{display:'inline-block'}}>
            {largestHoldings.map((holding, index) =>{
                const {id, symbol} = holding.asset
                return(index === 0 ?
                    <MuiLink key={holding.id} className={classes.holdingLink} component={Link} to={`/asset/${id}`}>{symbol}</MuiLink>:
                    <MuiLink key={holding.id} className={classes.holdingLink} component={Link} to={`/asset/${id}`}>,{symbol}</MuiLink>)
            })}
            </Typography>
        </Typography>
       
    )
}

export default PortfolioCard