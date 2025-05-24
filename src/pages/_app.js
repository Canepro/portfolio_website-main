import Theme from '../styles/theme';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </ThemeProvider>
    </>
  );
}
 