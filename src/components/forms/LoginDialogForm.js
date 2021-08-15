import React, {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import {Dialog, DialogContent,
     Button, makeStyles, TextField, Typography, Grid, Avatar, useTheme } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router'
import axios from 'axios'

const useStyles = makeStyles((theme) =>{
    return({
        loginGrid:{
            height:'500px',
            width:'300px',
            // background:'#fff',
            padding: theme.spacing(2),
        },
        loginForm:{

        }
    })
})
const LoginDialogForm = ({isLoginDialog, setIsLoginDialog}) =>{
    const classes = useStyles()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const {setToken} = useContext(UserContext)
    const theme = useTheme()
    const history = useHistory()

    const handleDialogShow = () =>{
        setIsLoginDialog(!isLoginDialog)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/login/',{
            'email':email,
            'password':password,
        })
        .then((res) => {
            setToken(res['data']['key']);
            setIsLoginDialog(false)
            setError("")
            setEmail("")
            setPassword("")
            history.push({
                pathname:`/portfolios`,
            })
        })
        .catch((error) =>
        {
            setError(`Username or password are incorrect.`)
        })
    }

    return(
        <Dialog
            open={isLoginDialog}
            onClose={() => handleDialogShow()}
            aria-labelledby="responsive-dialog-title">
            <Grid container direction="column" 
            alignItems="center" 
            className={classes.loginGrid}>
                <Avatar style={{marginBottom:'1rem', background:theme.palette.primary.light}}
                 color="primary">
                     <LockOutlined />
                </Avatar>
                <Typography gutterBottom color="primary" variant="h5">
                    <b>Sign In</b>
                </Typography>
            <DialogContent>
                <form style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}
                onSubmit={handleSubmit}>
                    <TextField label="Email"
                    type="email"
                    style={{marginBottom:'0.5rem'}}
                    placeholder="Enter email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} required />
                    <TextField label="Password"
                    style={{marginBottom:'1.5rem'}}
                    type="password"
                     placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} required  />
                    <Typography variant="body2" gutterBottom>{error}</Typography>
                    <Button variant="contained" type="submit" fullWidth>Sign In</Button>
                </form>
                <Button variant="contained"
                style={{marginTop:'1rem'}}
                 type="submit"
                  fullWidth>Sign in With Gmail</Button>
            </DialogContent>
            </Grid>
        </Dialog>
    )
}

export default LoginDialogForm