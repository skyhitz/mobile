import React from 'react';

function Icon({ size = 24, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color ? color : 'currentColor'}
      className="h-6 w-6"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
      ></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
      ></path>
    </svg>
  );
}

export default Icon;
