import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  body {
    background: ${({ theme }) => theme.colors.background1};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
    line-height: 1.6;
  }

  #__next {
    min-height: 100vh;
    position: relative;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
      monospace;
  }

  a {
    color: ${({ theme }) => theme.colors.accent1};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  /* Ensure content is above 3D background */
  main, .content-wrapper {
    position: relative;
    z-index: 1;
  }
`;

export default GlobalStyles;
