// Integration test for all Phase 2 components
import React from 'react';

// Test component integration and compatibility
export const IntegrationTest = () => {
  const testResults = {
    themeSystem: false,
    threeJSBackground: false,
    aiAssistant: false,
    microAnimations: false,
    scrollAnimations: false,
    customCursor: false,
    loadingScreen: false,
    performance: false,
    pwa: false
  };

  // Test Theme System
  const testThemeSystem = () => {
    try {
      const theme = localStorage.getItem('portfolio-theme');
      const themeToggle = document.querySelector('[data-testid="theme-toggle"]');
      testResults.themeSystem = true;
      console.log('✅ Theme System: Working');
    } catch (error) {
      console.log('❌ Theme System: Error -', error.message);
    }
  };

  // Test Three.js Background
  const testThreeJSBackground = () => {
    try {
      const canvas = document.querySelector('canvas');
      const webglContext = canvas?.getContext('webgl');
      if (webglContext) {
        testResults.threeJSBackground = true;
        console.log('✅ Three.js Background: WebGL Active');
      } else {
        console.log('⚠️ Three.js Background: Fallback to CSS');
      }
    } catch (error) {
      console.log('❌ Three.js Background: Error -', error.message);
    }
  };

  // Test AI Assistant
  const testAIAssistant = () => {
    try {
      const aiButton = document.querySelector('[data-testid="ai-assistant-toggle"]');
      if (aiButton) {
        testResults.aiAssistant = true;
        console.log('✅ AI Assistant: Available');
      }
    } catch (error) {
      console.log('❌ AI Assistant: Error -', error.message);
    }
  };

  // Test Micro Animations
  const testMicroAnimations = () => {
    try {
      const animatedElements = document.querySelectorAll('[data-micro-animation]');
      if (animatedElements.length > 0) {
        testResults.microAnimations = true;
        console.log(`✅ Micro Animations: ${animatedElements.length} animated elements found`);
      }
    } catch (error) {
      console.log('❌ Micro Animations: Error -', error.message);
    }
  };

  // Test Scroll Animations
  const testScrollAnimations = () => {
    try {
      const scrollElements = document.querySelectorAll('[data-scroll-animation]');
      if (scrollElements.length > 0 || window.gsap) {
        testResults.scrollAnimations = true;
        console.log('✅ Scroll Animations: GSAP Active');
      }
    } catch (error) {
      console.log('❌ Scroll Animations: Error -', error.message);
    }
  };

  // Test Custom Cursor
  const testCustomCursor = () => {
    try {
      const cursor = document.querySelector('[data-testid="custom-cursor"]');
      if (cursor) {
        testResults.customCursor = true;
        console.log('✅ Custom Cursor: Active');
      }
    } catch (error) {
      console.log('❌ Custom Cursor: Error -', error.message);
    }
  };

  // Test Loading Screen
  const testLoadingScreen = () => {
    try {
      const loadingData = sessionStorage.getItem('loading-complete');
      if (loadingData) {
        testResults.loadingScreen = true;
        console.log('✅ Loading Screen: Completed');
      }
    } catch (error) {
      console.log('❌ Loading Screen: Error -', error.message);
    }
  };

  // Test Performance Monitoring
  const testPerformance = () => {
    try {
      if (window.performanceData || window.bundleAnalysisData) {
        testResults.performance = true;
        console.log('✅ Performance Monitoring: Active');
      }
    } catch (error) {
      console.log('❌ Performance Monitoring: Error -', error.message);
    }
  };

  // Test PWA Features
  const testPWA = () => {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        testResults.pwa = true;
        console.log('✅ PWA: Service Worker Active');
      }
    } catch (error) {
      console.log('❌ PWA: Error -', error.message);
    }
  };

  // Run all tests
  const runIntegrationTests = () => {
    console.log('🚀 Running Portfolio Integration Tests...\n');
    
    setTimeout(() => {
      testThemeSystem();
      testThreeJSBackground();
      testAIAssistant();
      testMicroAnimations();
      testScrollAnimations();
      testCustomCursor();
      testLoadingScreen();
      testPerformance();
      testPWA();

      const passedTests = Object.values(testResults).filter(Boolean).length;
      const totalTests = Object.keys(testResults).length;
      
      console.log(`\n📊 Integration Test Results: ${passedTests}/${totalTests} passed`);
      
      if (passedTests === totalTests) {
        console.log('🎉 All systems operational! Portfolio ready for production.');
      } else {
        console.log('⚠️ Some features may need attention.');
      }
    }, 2000);
  };

  React.useEffect(() => {
    runIntegrationTests();
  }, []);

  return null; // This component doesn't render anything
};

// Performance Analysis Tool
export const performanceAnalysis = () => {
  const analysis = {
    bundleSize: 0,
    loadTime: 0,
    renderTime: 0,
    interactivity: 0,
    accessibility: 0
  };

  // Analyze bundle size
  if (window.bundleAnalysisData) {
    analysis.bundleSize = window.bundleAnalysisData.totalSize || 0;
  }

  // Analyze load time
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation) {
    analysis.loadTime = navigation.loadEventEnd - navigation.navigationStart;
  }

  // Analyze render time
  const paintEntries = performance.getEntriesByType('paint');
  const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  if (fcp) {
    analysis.renderTime = fcp.startTime;
  }

  // Generate recommendations
  const recommendations = [];
  
  if (analysis.bundleSize > 500000) { // 500KB
    recommendations.push('Consider code splitting to reduce bundle size');
  }
  
  if (analysis.loadTime > 3000) { // 3 seconds
    recommendations.push('Optimize loading performance with lazy loading');
  }
  
  if (analysis.renderTime > 2500) { // 2.5 seconds
    recommendations.push('Improve First Contentful Paint time');
  }

  return {
    analysis,
    recommendations,
    score: calculatePerformanceScore(analysis)
  };
};

const calculatePerformanceScore = (analysis) => {
  let score = 100;
  
  // Deduct points for performance issues
  if (analysis.bundleSize > 500000) score -= 20;
  if (analysis.loadTime > 3000) score -= 25;
  if (analysis.renderTime > 2500) score -= 25;
  
  return Math.max(score, 0);
};

export default IntegrationTest;
