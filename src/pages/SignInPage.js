import React, { useContext } from 'react'
import LoginForm from '../components/forms/LoginForm'
import '../components/forms/login.css'
import {UserContext} from '../context/UserContext'
import { Redirect } from 'react-router'

const SignInPage = (props) => {
    const {token} = useContext(UserContext)
  
    if(token) return <Redirect to="/home" />;
    return (
      <div className="login-form">
        <LoginForm/>
      </div>
    )
  }

export default SignInPage