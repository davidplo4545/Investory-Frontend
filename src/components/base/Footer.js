import React from 'react'
import { Container, Grid,Box, Link, Typography, makeStyles, useTheme } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import lightThemeLogo from '../../images/light_logo.png'
import darkThemeLogo from '../../images/dark_logo.png'

const useStyles = makeStyles((theme) =>{
    return({
        root:{
            padding:'1.5rem',
            '& h5, a, p':{
                color: theme.palette.type === "light" ?
                "#fff" : '#424242',
                '&:hover':{
                    opacity:0.9    
                }
            },
            [theme.breakpoints.down('sm')]: {
                direction:'column',
                alignItems:'center',
                justifyContent:'center',
                '& .MuiBox-root':{
                    marginBottom:'1rem',
                    justifyContent:'center',
                }
            }
        },
        gridItem:{
            display:'flex',
            justifyContent:'flex-end',
            alignItems:'center',
            [theme.breakpoints.down('sm')]: {
                justifyContent:'center',
            }
        }
    })
})
const Footer = ({isTheme, setIsTheme}) =>{
    const theme = useTheme()
    const classes = useStyles()
    return(
        <footer style={{}}>
            <Box bgcolor="text.primary" 
            color="common.black" 
            style={{marginTop:'3rem', width:'100%'}}>
                <Container maxWidth="lg" >
                    <Grid container color="textPrimary"
                        justifyContent="space-between"
                        className={classes.root}>
                        <Grid item xs={12} sm={6} >
                            <Box style={{display:'flex', alignItems:'center'}}>
                                {theme.palette.type === 'light'?
                                <img alt="light-logo" src={darkThemeLogo} style={{height:'25px', width:'25px', marginRight:'0.4rem'}}/>:
                                <img alt="dark-logo" src={lightThemeLogo} style={{height:'25px', width:'25px', marginRight:'0.4rem'}}/>
                                }
                                <Typography variant="h5"
                                style={{fontFamily:'Cabin Sketch'}}>
                                    Investory
                                </Typography>
                                <Link href="https://github.com/davidplo4545"
                                style={{marginLeft:'1rem'}}>
                                    <GitHubIcon
                                    fontSize="medium"/>
                                </Link>
                                <Link href="http://www.google.com"
                                style={{marginLeft:'1rem'}}>
                                    <LinkedInIcon fontSize="medium" />
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item container xs={12} sm={6}
                        className={classes.gridItem}>
                            <Box>
                                <Typography variant="body2">
                                    <b>Copyright@ 2021 Investory. All right reserved.</b>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    )
}

export default Footer