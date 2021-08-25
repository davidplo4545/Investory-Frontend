import React, {useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import {Dialog, DialogContent,
     Button, makeStyles, TextField, Typography, Grid, Avatar, useTheme } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router'
import axios from 'axios'
import GoogleLoginAuth from '../../auth/GoogleLoginAuth'

const useStyles = makeStyles((theme) =>{
    return({
        loginGrid:{
            height:'500px',
            width:'300px',
            // background:'#fff',
            padding: theme.spacing(2),
        },
        signInBtn:{
            color:'#fff',
            borderRadius:'2px',
            fontWeight:500,
            padding:10,
            fontSize:'14px',
            '&:hover':{
                background: theme.palette.primary.light,
            }
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
            closeFormDialog()
            history.push({
                pathname:`/portfolios`,
            })
        })
        .catch((error) =>
        {
            setError(`Username or password are incorrect.`)
        })
    }

    const closeFormDialog = () =>{
        setError("")
        setEmail("")
        setPassword("")
        setIsLoginDialog(false)
    }




    return(
        <Dialog
            open={isLoginDialog}
            onClose={() => handleDialogShow()}
            aria-labelledby="responsive-dialog-title">
            <Grid container direction="column" 
            alignItems="center" 
            className={classes.loginGrid}>
                <Avatar style={{marginBottom:'1rem',
                 background:theme.palette.text.secondary}}
                 color="primary">
                     <LockOutlined />
                </Avatar>
                <Typography gutterBottom variant="h5"
                color="textSecondary"
                    style={{borderBottom:`0.5px solid ${theme.palette.secondary.main}`, width:'100%',
                    display:'flex', justifyContent:'center', paddingBottom:'1rem'}}>
                    <b>Sign In</b>
                </Typography>
            <DialogContent>
                <form style={{display:'flex',
                 flexDirection:'column',
                  justifyContent:'space-between',
                marginBottom:'1rem'}}
                onSubmit={handleSubmit}>
                    <TextField label="Email"
                    type="email"
                    style={{marginBottom:'0.5rem'}}
                    placeholder="Enter email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} required />
                    <TextField label="Password"
                    style={{marginBottom:'2rem'}}
                    type="password"
                     placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} required  />
                    <Typography variant="body2" style={{marginBottom:'0.3rem'}}>{error}</Typography>
                    <Button variant="contained" className={classes.signInBtn}
                     type="submit" fullWidth color="primary">
                         Sign In
                        </Button>
                </form>
                 <GoogleLoginAuth setToken={setToken}
                 setError={setError}
                 closeFormDialog={closeFormDialog}/>
            </DialogContent>
            </Grid>
        </Dialog>
    )
}

export default LoginDialogForm