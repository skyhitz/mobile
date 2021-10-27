import React from 'react';

function Icon({ color, size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color ? color : 'currentColor'}
      viewBox="0 0 24 24"
      width={'6%'}
      height={'6%'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 15l7-7 7 7"
      ></path>
    </svg>
  );
}

export default Icon;