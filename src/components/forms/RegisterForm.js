import { Typography, Button, TextField, makeStyles, Box } from '@material-ui/core';
import React, {useState, useContext} from 'react'
import { Link } from "react-router-dom";
import {userRegister} from '../../api/authentication.js'
import {UserContext} from '../../context/UserContext'
import GoogleLoginAuth from '../base/GoogleLoginAuth.js';


const useStyles = makeStyles((theme) =>{
    return({
        box:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            padding: theme.spacing(4),
            // paddingTop:theme.spacing(2),
            // paddingBottom:theme.spacing(3),

        },
        registerForm:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            marginBottom:'1rem',
            width:'100%'
            
            
        }
    })
})
const RegisterForm = () =>{

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const {setToken} = useContext(UserContext)
    const [error, setError] = useState("")
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

    return(
        <Box className={classes.box}>
        <form onSubmit={handleSubmit} className={classes.registerForm}>
        
            <Typography variant="h5" gutterBottom>Get Started</Typography>

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
                value={email} 
                onChange={(e) => setPassword(e.target.value)} required />

            <Typography variant="body2">
                {error}
            </Typography>
            <Button type="submit"
            fullWidth
             variant="contained"
             style={{marginTop:'2rem'}}>
                 Sign Up
            </Button>
        </form>
        <GoogleLoginAuth setToken={setToken}
            setError={setError}/>
        </Box>

    );
}

export default RegisterForm;