import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Theme from '../styles/theme';
import '../styles/globals.css'; // if you have global CSS

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ThemeProvider>
  );
}

export default MyApp;
