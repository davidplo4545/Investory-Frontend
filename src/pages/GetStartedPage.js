import React, {  useState } from 'react'
import RegisterDialogForm from '../components/forms/RegisterDialogForm'
import { Grid, makeStyles,  Typography,  Card, CardContent, 
   Button } from '@material-ui/core'
import mainImg from '../images/mainImg.jpg'
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
          fontSize:'5rem',
          fontFamily: 'Cabin Sketch'
        },
        '& h2:nth-child(2)':{
          marginLeft:'5rem',
        },
        '& h2:nth-child(3)':{
          marginLeft:'17rem',
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
      paddingBottom: '3rem',
      height:'250px',
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
const GetStartedPage = () => {
    const classes = useStyles()
    const [isRegisterDialog, setIsRegisterDialog] = useState(false);
  
    return (
      <Grid container direction="colmun">
        <RegisterDialogForm isRegisterDialog={isRegisterDialog}
        setIsRegisterDialog={setIsRegisterDialog}/>
        <Grid container className={classes.topGrid}>
          <Grid item md={6} sm={12} xs={12}>
            <img alt="main-img" src={mainImg}/>
          </Grid>
          <Grid className="site-description" item md={6} sm={12} xs={12}>
            <Typography gutterBottom variant="h2" color="textPrimary"
             component="h2">
              <b>Track,</b>
            </Typography>
            <Typography gutterBottom variant="h2" color="textPrimary"
             component="h2">
              Compare
            </Typography>
            <Typography gutterBottom variant="h2" color="textPrimary"
             component="h2">
              & Share
            </Typography>
            <Typography gutterBottom variant="body1" color="textSecondary">
            </Typography>
            <Button variant="contained" 
            style={{marginTop:'1rem'}} 
            color="primary"
            onClick={() => setIsRegisterDialog(!isRegisterDialog)}>
              Get Started
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="row"
        justifyContent="space-around"
        style={{marginTop:'0.3rem'}}
        spacing={5}>
          <Grid item md={4} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                
                <Typography gutterBottom component="h5" variant="h5" color="textPrimary">
                  Track <TrendingUpIcon/>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Easily track your favorite equities: <b>cryptos, stocks and ETFs</b>.
                  <br/>Follow your entire portfolio lifetime and manage your returns.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom component="h5" variant="h5" color="textPrimary">
                    Compare <AssessmentIcon/>
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Compare your portfolio to any asset, from the most popular ones
                    such as: <b>QQQ, SPY</b>, to the least popular ones like small-caps and cryptos.
                  </Typography>
                </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom component="h5" variant="h5" color="textPrimary">
                  Share <CompareArrowsIcon/>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Let your friends see how your portfolio is doing (you can keep it
                  private as well).
                  <br/>
                  Share your portfolios highs, lows, and any new investment ideas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }

export default GetStartedPage