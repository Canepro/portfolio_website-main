import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: ${props => props.theme.fonts.main};
    background: ${props => props.theme.colors.background1};
    color: ${props => props.theme.colors.primary1};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

export default GlobalStyles;
