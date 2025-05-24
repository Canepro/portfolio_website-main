import Accomplishments from '../components/Accomplishments/Accomplishments';
import BgAnimation from '../components/BackgroundAnimation/BackgroundAnimation';
import ModernHero from '../components/Hero/ModernHero';
import ModernProjects from '../components/Projects/ModernProjects';
import ModernTechnologies from '../components/Technologies/ModernTechnologies';
import ModernContact from '../components/Contact/ModernContact';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import AnimatedBackground from '../components/ThreeBackground/ThreeBackground';
import ModernNavigation from '../components/Navigation/ModernNavigation';
import LoadingScreen, { useLoading } from '../components/Loading/LoadingScreen';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';
import React, { useEffect, useRef } from 'react';

const Home = () => {
  const { isLoading, progress, loadingText } = useLoading();
  
  // Define a ref variable to store the livechat script
  const livechatScript = useRef(null);

  // Use an effect hook to load and unload the livechat script on mount and unmount
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');

    // Set the source and attributes of the script
    script.src =
      'https://canepros.rocket.chat/livechat/rocketchat-livechat.min.js?_=201903270000';
    script.async = true;
    script.id = 'livechat-script';

    // Append the script to the document head
    document.head.appendChild(script);

    // Set the livechat script ref variable to the script element
    livechatScript.current = script;

    // Return a cleanup function to unload the livechat script on unmount
    return () => {
      // Remove the script element from the document head
      document.head.removeChild(livechatScript.current);

      // Set the livechat script ref variable to null
      livechatScript.current = null;
    };  }, []);  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        progress={progress} 
        loadingText={loadingText} 
      />
      
      {!isLoading && (
        <Layout>
          <AnimatedBackground />
          <ModernNavigation />
          <ThemeToggle />
          <Section grid id="home">
            <ModernHero />
            <BgAnimation />
          </Section>
          <div id="projects">
            <ModernProjects />
          </div>
          <div id="skills">
            <ModernTechnologies />
          </div>
          <div id="experience">
            <Timeline />
          </div>
          <div id="about">
            <Accomplishments />
          </div>
          <div id="contact">
            <ModernContact />
          </div>
        </Layout>
      )}
    </>
  );
};

export default Home;

