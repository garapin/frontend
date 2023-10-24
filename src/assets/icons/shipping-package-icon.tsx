import React from "react";

export const ShippingPackageIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 19.5C7.10455 19.5 8 18.6046 8 17.5C8 16.3954 7.10455 15.5 6 15.5C4.89543 15.5 4 16.3954 4 17.5C4 18.6046 4.89543 19.5 6 19.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M17.5 19.5C18.6046 19.5 19.5 18.6046 19.5 17.5C19.5 16.3954 18.6046 15.5 17.5 15.5C16.3954 15.5 15.5 16.3954 15.5 17.5C15.5 18.6046 16.3954 19.5 17.5 19.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M4 17.5H1V5.5H15.5V17.5H8"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5 17.5V9H19.7857L23 13.25V17.5H19.9056"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
