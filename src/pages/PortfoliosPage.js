import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { getAllPortfolios, deletePortfolio } from '../api/portfolios'
import HoldingsPieChart from '../components/charts/HoldingsPieChart'
import { Grid,Box, Card, Button, CardContent, Typography, Link as MuiLink,
     CardActions, makeStyles, CardMedia, useTheme, useMediaQuery,
    Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle } from '@material-ui/core'
import { Link, useHistory } from "react-router-dom";
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) =>{
    return({
        btn:{
            borderRadius:'30px',
            width: '200px',
            height: '200px',
            padding: theme.spacing(3)
        },
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
const PortfoliosPage = () =>{
    const user = useContext(UserContext)
    let history = useHistory()
    const [portfolios, setPortfolios] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null)
    const theme = useTheme();
    useEffect(() => {
        getAllPortfolios(user.token, setPortfolios)
    },[])
    const navigateToPortfolioCreate = () =>{
        history.push({
            pathname: `/portfolio-create`,
            state: {portfolio:null}
        })
    }

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

    const handlePortfolioDelete = () =>{
        deletePortfolio(
            user.token, selectedPortfolio.id, portfolios, setPortfolios
        )
        console.log('portfolio deleted.')
        setOpen(!open)
    }

    

    const LargetHoldingsList= ({portfolio}) =>{
        const largestHoldings = portfolio.holdings.filter((holding) => holding.percentage > 20)

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

    const handleDialogShow = (portfolio) =>{
        setSelectedPortfolio(portfolio)
        setOpen(!open)
    }
    
    const numberFormatter = new Intl.NumberFormat('en-US',  {style: 'currency', currency: 'USD'})
    const classes = useStyles()
    return (
    <Grid container spacing={3} justifyContent="center" style={{marginTop:'0.5rem'}}>
        {portfolios.map((portfolio) =>{
            return(
            <Grid item key={portfolio.id}>
                <Card elevation={2} style={{background:'transparent', width: "100%", height:"auto"}}>
                    <CardMedia>
                        <HoldingsPieChart portfolio={portfolio} 
                        isSingle={true}
                        width={350}
                        height={230}
                        innerRadius={60} 
                        outerRadius={100}
                        cx={'50%'}
                        cy={'50%'}/>
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
                            Value: {`${numberFormatter.format(portfolio.total_value)}`} 
                        </Typography>
                        <Typography variant="body1" style={{display:'inline-block', marginLeft:'0.3rem', color: portfolio.return < 0 ? '#E27D60' : '#379683'}}>
                             ({portfolio.return < 0 ? `-${numberFormatter.format(portfolio.gain)}$` : `+${numberFormatter.format(portfolio.gain)}`})

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
            </Grid>
            ) 
        })}
        <Grid item  >
            <Grid container style={{width: "374px", height:"401px"}} alignItems="center" justifyContent="center">
                <Grid item>
                    <Box>
                        <Button className={classes.btn} variant="contained" color="primary" onClick={navigateToPortfolioCreate} endIcon={<AddBoxIcon style={{ fontSize: 40 }}/>}>
                            Add New portfolio
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        <Dialog
            open={open}
            onClose={() => handleDialogShow(null)}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Once you delete this portfolio, you wouldn't be able to restore it.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handlePortfolioDelete} className={classes.deleteBtn}>
                Delete
            </Button>
            <Button onClick={() => setOpen(!open)} variant="contained" color="primary" autoFocus style={{background:theme.palette.primary.text}}>
                Go Back
            </Button>
            </DialogActions>
        </Dialog>
    </Grid>
    )
}

export default PortfoliosPage