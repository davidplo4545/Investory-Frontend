import React, { useContext } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import '../components/forms/register.css'
import {UserContext} from '../context/UserContext'
import { Redirect } from 'react-router'

const GetStartedPage = (props) => {
    const {token} = useContext(UserContext)
  
    if(token) return <Redirect to="/home" />;
    return (
      <div className="register-form">
        <RegisterForm/>
      </div>
    )
  }

export default GetStartedPage