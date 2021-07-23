import {useState, useEffect} from 'react';
import './App.css';
import NavbarMenu from './components/base/NavbarMenu.js';
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
import {  Grid, makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
  root: {
    width: '75%',
  },
});
function App() {
  const {token,setToken} = useToken();
  const [user, setUser] = useState({})

  useEffect(() => {
    if (token)
      getMyUserDetails(token,setUser)
  }, [token]);

  const classes = useStyles()
  return (
    <div className="App">
      <UserContext.Provider value={{token, user, setToken, setUser}}>
      <header className="App-header">
            <NavbarMenu token={token}/>
      </header>
      <main>
          <Grid container className={classes.root}  alignItems="center" justifyContent="center">
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
              <Route exact path="/profile">
                {/* <ProfilePage/> */}
                <div>Profile Page</div>
              </Route>
            </Switch> 
          </Grid>
      </main>
        {/* <footer className="footer">Footer</footer> */}
      </UserContext.Provider>
    </div>
  );
}

export default App;
