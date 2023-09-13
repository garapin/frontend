import React from "react";

export const CartIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        d="M2.75 3.25L4.83 3.61L5.793 15.083C5.87 16.02 6.653 16.739 7.593 16.736H18.502C19.399 16.738 20.16 16.078 20.287 15.19L21.236 8.632C21.342 7.899 20.833 7.219 20.101 7.113C20.037 7.104 5.164 7.099 5.164 7.099"
        className="stroke-gray-600 group-hover:stroke-white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.125 10.7949H16.898"
        className="stroke-gray-600 group-hover:stroke-white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.15435 20.2021C7.45535 20.2021 7.69835 20.4461 7.69835 20.7461C7.69835 21.0471 7.45535 21.2911 7.15435 21.2911C6.85335 21.2911 6.61035 21.0471 6.61035 20.7461C6.61035 20.4461 6.85335 20.2021 7.15435 20.2021Z"
        fill="#8692A6"
        className="stroke-gray-600 group-hover:stroke-white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.4346 20.2021C18.7356 20.2021 18.9796 20.4461 18.9796 20.7461C18.9796 21.0471 18.7356 21.2911 18.4346 21.2911C18.1336 21.2911 17.8906 21.0471 17.8906 20.7461C17.8906 20.4461 18.1336 20.2021 18.4346 20.2021Z"
        fill="#8692A6"
        className="stroke-gray-600 group-hover:stroke-white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
