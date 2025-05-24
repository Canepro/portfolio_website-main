import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;

  }
  body {
    font-family: ${props => props.theme.fonts.main};
    font-size: 1.6rem;
    background: ${props => props.theme.colors.background1};
    color: ${props => props.theme.colors.primary1};
    cursor: default;

  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${props => props.theme.fonts.title};
  }
  a {
    text-decoration: none;
  }  li{
    list-style: none;
  }

  /* Modern scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background2};
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.accent1}, 
      ${props => props.theme.colors.accent2}
    );
    border-radius: ${props => props.theme.radius.full};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.buttonHover}, 
      ${props => props.theme.colors.accent2}
    );
  }

  /* Selection styles */
  ::selection {
    background: ${props => props.theme.colors.accent1}40;
    color: ${props => props.theme.colors.primary1};
  }

  /* Focus visible for accessibility */
  :focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent1};
    outline-offset: 2px;
  }

  /* Smooth transitions for interactive elements */
  button, a, input, textarea {
    transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  }

  /* Modern typography */
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: 600;
  }

  p {
    line-height: 1.6;
  }

  /* Utility classes for modern design */
  .gradient-text {
    background: ${props => props.theme.colors.accentGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glassmorphism {
    background: ${props => props.theme.colors.backgroundGlass};
    backdrop-filter: blur(10px);
    border: 1px solid ${props => props.theme.colors.borderLight};
  }

`;

export default GlobalStyles;