import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css'; // if you have global CSS

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
