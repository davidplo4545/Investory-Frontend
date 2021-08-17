import React, { useContext } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import {UserContext} from '../context/UserContext'
import { Grid, makeStyles, useTheme, Typography, Box, Card, CardContent, 
  CardActions, CardMedia, Button } from '@material-ui/core'
import logo from '../images/logo.png'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

const useStyles = makeStyles((theme) => {
  return({
      topGrid:{
        padding:theme.spacing(2),
        direction:'row',
        marginTop:'3rem',
        alignItems:'center',
        borderBottom:`1px solid ${theme.palette.text.secondary}`,
        paddingBottom:'2rem',
        '& img':{
          height:'500px',
          width:'500px',
        },
        '& h2':{
          fontSize:'4rem',
          fontFamily: 'Trocchi'
        },
        '& h2:nth-child(2)':{
          marginLeft:'5rem',
        },
        '& h2:nth-child(3)':{
          marginLeft:'10rem',
        },
        [theme.breakpoints.up('md')]: {
          spacing:theme.spacing(2),
        },
        [theme.breakpoints.down('lg')]: {
          '& img':{
            height:'400px',
            width:'350px',
          },
          direction:'column',
          marginTop:'2rem',
          marginBottom:0,
          '& h2':{
            fontSize:'3rem',
            display:'inline-block',
            margin:0,
          },
          '& h2:nth-child(2)':{
            marginLeft:'1rem',
          },
          '& h2:nth-child(3)':{
            marginLeft:'1rem',
          },
        }
      },
    formGridItem:{
      border: `1px solid ${theme.palette.primary.light}`,
      borderRadius: '10px',
      padding: theme.spacing(2),

    },
    card:{
      // color: theme.palette.primary.light,
      '& h5':{
        borderBottom: `1px solid ${theme.palette.text.primary}`,
        paddingBottom:'0.5rem',
      }
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
})
const GetStartedPage = (props) => {
    const {token} = useContext(UserContext)
    const theme = useTheme()
    const classes = useStyles()
    return (
      <Grid container direction="colmun">
        <Grid container className={classes.topGrid}>
          <Grid item md={5} sm={12} xs={12}>
            <img src={logo}/>
          </Grid>
          <Grid item md={7} sm={12} xs={12}>
            <Typography gutterBottom variant="h2"
             component="h2">
              <b>Invest,</b>
            </Typography>
            <Typography gutterBottom variant="h2"
             component="h2">
              Track
            </Typography>
            <Typography gutterBottom variant="h2"
             component="h2">
              & Compare
            </Typography>
            <Typography gutterBottom variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie ornare ex in ornare. Vivamus feugiat, justo et placerat volutpat, magna sapien vulputate erat, ut vestibulum velit dolor porttitor eros. Curabitur et ex nec lorem congue vestibulum. Mauris ultrices, velit at venenatis porttitor, quam ex molestie lorem, vulputate posuere est nulla in tellus. Pellentesque tortor massa, malesuada at lacus in, iaculis congue massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere et nulla vitae congue.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Button variant="contained" style={{marginTop:'1rem'}}>
              Get Started
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="row"
        justifyContent="space-around"
        style={{marginTop:'1rem'}}
        spacing={5}>
          <Grid item md={4} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                
                <Typography gutterBottom component="h5" variant="h5">
                  Invest <TrendingUpIcon/>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions style={{justifyContent:'flex-end', padding:'1rem'}}>
                  <Button variant="contained" color="primary">Read More</Button>
                </CardActions>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom component="h5" variant="h5">
                  Track <AssessmentIcon/>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions style={{justifyContent:'flex-end', padding:'1rem'}}>
                  <Button variant="contained" color="primary">Read More</Button>
                </CardActions>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom component="h5" variant="h5">
                    Compare <CompareArrowsIcon/>
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions style={{justifyContent:'flex-end', padding:'1rem'}}>
                  <Button variant="contained" color="primary">Read More</Button>
                </CardActions>
            </Card>
          </Grid>
        </Grid>
        {/* <Grid item className={classes.formGridItem} sm={3}>
          <RegisterForm/>
        </Grid> */}
      </Grid>
    )
  }

export default GetStartedPage