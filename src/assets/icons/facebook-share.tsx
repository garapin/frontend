import React from "react";

export const FacebookShareIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        d="M15.1204 5.32H17.0004V2.14C16.0901 2.04535 15.1755 1.99862 14.2604 2C11.5404 2 9.68035 3.66 9.68035 6.7V9.32H6.61035V12.88H9.68035V22H13.3604V12.88H16.4204L16.8804 9.32H13.3604V7.05C13.3604 6 13.6404 5.32 15.1204 5.32Z"
        fill="#091BBC"
      />
    </svg>
  );
};
