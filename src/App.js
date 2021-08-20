import {useState, useEffect, useContext} from 'react';
import './App.css';
import NavbarMenu from './components/base/NavbarMenu.js';
import Footer from './components/base/Footer.js';
import { Route, Switch, Redirect } from "react-router-dom";
import InstructionsPage from './pages/InstructionsPage'
import GetStartedPage from './pages/GetStartedPage'
import AssetsPage from './pages/AssetsPage'
import AssetPage from './pages/AssetPage'
import PortfoliosPage from './pages/PortfoliosPage'
import PortfolioPage from './pages/PortfolioPage'
import CreatePortfolioPage from './pages/CreatePortfolioPage'
import {UserContext} from './context/UserContext'
import useToken from './context/useToken'
import { getMyUserDetails } from './api/authentication'
import {  Grid, makeStyles, Box } from '@material-ui/core'
import ComparePortfolioPage from './pages/ComparePortfolioPage';
import {darkTheme, lightTheme} from './themes'
import { createTheme, ThemeProvider } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';


const useStyles =  makeStyles((theme) => ({
  root: {
    height: '100%',
    alignItems:'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
    [theme.breakpoints.up('md')]: {
      width: "100%",
    },
    [theme.breakpoints.up('lg')]: {
      width: "75%",
    },
  },
  paper: {
    background:'transparent',
    width: "100%",
    height: "auto",
    [theme.breakpoints.down('sm')]: {
      padding:0,
      margin:0,
      width: "100%",
    },
    [theme.breakpoints.up('md')]: {
      padding:"1rem",
      width: "100%",
    },
    [theme.breakpoints.up('lg')]: {
      padding:"1rem",
      width: "75%",
    },
  },
  main:{
    [theme.breakpoints.down('xs')]: {
      // position:'absolute',
    },
  }
}));
function App() {

  const [isTheme, setIsTheme] = useState(true);

  const muiDarkTheme = createTheme({
    palette:{
      type:'dark',
      primary:{
        main:darkTheme.primary.main,
      },
      secondary:{
        main:darkTheme.secondary.main,
      },
      text:{
        primary:darkTheme.text.primary,
        secondary:darkTheme.text.secondary,
      }
    },
    overrides: {
      MuiPickersCalendarHeader: {
        switchHeader: {
          color: '#424242',
          textTransform: 'uppercase',
        },
        dayLabel: {
          textTransform: 'uppercase',
        },
      },
      MuiPickersDay: {
        day: {
          color: '#707070',
        },
        current: {
          color: 'red',
        },
      },
    },
  
  })
  
  const muiLightTheme = createTheme({
    palette:{
      type:'light',
      primary:{
        main:lightTheme.primary.main,
      },
      secondary:{
        main:lightTheme.secondary.main,
      },
      text:{
        primary:lightTheme.text.primary,
        secondary:lightTheme.text.secondary,
      }
    },
    KeyboardDatePicker: {
      color: "red",
    },
  })
  const appliedTheme = createTheme(isTheme ? muiLightTheme : muiDarkTheme);
  
  const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${!isTheme ? darkTheme.backgroundColor : lightTheme.backgroundColor};
    color:  ${appliedTheme.palette.text.primary};
    overflow-x: hidden;
  }  
`;


  const {token,setToken} = useToken();
  const [user, setUser] = useState({})
  const [isLoginDialog, setIsLoginDialog] = useState(false);

  useEffect(() => {
    if (token)
      getMyUserDetails(token,setUser)
    let currTheme = localStorage.getItem('theme')
    if(currTheme){
      setIsTheme(currTheme == "light")
    }
    else{
      localStorage.setItem('theme','light')
    }
    
  }, [token]);

  const classes = useStyles()

  return (
  <ThemeProvider theme={appliedTheme}>

    <div className={`App ${classes.main}`}>
      <GlobalStyle/>
      <UserContext.Provider value={{token, user, setToken, setUser}}>
      <header className="App-header">
            <NavbarMenu token={token} 
            isTheme={isTheme} 
            setIsTheme={setIsTheme}
            isLoginDialog={isLoginDialog}
            setIsLoginDialog={setIsLoginDialog}/>
      </header>
      <main>
        <Box className={classes.paper}>
          <Grid container>
            <Switch>
              <DisallowedForAuthRoute exact path="/" component={GetStartedPage}/>
              <PrivateRoute path="/assets/:assetType" component={AssetsPage}/>
              <PrivateRoute path="/asset/:assetId" component={AssetPage}/>
              <PrivateRoute exact path="/portfolios" component={PortfoliosPage}/>
              <PrivateRoute exact path="/portfolios/:portfolioId" component={PortfolioPage}/>
              <PrivateRoute exact path="/portfolios/:portfolioId/edit" component={CreatePortfolioPage}/>
              <PrivateRoute exact path="/portfolio-create" component={CreatePortfolioPage}/>
              <PrivateRoute exact path="/portfolios/:portfolioId/compare" component={ComparePortfolioPage}/>
              <PrivateRoute exact path="/instructions" component={InstructionsPage}/>
            </Switch> 
          </Grid>
        </Box>
      </main>
      <Footer isTheme={isTheme} setIsTheme={setIsTheme}/>
      </UserContext.Provider>
    </div>
    </ThemeProvider>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useContext(UserContext)
  return <Route {...rest} render={(props) => (
    user.token
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
  
  }

const DisallowedForAuthRoute = ({ component: Component, ...rest }) => {
  const user = useContext(UserContext)
  return <Route {...rest} render={(props) => (
    user.token
      ? <Redirect to='/portfolios' />
      : <Component {...props} />
  )} />
  
  }



export default App;
