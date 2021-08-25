import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { useHistory } from 'react-router';

const GoogleLoginAuth = ({setToken, setError, closeFormDialog}) =>{
    const clientId = '746886029211-jdsb2f6qcpgnvpujtudfskdi96pi2br8.apps.googleusercontent.com'
    const history = useHistory()

    const onGoogleLoginSuccess = (response) =>{
        const { accessToken } = response
        axios.post('http://127.0.0.1:8000/rest-auth/google/',{
            access_token:accessToken,
        }).then((res) =>{
            setToken(res.data['key']);
            closeFormDialog()
            history.push({
                pathname:`/portfolios`,
            })
        })
        .catch((error) => setError('A user with this email is already registered.'))
    }

    const onGoogleLoginFailure = (response) =>{
        setError("")
    }

    return(
        <GoogleLogin
        clientId={clientId}
        buttonText="LOGIN WITH GOOGLE"
        style={{backgroundColor:'red !important'}}
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
    />
    )
}

export default GoogleLoginAuth

