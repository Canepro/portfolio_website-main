// Simplified version of index.js for troubleshooting
import React, { useState, useEffect } from 'react';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const TestHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
        zIndex: 9999
      }}>
        Loading Portfolio...
      </div>
    );
  }

  return (
    <Layout>
      <Section grid>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Portfolio
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
            Modern Web Developer
          </p>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2>✅ Basic Setup Working</h2>
            <p>Next.js application is running successfully!</p>
            <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
              <li>✅ Next.js Server</li>
              <li>✅ React Components</li>
              <li>✅ Styled Components</li>
              <li>✅ Layout System</li>
            </ul>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default TestHome;
