import {useState, useEffect} from 'react';
import './App.css';
import NavbarMenu from './components/base/Navbar.js';
import { Route, Switch } from "react-router-dom";
import './components/base/navbar.css';
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import GetStartedPage from './pages/GetStartedPage'
import AssetsPage from './pages/AssetsPage'
import AssetPage from './pages/AssetPage'
import {UserContext} from './context/UserContext'
import useToken from './context/useToken'
import { getMyUserDetails } from './api/authentication'
import {Container} from 'react-bootstrap'

function App() {
  const {token,setToken} = useToken();
  const [user, setUser] = useState({})

  useEffect(() => {
    if (token)
      getMyUserDetails(token,setUser)
  }, [token]);


  return (
    <div className="App">
      <UserContext.Provider value={{token, user, setToken, setUser}}>
      <header className="App-header">
            <NavbarMenu token={token}/>
      </header>
      <main>
          <Container>
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

              <Route exact path="/profile">
                {/* <ProfilePage/> */}
                <div>Profile Page</div>
              </Route>
            </Switch> 
          </Container>
      </main>
        {/* <footer className="footer">Footer</footer> */}
      </UserContext.Provider>
    </div>
  );
}

export default App;
