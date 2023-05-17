import styled from 'styled-components';

export const LeftSection = styled.div`
  width: 100%;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
`;

//Q: What is missing?
//A: The right section is missing. We need to add it to the Hero component. Let's do that now.  We will also add the image to the right section.  We will use the styled component we created earlier to do this.   

// Path: src\components\Hero\Hero.js 
import React from 'react';  //Q: What is this importing?  A: React  
import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents'; //Q: What is this importing?  A: Section, SectionText, SectionTitle from GlobalComponents     
import Button from '../../styles/GlobalComponents/Button'; //Q: What is this importing?  A: Button from GlobalComponents  
import { LeftSection, RightSection } from './HeroStyles'; //Q: What is this importing?  A: LeftSection, RightSection from HeroStyles

const Hero = (props) => ( //Q: What is this?  A: This is a function component called Hero that takes in props as an argument.  It returns the following:
  <Section row nopadding>  {/* Q: What is this?  A: This is a Section component that takes in the following props: row and nopadding.  */}  
    <LeftSection> {/* Q: What is this?  A: This is a LeftSection component.  */}    
      <SectionTitle main center>  {/* Q: What is this?  A: This is a SectionTitle component that takes in the following props: main and center.  */}  
        Welcome To <br />  {/* Q: What is this?  A: This is a line break.  */}  
        My Personal Portfolio
      </SectionTitle>
      <SectionText>  {/* Q: What is this?  A: This is a SectionText component.  */} 
        I am a full stack web developer with a passion for learning and creating.  I am currently enrolled in the University of Arizona's Coding Bootcamp.  I am excited to continue to learn and grow as a developer.  I am looking forward to working with you.
      </SectionText>
      <Button onClick={() => window.location = 'https://google.com'}>Learn More</Button>  {/* Q: What is this?  A: This is a Button component that takes in the following props: onClick and Learn More.  */} 
    </LeftSection>
    <RightSection>  {/* Q: What is this?  A: This is a RightSection component.  */} 
      <img src="/images/hero.png" alt="hero" />  {/* Q: What is this?  A: This is an image component that takes in the following props: src and alt.  */}
    </RightSection>
  </Section>
);

export default Hero;  //Q: What is this exporting?  A: This is exporting the Hero component.

//Q: What is missing?
//A: The Hero component is missing from the App.js file.  Let's add it now. 

// Path: src\App.js
import React from 'react';  //Q: What is this importing?  A: React

import Hero from './components/Hero/Hero';  //Q: What is this importing?  A: Hero from Hero
import Navbar from './components/Navbar/Navbar';  //Q: What is this importing?  A: Navbar from Navbar
import './app.css';  //Q: What is this importing?  A: app.css from app.css

const App = () => {  //Q: What is this?  A: This is a function component called App.  It returns the following:

  return (  //Q: What is this?  A: This is a return statement that returns the following:
    <div>  {/* Q: What is this?  A: This is a div element.  */}
      <Navbar />  {/* Q: What is this?  A: This is a Navbar component.  */}
      <Hero />  {/* Q: What is this?  A: This is a Hero component.  */} 
    </div>
  );
};

export default App;  //Q: What is this exporting?  A: This is exporting the App component.

//Q: What is missing?
//A: The Hero component is missing from the App.js file.  Let's add it now. 

// Path: src\components\Navbar\Navbar.js
import React from 'react';  //Q: What is this importing?  A: React
import { DiCssdeck } from 'react-icons/di';  //Q: What is this importing?  A: DiCssdeck from react-icons/di
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';  //Q: What is this importing?  A: AiFillGithub, AiFillInstagram, AiFillLinkedin from react-icons/ai
import { FaLaptopCode } from 'react-icons/fa';  //Q: What is this importing?  A: FaLaptopCode from react-icons/fa
import { GiHamburgerMenu } from 'react-icons/gi';  //Q: What is this importing?  A: GiHamburgerMenu from react-icons/gi
import { GoMarkGithub } from 'react-icons/go';  //Q: What is this importing?  A: GoMarkGithub from react-icons/go
import { IconContext } from 'react-icons/lib';  //Q: What is this importing?  A: IconContext from react-icons/lib
import { animateScroll as scroll } from 'react-scroll';  //Q: What is this importing?  A: animateScroll as scroll from react-scroll
import { MobileIcon, Nav, NavbarContainer, NavBtn, NavBtnLink, NavItem, NavLinks, NavLogo, NavMenu } from './NavbarStyles';  //Q: What is this importing?  A: MobileIcon, Nav, NavbarContainer, NavBtn, NavBtnLink, NavItem, NavLinks, NavLogo, NavMenu from NavbarStyles

const Navbar = ({ toggle }) => {  //Q: What is this?  A: This is a function component called Navbar that takes in toggle as an argument.  It returns the following:

  const toggleHome = () => {  //Q: What is this?  A: This is a function called toggleHome.  It returns the following:
    scroll.scrollToTop();  //Q: What is this?  A: This is a scroll function that scrolls to the top of the page.

  };


  return (  //Q: What is this?  A: This is a return statement that returns the following:
    <>  {/* Q: What is this?  A: This is a fragment.  */} 
      <IconContext.Provider value={{ color: '#fff' }}>  {/* Q: What is this?  A: This is a IconContext.Provider component that takes in the following props: value and color.  */}
        <Nav>  {/* Q: What is this?  A: This is a Nav component.  */}
          <NavbarContainer>  {/* Q: What is this?  A: This is a NavbarContainer component.  */} 
            <NavLogo to='/' onClick={toggleHome}>  {/* Q: What is this?  A: This is a NavLogo component that takes in the following props: to and onClick.  */}

              <FaLaptopCode />  {/* Q: What is this?  A: This is a FaLaptopCode component.  */}
              Portfolio
            </NavLogo>
            <MobileIcon onClick={toggle}>  {/* Q: What is this?  A: This is a MobileIcon component that takes in the following props: onClick and toggle.  */}
              <GiHamburgerMenu />  {/* Q: What is this?  A: This is a GiHamburgerMenu component.  */}
            </MobileIcon>
            <NavMenu>  {/* Q: What is this?  A: This is a NavMenu component.  */} 
              <NavItem>  {/* Q: What is this?  A: This is a NavItem component.  */}
                <NavLinks to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80}>  {/* Q: What is this?  A: This is a NavLinks component that takes in the following props: to, smooth, duration, spy, exact, and offset.  */}  
                  About
                </NavLinks> 
              </NavItem>  

              <NavItem>  {/* Q: What is this?  A: This is a NavItem component.  */} 

                <NavLinks to="discover" smooth={true} duration={500} spy={true} exact='true' offset={-80}>  {/* Q: What is this?  A: This is a NavLinks component that takes in the following props: to, smooth, duration, spy, exact, and offset.  */}
                  Discover  {/* Q: What is this?  A: This is a Discover component.  */}
                </NavLinks>
              </NavItem>
              <NavItem>  {/* Q: What is this?  A: This is a NavItem component.  */}
                <NavLinks to="services" smooth={true} duration={500} spy={true} exact='true' offset={-80}>  {/* Q: What is this?  A: This is a NavLinks component that takes in the following props: to, smooth, duration, spy, exact, and offset.  */}
                  Services  {/* Q: What is this?  A: This is a Services component.  */}
                </NavLinks>
              </NavItem>
              