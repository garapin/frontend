import React from "react";

export const CustomerIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
        stroke="#52525B"
        stroke-width="2"
        stroke-miterlimit="10"
      />
      <path
        d="M1.93652 13.4994C2.55125 12.4354 3.43516 11.5519 4.49945 10.9376C5.56375 10.3234 6.77095 9.99999 7.99978 10C9.22862 10 10.4358 10.3234 11.5001 10.9377C12.5644 11.552 13.4483 12.4355 14.063 13.4995"
        stroke="#52525B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
