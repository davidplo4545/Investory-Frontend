import axios from 'axios'

const domain = "http://localhost:8000/api"
export const userLogin = (userCredentials, setToken, setError, history, setIsLoginDialog) => {
    axios.post(domain + '/login/',{
        'email':userCredentials['email'],
        'password':userCredentials['password'],
    })
    .then((res) => {
        setToken(res['data']['key']);
        setIsLoginDialog(false)
        history.push({
            pathname:`/portfolios`,
        })
    })
    .catch((error) =>
    {
        setError(`Username or password are incorrect.`)
    })
    
}
export const userRegister = (userCredentials, setToken, setError) => {
    axios.post(domain + '/register/',{
        'email':userCredentials['email'],
        'password1':userCredentials['password1'],
        'password2':userCredentials['password2'],
        'first_name':userCredentials['first_name'],
        'last_name':userCredentials['last_name'], 
    })
    .then((res) => 
    {
        setToken(res['data']['key']);
    })
    .catch((error) =>
    {
        setError("User with this email already exists.")
    })
}

export const userLogout = (userToken, setToken) => {
    axios.post(domain + '/logout/',{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    
    })
    .then((res) => 
    {
        setToken(null);
    })
}

export const getMyUserDetails = (userToken, setUser) =>{
    axios.get(domain + '/user/',{
        headers:{
            'Authorization': `Token ${userToken}`
        }
    })
    .then((res) =>{
        setUser(res.data);
    })
}