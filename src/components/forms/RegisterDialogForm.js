import { Typography, Button, TextField, makeStyles, Dialog,
DialogContent, Avatar, Grid, useTheme } from '@material-ui/core';
import React, {useState, useContext} from 'react'
import {userRegister} from '../../api/authentication.js'
import {UserContext} from '../../context/UserContext'
import GoogleLoginAuth from '../../auth/GoogleLoginAuth.js';
import CreateIcon from '@material-ui/icons/Create';


const useStyles = makeStyles((theme) =>{
    return({
        grid:{
            height:'600px',
            width:'330px',
            padding: theme.spacing(2),
        },
        signUpBtn:{
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
const RegisterDialogForm = ({isRegisterDialog, setIsRegisterDialog}) =>{
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const {setToken} = useContext(UserContext)
    const [error, setError] = useState("")
    const theme = useTheme()
    const classes = useStyles()

    const handleSubmit = (event) => {
        event.preventDefault();
        userRegister({
            'email': email,
            'password1': password,
            'password2': password,
            'first_name': firstName,
            'last_name': lastName,
        }, setToken, setError);

    }

    const handleDialogShow = () =>{
        setIsRegisterDialog(!isRegisterDialog)
    }

    
    const closeFormDialog = () =>{
        setError("")
        setEmail("")
        setPassword("")
        setIsRegisterDialog(false)
    }

    return(
        <Dialog
            open={isRegisterDialog}
            onClose={() => handleDialogShow()}
            aria-labelledby="responsive-dialog-title">
            <Grid container direction="column" 
            alignItems="center" 
            className={classes.grid}>
                <Avatar style={{marginBottom:'1rem', 
                background:theme.palette.text.secondary}}>
                     <CreateIcon />
                </Avatar>
                <Typography gutterBottom color="textSecondary" variant="h5"
                    style={{borderBottom:`0.5px solid ${theme.palette.secondary.main}`, width:'100%',
                    display:'flex', justifyContent:'center', paddingBottom:'1rem'}}>
                    <b>Sign Up</b>
                </Typography>
                <DialogContent>
                    <form style={{display:'flex',
                    width:'208px',
                        flexDirection:'column',
                        justifyContent:'space-between',
                        marginBottom:'1rem'}}
                        onSubmit={handleSubmit}>
                    
                        <TextField label="Email"
                            type="email"
                            style={{marginBottom:'0.7rem'}}
                            placeholder="Enter email"
                            value={email} 
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)} required />

                        <TextField label="First Name"
                            type="text"
                            style={{marginBottom:'0.7rem'}}
                            placeholder="Enter first name"
                            fullWidth
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} required />

                        <TextField label="Last Name"
                            type="text"
                            fullWidth
                            style={{marginBottom:'0.7rem'}}
                            placeholder="Enter last name"
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} required />

                        <TextField label="Password"
                            type="password"
                            fullWidth
                            style={{marginBottom:'0.7rem'}}
                            placeholder="Enter password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} required />

                        <Typography variant="body2" style={{marginBottom:'0.3rem'}}>
                            {error}
                        </Typography>
                        <Button variant="contained" className={classes.signUpBtn}
                            type="submit" fullWidth color="primary">
                         Sign Up
                        </Button>
                    </form>
                    <GoogleLoginAuth setToken={setToken}
                    setError={setError}
                    closeFormDialog={closeFormDialog}/>
                </DialogContent>
            </Grid>
        </Dialog>

    );
}

export default RegisterDialogForm;