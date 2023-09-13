import React from "react";

export const BagIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.5139 21.5003H8.16604C5.09968 21.5003 2.74727 20.3927 3.41547 15.9351L4.1935 9.89387C4.6054 7.66962 6.02416 6.81836 7.26901 6.81836H17.4475C18.7107 6.81836 20.047 7.73369 20.523 9.89387L21.3011 15.9351C21.8686 19.8893 19.5802 21.5003 16.5139 21.5003Z"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="stroke-gray-600 group-hover:stroke-white"
      />
      <path
        d="M16.6512 6.59873C16.6512 4.21265 14.7169 2.27836 12.3309 2.27836V2.27836C11.1819 2.27349 10.0782 2.72652 9.26406 3.53727C8.44987 4.34803 7.99218 5.44971 7.99219 6.59873H7.99219"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="stroke-gray-600 group-hover:stroke-white"
      />
      <path
        d="M15.2965 11.1022H15.2507"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="stroke-gray-600 group-hover:stroke-white"
      />
      <path
        d="M9.4659 11.1022H9.42013"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="stroke-gray-600 group-hover:stroke-white"
      />
    </svg>
  );
};
