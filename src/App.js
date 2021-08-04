import {useState, useEffect} from 'react';
import './App.css';
import NavbarMenu from './components/base/NavbarMenu.js';
import Footer from './components/base/Footer.js';
import { Route, Switch } from "react-router-dom";
import './components/base/navbar.css';
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
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
import IconButton from "@material-ui/core/IconButton";


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
      padding:"10px",
      width: "100%",
    },
    [theme.breakpoints.up('md')]: {
      padding:"15px",
      width: "100%",
    },
    [theme.breakpoints.up('lg')]: {
      padding:"20px",
      width: "75%",
    },
  }
}));
function App() {

  const [isTheme, setIsTheme] = useState(true);

  const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${!isTheme ? darkTheme.backgroundColor : lightTheme.backgroundColor};
    color:  ${!isTheme ? darkTheme.textColor : lightTheme.textColor};
  }

  .navbar { 
    background:  ${!isTheme ? darkTheme.backgroundColor : lightTheme.backgroundColor} !important;
    color:  ${!isTheme ? darkTheme.textColor : lightTheme.textColor} !important; 
    
    font-weight: bold;
  }
  .nav-link {
    font-size: 1rem;
    color:  ${!isTheme ? darkTheme.textColor : lightTheme.textColor} !important;
    font-family: ${darkTheme.fontFamily};
  }

  .navbar-brand {
    font-size: 1.25rem;
    color: ${!isTheme ? darkTheme.textColor : lightTheme.textColor} !important;
  }

  .navbar-brand:hover {
    color: ${!isTheme ? darkTheme.hoverBgColor : lightTheme.hoverBgColor} !important;
  }

  .nav-link:hover {
    color: ${!isTheme ? darkTheme.hoverBgColor : lightTheme.hoverBgColor} !important;
  }
  .secondary .nav-link:hover {
    background-color: ${!isTheme ? darkTheme.hoverBgColor : lightTheme.hoverBgColor} !important;
    color: #fff !important;
    transition: all ease-in 0.3s;
  }

  .portfolio-actions button{
    color: white !important;
  }
  .portfolio-actions button:hover{
    background: white !important;
    color:black !important;
  }
`;
const muiDarkTheme = createTheme({
  palette:{
    type:'dark',
    primary:{
      main:darkTheme.hoverBgColor,
    },
    secondary:{
      main:darkTheme.secondaryColor,
    },
    text:{
      primary:darkTheme.textColor,
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
      main:lightTheme.hoverBgColor,
    },
    secondary:{
      main:lightTheme.secondaryColor,
    },
    text:{
      primary:lightTheme.textColor
    }
  },
  KeyboardDatePicker: {
    color: "red",
  },
})
const appliedTheme = createTheme(isTheme ? muiLightTheme : muiDarkTheme);


  const {token,setToken} = useToken();
  const [user, setUser] = useState({})

  useEffect(() => {
    if (token)
      getMyUserDetails(token,setUser)
  }, [token]);

  const classes = useStyles()
  return (
  <ThemeProvider theme={appliedTheme}>

    <div className="App">
      <GlobalStyle/>
      <UserContext.Provider value={{token, user, setToken, setUser}}>
      <header className="App-header">
            <NavbarMenu token={token}/>
      </header>
      <main>
        <Box className={classes.paper}>
          <Grid container>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/register">
                <GetStartedPage/>
              </Route>
              <Route exact path="/signin">
                <SignInPage/>
              </Route>
              <Route path="/assets/:assetType" component={AssetsPage}/>
              <Route path="/asset/:assetId" component={AssetPage}/>
              <Route exact path="/portfolios" component={PortfoliosPage}/>
              <Route exact path="/portfolios/:portfolioId" component={PortfolioPage}/>
              <Route exact path="/portfolios/:portfolioId/edit" component={CreatePortfolioPage}/>
              <Route exact path="/portfolio-create" component={CreatePortfolioPage}/>
              <Route exact path="/portfolios/:portfolioId/compare" component={ComparePortfolioPage}/>
              <Route exact path="/profile">
                {/* <ProfilePage/> */}
                <div>Profile Page</div>
              </Route>
            </Switch> 
          </Grid>
        </Box>
      </main>
      <Footer isTheme={isTheme} setIsTheme={setIsTheme}/>
        {/* <footer className="footer">Footer</footer> */}
      </UserContext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
