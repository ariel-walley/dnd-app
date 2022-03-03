import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    text-align: center;
    background-color: black;
    color: white;
    font-family: Arial, Calibri, sans-serif;
    cursor: default;
  }

  `;

export default GlobalStyle;