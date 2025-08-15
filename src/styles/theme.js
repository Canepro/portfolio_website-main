import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../themes/themes';
import GlobalStyles from './globals';
import useDarkMode from '../hooks/useDarkMode';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

const Theme = ({ children }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      {children}
    </ThemeProvider>
  );
};

export default Theme;