import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import Main from './components/Main';
import typography from './utils/typography';
import fontFiles from './fonts/index.js';

const GlobalStyles = createGlobalStyle`
 ${typography}
 @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: bold;
    src: local("Gotham Rounded Bold"), local("GothamRounded-Bold"), url(${
      fontFiles.GothamRoundedBold
    }) format("opentype");
  }  
  @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: 500;
    src: local("Gotham Rounded Medium"), local("GothamRounded-Medium"), url(${
      fontFiles.GothamRoundedMedium
    }) format("opentype");
  }  
  /* @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: normal;
    src: local("Gotham Rounded Book"), local("GothamRounded-Book"), url(${
      fontFiles.GothamRoundedBook
    }) format("opentype");
  }   */
  @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: 200;
    src: local("Gotham Rounded Light"), local("GothamRounded-Light"), url(${
      fontFiles.GothamRoundedLight
    }) format("opentype");
  } 
`;

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyles />
        <Router>
          <App path="/*" />
        </Router>
      </React.Fragment>
    );
  }
}

export default Routes;
