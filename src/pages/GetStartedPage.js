import React, { useContext } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import {UserContext} from '../context/UserContext'
import { Grid, makeStyles, useTheme } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return({
    formGridItem:{
      border: `1px solid ${theme.palette.primary.light}`,
      borderRadius: '10px',
      marginTop:'5rem',
      padding: theme.spacing(2),

    }
  })
})
const GetStartedPage = (props) => {
    const {token} = useContext(UserContext)
    const theme = useTheme()
    const classes = useStyles()
    return (
      <Grid container direction="row">
        <Grid item sm={9}>

        </Grid>
        <Grid item className={classes.formGridItem} sm={3}>
          <RegisterForm/>
        </Grid>
      </Grid>
    )
  }

export default GetStartedPage