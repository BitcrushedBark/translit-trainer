import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
  }

  option {
    font-family: 'Roboto Condensed', Arial, sans-serif;
  }

  input, textarea, button, select {
    font-family: inherit;
  }
`;
