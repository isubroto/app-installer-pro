import React from "react";

interface AppIconProps {
  size?: number;
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  size = 48,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle with Gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="url(#bgGradient)"
        filter="url(#glow)"
      />

      {/* Download Arrow */}
      <g transform="translate(100, 60)">
        <path
          d="M -15 0 L -15 40 L -30 40 L 0 70 L 30 40 L 15 40 L 15 0 Z"
          fill="url(#iconGradient)"
          strokeWidth="4"
          stroke="#ffffff"
          strokeLinejoin="round"
        />
      </g>

      {/* Base Platform */}
      <rect
        x="50"
        y="135"
        width="100"
        height="15"
        rx="7.5"
        fill="url(#iconGradient)"
        stroke="#ffffff"
        strokeWidth="3"
      />

      {/* Sparkles */}
      <g opacity="0.9">
        <circle cx="35" cy="40" r="4" fill="#ffffff" />
        <circle cx="165" cy="45" r="3" fill="#ffffff" />
        <circle cx="45" cy="160" r="3" fill="#ffffff" />
        <circle cx="160" cy="155" r="4" fill="#ffffff" />
      </g>
    </svg>
  );
};

export const AppIconSimple: React.FC<AppIconProps> = ({
  size = 48,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="simpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Square with rounded corners */}
      <rect width="200" height="200" rx="40" fill="url(#simpleGradient)" />

      {/* Download Icon */}
      <g transform="translate(100, 70)">
        <path
          d="M -12 0 L -12 35 L -25 35 L 0 60 L 25 35 L 12 35 L 12 0 Z"
          fill="white"
          strokeWidth="3"
          stroke="white"
          strokeLinejoin="round"
        />
      </g>

      {/* Platform */}
      <rect x="60" y="135" width="80" height="12" rx="6" fill="white" />
    </svg>
  );
};
