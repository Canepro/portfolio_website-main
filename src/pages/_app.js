import { ThemeProvider } from '../contexts/ThemeContext';
import Theme from '../styles/theme';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ThemeProvider>
  );
}
 