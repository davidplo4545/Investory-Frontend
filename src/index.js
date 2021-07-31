import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import {theme} from './themes'
import { createTheme, ThemeProvider } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';

const muiTheme = createTheme({
  palette:{
    primary:{
      main:theme.hoverBgColor,
    }
  },
})

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.backgroundColor};
    color: ${theme.textColor};
  }

  .navbar { 
    background: ${theme.backgroundColor} !important;
    color: ${theme.textColor} !important; 
    font-family: ${theme.fontFamily};
    font-weight: bold;
  }
  .nav-link {
    font-size: 1rem;
    color: ${theme.textColor} !important;
  }

  .navbar-brand {
    font-size: 1.25rem;
    color: ${theme.textColor} !important;
  }

  .navbar-brand:hover {
    color: ${theme.hoverBgColor} !important;
  }

  .nav-link:hover {
    color: ${theme.hoverBgColor} !important;
  }
  .secondary .nav-link:hover {
    background-color: ${theme.hoverBgColor} !important;
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

ReactDOM.render(
  <ThemeProvider theme={muiTheme}>
    <Router>
      <GlobalStyle/>
        <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
