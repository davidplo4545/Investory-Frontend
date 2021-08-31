import React, {useState, useEffect, useContext} from 'react'
import { Box, Link as MuiLink, Typography, useTheme, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'

const useStyles = makeStyles((theme) =>{
    return ({
        link:{
            color:theme.palette.text.primary,
            '&:hover':{
                textDecoration:'none',
                color: theme.palette.secondary.dark,
                background:'white',
            }
        }
    })
})

const PortfoliosInList = ({assetId}) =>{
    const [portfoliosIn, setPortfoliosIn] = useState([])
    const user = useContext(UserContext)
    const theme = useTheme()
    const classes = useStyles()

    useEffect(() => {
        const domain = "http://localhost:8000/api"
        const getPortfoliosIn = async () =>{
            await axios.get(`${domain}/assets/${assetId}/portfolios_in/`,{
            headers:{
                'Authorization': `Token ${user.token}`
            }
        })
        .then((res) => setPortfoliosIn(res.data))
        .catch((error) => setPortfoliosIn([]))
    }
        getPortfoliosIn()
    }, [assetId])
    return (
    <React.Fragment>
        {portfoliosIn.length ?
            <Box>
                <Typography variant="h6" gutterBottom   
                style={{borderBottom:`1px solid ${theme.palette.text.primary}`,
                width:'100%'}}>
                    Portfolios In:
                </Typography>
                {portfoliosIn.map((portfolio) =>
                    <MuiLink component={Link}
                    className={classes.link}
                    key={portfolio.id}
                    to={`/portfolios/${portfolio.id}`}>
                        <Typography variant="body2" gutterBottom>
                            {portfolio.name}
                        </Typography>
                    </MuiLink>
                    )}
            </Box> :
            <Box/>
        }   
    </React.Fragment>
    )}

export default PortfoliosInList