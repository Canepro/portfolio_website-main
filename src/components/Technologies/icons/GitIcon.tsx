import React from 'react';

// Simple Git logo (inline SVG) to visually distinguish GitOps/IaC from Cloud & Architecture.
// Source is an original simplified path inspired by the Git mark; kept lightweight for UI use.
const GitIcon: React.FC = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Git"
  >
    <path
      d="M26.3 4.8c-1.3-1.3-3.3-1.3-4.6 0L4.8 21.7c-1.3 1.3-1.3 3.3 0 4.6l16.9 16.9c1.3 1.3 3.3 1.3 4.6 0l16.9-16.9c1.3-1.3 1.3-3.3 0-4.6L26.3 4.8Z"
      fill="#F05033"
    />
    <path
      d="M23.9 14.2c1.6 0 2.9 1.3 2.9 2.9 0 .6-.2 1.2-.5 1.7l4.7 4.7c.5-.3 1.1-.5 1.7-.5 1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9-2.9-1.3-2.9-2.9c0-.3 0-.5.1-.8l-5.4-5.4h-.1c-.3 0-.6 0-.8-.1l-5.3 5.3c.1.3.1.5.1.8 0 1.6-1.3 2.9-2.9 2.9S12 29.7 12 28.1s1.3-2.9 2.9-2.9c.6 0 1.2.2 1.7.5l5-5c-.3-.5-.5-1.1-.5-1.7 0-1.6 1.3-2.9 2.9-2.9Z"
      fill="#fff"
      opacity="0.95"
    />
  </svg>
);

export default GitIcon;
