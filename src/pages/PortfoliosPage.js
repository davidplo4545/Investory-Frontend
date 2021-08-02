import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { getAllPortfolios } from '../api/portfolios'
import './portfolios.css'
import HoldingsPieChart from '../components/charts/HoldingsPieChart'
import { Grid,Paper, Card, Button, CardContent, Typography, CardActions, CardHeader, CardMedia } from '@material-ui/core'
import { Link, useHistory } from "react-router-dom";

const PortfoliosPage = () =>{
    const user = useContext(UserContext)
    let history = useHistory()
    const [portfolios, setPortfolios] = useState([])
    useEffect(() => {
        getAllPortfolios(user.token, setPortfolios)
    },[])
    
    const navigateToPortfolioCreate = () =>{
        history.push({
            pathname: `/portfolio-create`,
            state: {portfolio:null}
        })
    }

    const navigateToPortfolio = (id) =>{
        history.push({
            pathname: `/portfolios/${id}`,
        })
    }
    return (
        <div className="portfolios-page">
            <h1>Your Portfolios :</h1>
            <Grid container spacing={3} >
                {portfolios.map((portfolio) =>{
                    return(
                    <Grid item key={portfolio.id}>
                        <Card elevation={2} style={{background:'transparent'}}>
                            <CardMedia>
                                <HoldingsPieChart portfolio={portfolio} 
                                width={350}
                                height={230}
                                innerRadius={60} 
                                outerRadius={100}
                                cx={175}
                                cy={120}/>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom color="textPrimary" variant="h6" component="h2">
                                        {portfolio.name}
                                    </Typography>
                                <Typography  color="primary" variant="body1" component="h2">
                                    Holdings:
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => navigateToPortfolio(portfolio.id)}>
                                    View
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    ) 
                })
                }
                <Paper className="add-portfolio-wrapper">
                    <div className="add-portfolio-box">
                        <Button onClick={navigateToPortfolioCreate}>
                            Add new portfolio +
                        </Button>
                    </div>
                </Paper>
            </Grid>

        </div>
    )
}

export default PortfoliosPage