import React, { useContext } from 'react'
import LoginForm from '../components/forms/LoginForm'
import '../components/forms/login.css'
import {UserContext} from '../context/UserContext'
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) =>{
  return({
    paper:{
      padding:'2rem',
      height:'100%'
    }
  })
})
const SignInPage = () => {
  const classes = useStyles()

  return (
    <Grid container style={{width:'100%', paddingTop:'3rem',height:'100%'}} flexDirection="row">
      <Grid item sm={8}>
        <Typography variant="h2">Invest, Track & Compare</Typography>
      </Grid>
      <Grid item sm={4}>
        <Paper elevation={11}
        className={classes.paper}>
        <LoginForm/>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SignInPage