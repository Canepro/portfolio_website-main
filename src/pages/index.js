// Simplified index.js for troubleshooting
import React, { useState, useEffect } from 'react';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
        zIndex: 9999
      }}>
        <div style={{ marginBottom: '1rem' }}>Loading Portfolio...</div>
        <div style={{ 
          width: '200px', 
          height: '4px', 
          background: 'rgba(255,255,255,0.3)', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'white',
            borderRadius: '2px',
            animation: 'loadingProgress 1.5s ease-out forwards'
          }} />
        </div>
        <style jsx>{`
          @keyframes loadingProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Layout>
      <Section grid>
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h1 style={{ 
            fontSize: '4rem', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontWeight: '700'
          }}>
            Portfolio
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            color: '#666', 
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Modern Web Developer - Simplified Build Test
          </p>
          
          <div style={{
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#4ade80', marginBottom: '2rem' }}>
              ✅ Next.js Application Running Successfully!
            </h2>
            
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>System Status:</h3>
              <ul style={{ 
                maxWidth: '400px', 
                margin: '0 auto',
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Next.js Server</span>
                  <span style={{ color: '#4ade80' }}>✅ Running</span>
                </li>
                <li style={{ 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>React Components</span>
                  <span style={{ color: '#4ade80' }}>✅ Loaded</span>
                </li>
                <li style={{ 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Styled Components</span>
                  <span style={{ color: '#4ade80' }}>✅ Working</span>
                </li>
                <li style={{ 
                  padding: '0.5rem 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>Layout System</span>
                  <span style={{ color: '#4ade80' }}>✅ Active</span>
                </li>
              </ul>
            </div>

            <div style={{ 
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <p style={{ margin: 0, color: '#3b82f6', fontSize: '0.9rem' }}>
                <strong>Status:</strong> Basic setup verified. Ready to add advanced components.
              </p>
            </div>          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Home;

