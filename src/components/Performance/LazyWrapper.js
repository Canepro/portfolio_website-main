import React, { Suspense } from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.text};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.background2};
  border-top: 3px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingFallback = ({ text = "Loading..." }) => (
  <LoadingContainer>
    <Spinner />
    <span style={{ marginLeft: '12px' }}>{text}</span>
  </LoadingContainer>
);

const LazyWrapper = ({ children, fallback, ...props }) => {
  return (
    <Suspense fallback={fallback || <LoadingFallback />} {...props}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
