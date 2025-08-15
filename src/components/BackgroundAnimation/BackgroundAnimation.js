import React from 'react';

const BackgroundAnimation = () => (
  <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', pointerEvents: 'none', opacity: 0.35 }}>
    <svg
      className="BgAnimation__svg"
      viewBox="0 0 602 602"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <g stroke="url(#grad)" strokeWidth="1.5">
        <rect x="50" y="50" width="180" height="180" rx="12">
          <animate attributeName="x" values="50;70;50" dur="8s" repeatCount="indefinite" />
          <animate attributeName="y" values="50;70;50" dur="8s" repeatCount="indefinite" />
        </rect>
        <rect x="220" y="220" width="160" height="160" rx="12" opacity="0.7">
          <animate attributeName="x" values="220;240;220" dur="10s" repeatCount="indefinite" />
          <animate attributeName="y" values="220;200;220" dur="10s" repeatCount="indefinite" />
        </rect>
        <rect x="380" y="80" width="120" height="120" rx="12" opacity="0.5">
          <animate attributeName="x" values="380;360;380" dur="7s" repeatCount="indefinite" />
          <animate attributeName="y" values="80;100;80" dur="7s" repeatCount="indefinite" />
        </rect>
      </g>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#13ADC7" />
          <stop offset="100%" stopColor="#945DD6" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default BackgroundAnimation;
