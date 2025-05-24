import React from 'react';
import { ThemeProvider as CustomPageThemeProvider } from '../contexts/ThemeContext'; // Renamed to avoid conflict
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { defaultTheme } from '../themes/default'; // Import the theme
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // If your CustomPageThemeProvider is responsible for providing the theme object
  // (e.g., for light/dark mode), you would get the theme from its context here
  // and pass it to StyledComponentsThemeProvider.
  // For now, we'll use defaultTheme directly to fix the error.
  // Example: const { currentTheme } = useTheme(); // from your ThemeContext

  return (
    <CustomPageThemeProvider> {/* Your existing ThemeProvider */}
      <StyledComponentsThemeProvider theme={defaultTheme}> {/* SC ThemeProvider with your theme */}
        {/* You might also want to include a GlobalStyles component from styled-components here */}
        {/* e.g., <GlobalStyles /> */}
        <Component {...pageProps} />
      </StyledComponentsThemeProvider>
    </CustomPageThemeProvider>
  );
}

export default MyApp;
