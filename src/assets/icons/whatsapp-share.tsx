import React from "react";

export const WhatsappShareIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
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
        d="M22 6.55C21.9888 6.11857 21.9554 5.68801 21.9 5.26C21.8253 4.88512 21.7009 4.52191 21.53 4.18C21.3513 3.8091 21.1112 3.47103 20.82 3.18C20.5261 2.8922 20.1886 2.65259 19.82 2.47C19.4776 2.30244 19.1144 2.18137 18.74 2.11C18.3161 2.0465 17.8886 2.00976 17.46 2H6.55C6.11857 2.01124 5.68801 2.04461 5.26 2.1C4.88512 2.17467 4.52191 2.2991 4.18 2.47C3.8091 2.64874 3.47103 2.88877 3.18 3.18C2.8922 3.47391 2.65259 3.81139 2.47 4.18C2.30244 4.52236 2.18137 4.88558 2.11 5.26C2.0465 5.68393 2.00976 6.11145 2 6.54C2 6.73 2 7 2 7.08V16.92C2 17.03 2 17.27 2 17.45C2.01124 17.8814 2.04461 18.312 2.1 18.74C2.17467 19.1149 2.2991 19.4781 2.47 19.82C2.64874 20.1909 2.88877 20.529 3.18 20.82C3.47391 21.1078 3.81139 21.3474 4.18 21.53C4.52236 21.6976 4.88558 21.8186 5.26 21.89C5.68393 21.9535 6.11145 21.9902 6.54 22H17.45C17.8814 21.9888 18.312 21.9554 18.74 21.9C19.1149 21.8253 19.4781 21.7009 19.82 21.53C20.1909 21.3513 20.529 21.1112 20.82 20.82C21.1078 20.5261 21.3474 20.1886 21.53 19.82C21.6976 19.4776 21.8186 19.1144 21.89 18.74C21.9535 18.3161 21.9902 17.8886 22 17.46C22 17.27 22 17.03 22 16.92V7.08C22 7 22 6.73 22 6.55ZM12.23 19C11.0291 18.9941 9.84913 18.6845 8.8 18.1L5 19.1L6 15.38C5.35511 14.2965 5.00999 13.0609 5 11.8C5.00398 10.3829 5.4272 8.99872 6.21636 7.82171C7.00552 6.6447 8.12532 5.72753 9.43473 5.18572C10.7441 4.6439 12.1846 4.50167 13.5747 4.77694C14.9648 5.05221 16.2423 5.73266 17.2464 6.7326C18.2505 7.73255 18.9363 9.00725 19.2173 10.3962C19.4984 11.7851 19.3622 13.2262 18.8258 14.5378C18.2894 15.8495 17.3769 16.9731 16.2032 17.7671C15.0295 18.5612 13.647 18.9901 12.23 19ZM12.23 5.87C11.1698 5.88213 10.1318 6.17498 9.22156 6.71874C8.31135 7.26249 7.56148 8.03773 7.0483 8.96552C6.53512 9.89331 6.27695 10.9405 6.30008 12.0005C6.32322 13.0605 6.62683 14.0955 7.18 15L7.32 15.23L6.72 17.42L9 16.8L9.22 16.93C10.1296 17.4658 11.1644 17.7521 12.22 17.76C13.8113 17.76 15.3374 17.1279 16.4626 16.0026C17.5879 14.8774 18.22 13.3513 18.22 11.76C18.22 10.1687 17.5879 8.64258 16.4626 7.51736C15.3374 6.39214 13.8113 5.76 12.22 5.76L12.23 5.87ZM15.73 14.39C15.599 14.6085 15.4236 14.797 15.2152 14.9434C15.0068 15.0898 14.7699 15.1909 14.52 15.24C14.1465 15.3083 13.7621 15.2842 13.4 15.17C13.0593 15.0635 12.7254 14.9366 12.4 14.79C11.1637 14.1697 10.1094 13.2394 9.34 12.09C8.92188 11.5575 8.66819 10.9145 8.61 10.24C8.60405 9.95979 8.65705 9.68145 8.76558 9.42305C8.87412 9.16464 9.03575 8.93192 9.24 8.74C9.30016 8.67179 9.37397 8.61696 9.45665 8.57906C9.53934 8.54117 9.62905 8.52105 9.72 8.52H10C10.11 8.52 10.26 8.52 10.4 8.83C10.54 9.14 10.91 10.07 10.96 10.16C10.9846 10.208 10.9974 10.2611 10.9974 10.315C10.9974 10.3689 10.9846 10.422 10.96 10.47C10.9158 10.5787 10.8551 10.6799 10.78 10.77C10.69 10.88 10.59 11.01 10.51 11.09C10.43 11.17 10.33 11.27 10.43 11.45C10.7021 11.9092 11.0389 12.3268 11.43 12.69C11.8559 13.0664 12.3429 13.3673 12.87 13.58C13.05 13.67 13.16 13.66 13.26 13.58C13.36 13.5 13.71 13.06 13.83 12.88C13.95 12.7 14.07 12.73 14.23 12.79C14.39 12.85 15.28 13.28 15.46 13.37C15.64 13.46 15.75 13.5 15.8 13.58C15.8434 13.8417 15.8193 14.1102 15.73 14.36V14.39Z"
        fill="#008000"
      />
    </svg>
  );
};
