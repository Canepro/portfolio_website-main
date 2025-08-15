// src/components/OptimizedImage/OptimizedImage.js

import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const ImageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['enableHover'].includes(prop),
})`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${props => props.enableHover ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.enableHover ? '0 8px 25px rgba(0, 0, 0, 0.15)' : 'none'};
  }
`;

const BlurOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => !['loading'].includes(prop),
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: ${props => props.loading ? 0.7 : 0};
  transition: opacity 0.3s ease;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: ${props => props.loading ? 'spin 1s linear infinite' : 'none'};
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const StyledImage = styled(Image).withConfig({
  shouldForwardProp: (prop) => !['loaded'].includes(prop),
})`
  transition: filter 0.3s ease;
  filter: ${props => props.loaded ? 'blur(0px)' : 'blur(8px)'};
`;

// Generate a simple geometric blur placeholder
const generateBlurDataURL = (width = 400, height = 300) => {
  // Create a simple SVG with geometric pattern
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:#764ba2;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#667eea;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="20%" cy="30%" r="15%" fill="rgba(255,255,255,0.1)"/>
      <circle cx="80%" cy="70%" r="10%" fill="rgba(255,255,255,0.1)"/>
      <rect x="10%" y="10%" width="30%" height="20%" fill="rgba(255,255,255,0.05)" rx="5"/>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  enableHover = true,
  placeholder = true,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoaded(true);
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    // Could set an error state here if needed
  };

  const blurDataURL = placeholder ? generateBlurDataURL(width, height) : undefined;

  return (
    <ImageContainer enableHover={enableHover} className={className}>
      <StyledImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        loaded={loaded}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={placeholder ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        quality={85}
        style={{
          objectFit: 'cover',
          ...props.style
        }}
        {...props}
      />
      {placeholder && <BlurOverlay loading={loading} />}
    </ImageContainer>
  );
};

export default OptimizedImage;
