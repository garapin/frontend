import React from "react";

export const NoteIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.096 15.6973H8.87598"
        stroke="#696F79"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.096 11.9355H8.87598"
        stroke="#696F79"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.631 8.17773H8.87598"
        stroke="#696F79"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.11035 12C4.11035 18.937 6.20835 21.25 12.5014 21.25C18.7954 21.25 20.8924 18.937 20.8924 12C20.8924 5.063 18.7954 2.75 12.5014 2.75C6.20835 2.75 4.11035 5.063 4.11035 12Z"
        stroke="#696F79"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
