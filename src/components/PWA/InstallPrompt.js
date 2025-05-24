import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PromptContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.background2};
  border: 2px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  gap: 15px;
  
  @media (min-width: 768px) {
    left: auto;
    right: 20px;
    max-width: 350px;
  }
`;

const PromptText = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`;

const PromptButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
`;

const InstallButton = styled(Button)`
  background: ${({ theme }) => theme.colors.accent1};
  color: white;
  
  &:hover {
    opacity: 0.8;
  }
`;

const DismissButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text}44;
  
  &:hover {
    background: ${({ theme }) => theme.colors.text}11;
  }
`;

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after a delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 10000); // Show after 10 seconds
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) {
      setShowPrompt(false);
    }
  }, []);

  return (
    <PromptContainer show={showPrompt && deferredPrompt}>
      <PromptText>
        <strong>Install Portfolio App</strong>
        <br />
        Get quick access and offline viewing
      </PromptText>
      <PromptButtons>
        <DismissButton onClick={handleDismiss}>
          Later
        </DismissButton>
        <InstallButton onClick={handleInstall}>
          Install
        </InstallButton>
      </PromptButtons>
    </PromptContainer>
  );
};

export default InstallPrompt;
