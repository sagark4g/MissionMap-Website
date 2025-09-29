import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function DumbbellIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" 
        fill={color}
      />
    </svg>
  );
}

export function TargetIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="2" fill={color}/>
    </svg>
  );
}

export function WalletIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M21 7V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M16 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" 
        fill={color}
      />
      <path 
        d="M21 7H7v10h14V7z" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
  );
}

export function HeartIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
        fill={color}
      />
    </svg>
  );
}

export function CompassIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill={color}/>
    </svg>
  );
}

export function BookIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
  );
}

export function getPackIcon(iconName: string, props: IconProps) {
  switch (iconName) {
    case 'dumbbell':
      return <DumbbellIcon {...props} />;
    case 'target':
      return <TargetIcon {...props} />;
    case 'wallet':
      return <WalletIcon {...props} />;
    case 'heart':
      return <HeartIcon {...props} />;
    case 'compass':
      return <CompassIcon {...props} />;
    case 'book':
      return <BookIcon {...props} />;
    default:
      return <TargetIcon {...props} />;
  }
}