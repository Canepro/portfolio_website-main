import React from 'react';
import { ThemeProvider as CustomPageThemeProvider, useTheme } from '../contexts/ThemeContext';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../themes/default';
import GlobalStyles from '../styles/GlobalStyles'; // Import GlobalStyles

// This component will consume the theme from context and pass it to StyledComponentsThemeProvider
const AppWithTheme = ({ Component, pageProps }) => {
  const { theme } = useTheme(); // 'light' or 'dark'
  const currentThemeObject = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledComponentsThemeProvider theme={currentThemeObject}>
      <GlobalStyles /> {/* Add GlobalStyles here */}
      <Component {...pageProps} />
    </StyledComponentsThemeProvider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <CustomPageThemeProvider> {/* This provides { theme, toggleTheme } */}
      <AppWithTheme Component={Component} pageProps={pageProps} />
    </CustomPageThemeProvider>
  );
}

export default MyApp;
