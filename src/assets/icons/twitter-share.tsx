import React from "react";

export const TwitterShareIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        d="M2.5 17.8811C3.46443 18.4143 10.4457 22.4386 15.41 19.337C20.3741 16.2353 20.1003 10.8916 20.1003 8.443C20.55 7.5009 21.5 7.02195 21.5 4.4719C20.5669 5.3339 19.6394 5.6272 18.7175 5.3518C17.8144 3.97478 16.5718 3.36573 14.9897 3.52467C12.6167 3.76307 11.7485 6.09125 12.004 9.10335C8.34495 10.9537 5.47575 7.762 3.99709 5.3518C3.50304 7.24995 3.02665 9.5288 3.99709 12.0497C4.64405 13.7303 6.19925 15.1512 8.6627 16.3123C6.16615 17.6654 4.11191 18.1883 2.5 17.8811Z"
        fill="#8589F8"
        stroke="#8589F8"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  );
};
