import Accomplishments from '../components/Accomplishments/Accomplishments';
import BgAnimation from '../components/BackgroundAnimation/BackgroundAnimation';
import ModernHero from '../components/Hero/ModernHero';
import ModernProjects from '../components/Projects/ModernProjects';
import ModernTechnologies from '../components/Technologies/ModernTechnologies';
import ModernContact from '../components/Contact/ModernContact';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import AnimatedBackground from '../components/ThreeBackground/ThreeBackground';
import Three3DBackground from '../components/ThreeBackground/Three3DBackground';
import AIAssistant from '../components/AIAssistant/AIAssistant';
import { MicroAnimationsProvider } from '../components/MicroAnimations/MicroAnimations';
import ModernNavigation from '../components/Navigation/ModernNavigation';
import LoadingScreen, { useLoading } from '../components/Loading/LoadingScreen';
import ScrollAnimations from '../components/ScrollAnimations/ScrollAnimations';
import CustomCursor from '../components/CustomCursor/CustomCursor';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';
import { IntegrationTest } from '../utils/integrationTest';
import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
  const { isLoading, progress, loadingText } = useLoading();
  const [use3D, setUse3D] = useState(true);
  
  // Define a ref variable to store the livechat script
  const livechatScript = useRef(null);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setUse3D(false);
      console.warn('WebGL not supported, falling back to CSS animations');
    }
  }, []);

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
        <MicroAnimationsProvider>
          <CustomCursor />
          <Layout>
            {/* Use 3D background if WebGL is supported, otherwise fallback to CSS */}
            {use3D ? <Three3DBackground /> : <AnimatedBackground />}
            
            <ModernNavigation />
            <ThemeToggle />
            <ScrollAnimations />
            
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
            
            {/* AI Assistant - available on all pages */}
            <AIAssistant />
            
            {/* Integration Test - runs in development only */}
            {process.env.NODE_ENV === 'development' && <IntegrationTest />}
          </Layout>
        </MicroAnimationsProvider>
      )}
    </>
  );
};

export default Home;

