import React from 'react';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const Home = () => {
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
            Vincent Mogah
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
            DevOps Engineer & Web Developer
          </p>
          <div style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2>✅ Portfolio Ready</h2>
            <p>Basic setup is working! You can now add components step by step.</p>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Home;

