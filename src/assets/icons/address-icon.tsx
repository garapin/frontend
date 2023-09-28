import React from "react";

export const AddressIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.67318 7.14064C9.67318 6.21979 8.92702 5.47363 8.00617 5.47363C7.086 5.47363 6.33984 6.21979 6.33984 7.14064C6.33984 8.06081 7.086 8.80697 8.00617 8.80697C8.92702 8.80697 9.67318 8.06081 9.67318 7.14064Z"
        stroke="#52525B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99967 14C6.06766 14 3 10.6391 3 7.06576C3 4.26831 5.23807 2 7.99967 2C10.7613 2 13 4.26831 13 7.06576C13 10.6391 9.93234 14 7.99967 14Z"
        stroke="#52525B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
