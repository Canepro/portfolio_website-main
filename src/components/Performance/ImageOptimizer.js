import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background2};
  border-radius: ${props => props.rounded ? '50%' : '8px'};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => props.loaded ? 1 : 0};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const PlaceholderDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.background2} 25%, 
    ${({ theme }) => theme.colors.background1} 50%, 
    ${({ theme }) => theme.colors.background2} 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  opacity: ${props => props.loaded ? 0 : 1};
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const ImageOptimizer = ({ 
  src, 
  alt, 
  width, 
  height, 
  placeholder,
  rounded = false,
  lazy = true,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleError = () => setError(true);

  return (
    <ImageContainer rounded={rounded} {...props}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loaded={loaded}
        loading={lazy ? "lazy" : "eager"}
        onLoad={handleLoad}
        onError={handleError}
      />
      {!loaded && !error && <PlaceholderDiv loaded={loaded} />}
      {error && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100%',
          color: '#666'
        }}>
          Failed to load image
        </div>
      )}
    </ImageContainer>
  );
};

export default ImageOptimizer;
