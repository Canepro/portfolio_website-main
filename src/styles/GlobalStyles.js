import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background1};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.25s linear;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
      monospace;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.colors.accent1};
    text-decoration: none;
  }
`;

export default GlobalStyles;
