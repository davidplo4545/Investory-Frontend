import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { getAllPortfolios, deletePortfolio } from '../api/portfolios'
import { Grid,Box, Button, makeStyles} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PortfolioCard from '../components/portfolios/PortfolioCard'
import PortfolioDeleteDialog from '../components/portfolios/PortfolioDeleteDialog'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>{
    return({
        btn:{
            borderRadius:'30px',
            width: '200px',
            height: '200px',
            padding: theme.spacing(3)
        },

    })
})
const PortfoliosPage = () =>{
    const user = useContext(UserContext)
    const [portfolios, setPortfolios] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null)
    const history = useHistory()
    useEffect(() => {
        getAllPortfolios(user.token, setPortfolios)
    },[user.token])


    const handleDialogShow = (portfolio) =>{
        setSelectedPortfolio(portfolio)
        setOpen(!open)
    }

    const navigateToPortfolioCreate = () =>{
        history.push({
            pathname: `/portfolio-create`,
            state: {portfolio:null}
        })
    }

    const handlePortfolioDelete = () =>{
        deletePortfolio(
            user.token, selectedPortfolio.id, portfolios, setPortfolios
        )
        setOpen(!open)
    }
    
    const classes = useStyles()
    return (
    <Grid container spacing={3} 
    justifyContent="center" 
    style={{marginTop:'0.5rem'}}>
        {portfolios.map((portfolio) =>{
            return(
            <Grid item key={portfolio.id}>
                <PortfolioCard portfolio={portfolio}
                handleDialogShow={handleDialogShow}/>
            </Grid>
            ) 
        })}
        <Grid item  >
            <Grid container style={{width: "374px", height:"401px"}} 
            alignItems="center" 
            justifyContent="center">
                <Grid item>
                    <Box>
                        <Button className={classes.btn} 
                        variant="contained" color="primary" 
                        onClick={navigateToPortfolioCreate} 
                        endIcon={<AddBoxIcon style={{ fontSize: 40 }}/>}>
                            Add New portfolio
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        <PortfolioDeleteDialog handleDialogShow={handleDialogShow}
        handlePortfolioDelete={handlePortfolioDelete}
        open={open}/>
    </Grid>
    )
}

export default PortfoliosPage