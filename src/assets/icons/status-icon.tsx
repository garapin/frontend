import React from "react";

export const StatusIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.66634 4.66667C3.40271 4.66667 3.99967 4.0697 3.99967 3.33333C3.99967 2.59695 3.40271 2 2.66634 2C1.92996 2 1.33301 2.59695 1.33301 3.33333C1.33301 4.0697 1.92996 4.66667 2.66634 4.66667Z"
        fill="#52525B"
        stroke="#52525B"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M2.66667 8.66634C3.03486 8.66634 3.33333 8.36787 3.33333 7.99967C3.33333 7.63147 3.03486 7.33301 2.66667 7.33301C2.29848 7.33301 2 7.63147 2 7.99967C2 8.36787 2.29848 8.66634 2.66667 8.66634Z"
        fill="#52525B"
        stroke="#52525B"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M2.66667 13.3333C3.03486 13.3333 3.33333 13.0349 3.33333 12.6667C3.33333 12.2985 3.03486 12 2.66667 12C2.29848 12 2 12.2985 2 12.6667C2 13.0349 2.29848 13.3333 2.66667 13.3333Z"
        fill="#52525B"
        stroke="#52525B"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M6.66699 8H14.667"
        stroke="#52525B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66699 12.667H14.667"
        stroke="#52525B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66699 3.33301H14.667"
        stroke="#52525B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
