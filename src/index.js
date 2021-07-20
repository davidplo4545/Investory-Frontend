import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import {theme} from './themes'
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.backgroundColor};
    color: ${theme.textColor};
  }

  .container {

  }
  .navbar { 
    background: ${theme.backgroundColor} !important;
    color: ${theme.textColor} !important; 
  }
  .nav-link {
    font-size: 1rem;
    color: ${theme.textColor} !important;
  }

  .navbar-brand {
    // font-size: 1.25rem;
    color: ${theme.textColor} !important;
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
  <Router>
    <GlobalStyle/>
      <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
