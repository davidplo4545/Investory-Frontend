import React, { useContext } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import {UserContext} from '../context/UserContext'
import { Grid, makeStyles, useTheme, Typography, Box, Card, CardContent, 
  CardActions, CardMedia, Button } from '@material-ui/core'
import logo from '../images/logo1.jpg'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

const useStyles = makeStyles((theme) => {
  return({
      topGrid:{
        padding:theme.spacing(2),
        direction:'row',
        marginTop:'1rem',
        alignItems:'center',
        borderBottom:`1px solid ${theme.palette.text.secondary}`,
        paddingBottom:'3rem',
        '& img':{
          height:'500px',
          width:'650px',
          background: theme.palette.text.secondary,
          borderRadius: '15px',
          padding: '0.3rem',
          [theme.breakpoints.down('lg')]:{
            height:'400px',
            width:'430px',
          },
          [theme.breakpoints.between('xs', 'sm')]: {
            
              height:'300px',
              width:'350px',
              border: 'none',
              padding:'0.2rem',
            
          },
        },
        '& h2':{
          fontSize:'4rem',
          fontFamily: 'Cabin Sketch'
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
        [theme.breakpoints.down('md')]: {
          direction:'column',
          marginTop:'2rem',
          marginBottom:0,
          '& .site-description':{
            marginTop:'2rem',
          }, 
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
          <Grid item md={6} sm={12} xs={12}>
            <img src={logo}/>
          </Grid>
          <Grid className="site-description" item md={6} sm={12} xs={12}>
            <Typography gutterBottom variant="h2" color="textPrimary"
             component="h2">
              <b>Invest,</b>
            </Typography>
            <Typography gutterBottom variant="h2" color="textPrimary"
             component="h2">
              Track
            </Typography>
            <Typography gutterBottom variant="h2" color="textPrimary"
             component="h2">
              & Compare
            </Typography>
            <Typography gutterBottom variant="body1" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie ornare ex in ornare. Vivamus feugiat, justo et placerat volutpat, magna sapien vulputate erat, ut vestibulum velit dolor porttitor eros. Curabitur et ex nec lorem congue vestibulum. Mauris ultrices, velit at venenatis porttitor, quam ex molestie lorem, vulputate posuere est nulla in tellus. Pellentesque tortor massa, malesuada at lacus in, iaculis congue massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere et nulla vitae congue.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Button variant="contained" style={{marginTop:'1rem'}} color="primary">
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
                
                <Typography gutterBottom component="h5" variant="h5" color="textPrimary">
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
                <Typography gutterBottom component="h5" variant="h5" color="textPrimary">
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
                  <Typography gutterBottom component="h5" variant="h5" color="textPrimary">
                    Compare <CompareArrowsIcon/>
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions style={{justifyContent:'flex-end', padding:'1rem'}}>
                  <Button variant="contained" color="primary">
                    Read More
                  </Button>
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