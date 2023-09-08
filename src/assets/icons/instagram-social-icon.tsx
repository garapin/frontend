import React from "react";

export const InstagramSocialIconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (
  props?: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6466 2.27499C14.7563 2.27499 15.1245 2.28563 16.353 2.33682C17.0916 2.34508 17.8232 2.469 18.5159 2.7032C19.0183 2.88023 19.4745 3.15143 19.8553 3.49932C20.236 3.84721 20.5328 4.2641 20.7266 4.72314C20.9829 5.35614 21.1185 6.02461 21.1275 6.69949C21.183 7.82196 21.1952 8.15845 21.1952 10.9998C21.1952 13.8412 21.1836 14.1777 21.1275 15.3002C21.1185 15.9751 20.9829 16.6435 20.7266 17.2765C20.5328 17.7356 20.236 18.1525 19.8553 18.5004C19.4745 18.8482 19.0183 19.1194 18.5159 19.2965C17.8232 19.5307 17.0916 19.6546 16.353 19.6629C15.1251 19.7135 14.7568 19.7247 11.6466 19.7247C8.53643 19.7247 8.16817 19.714 6.94028 19.6629C6.20168 19.6546 5.4701 19.5307 4.77734 19.2965C4.27496 19.1194 3.81871 18.8482 3.43797 18.5004C3.05724 18.1525 2.76044 17.7356 2.5667 17.2765C2.31038 16.6435 2.17476 15.9751 2.16572 15.3002C2.11026 14.1777 2.09806 13.8412 2.09806 10.9998C2.09806 8.15845 2.1097 7.82196 2.16572 6.69949C2.17476 6.02461 2.31038 5.35614 2.5667 4.72314C2.76044 4.2641 3.05724 3.84721 3.43797 3.49932C3.81871 3.15143 4.27496 2.88023 4.77734 2.7032C5.4701 2.469 6.20168 2.34508 6.94028 2.33682C8.16873 2.28614 8.53698 2.27499 11.6466 2.27499ZM11.6466 0.357422C8.4854 0.357422 8.0872 0.369584 6.84489 0.421273C5.87825 0.438842 4.92186 0.606078 4.01642 0.915869C3.2397 1.18327 2.53619 1.6023 1.95497 2.14374C1.36188 2.67501 0.902888 3.3182 0.610062 4.02837C0.271023 4.85571 0.0879975 5.72958 0.0687706 6.61284C0.0133105 7.74696 0 8.11081 0 10.9993C0 13.8878 0.0133104 14.2517 0.0698797 15.3868C0.0891066 16.2701 0.272132 17.144 0.611171 17.9713C0.903672 18.6814 1.36228 19.3246 1.95497 19.8559C2.53651 20.3975 3.24041 20.8165 4.01753 21.0838C4.92297 21.3936 5.87936 21.5608 6.846 21.5784C8.08831 21.6291 8.48485 21.6423 11.6477 21.6423C14.8106 21.6423 15.2072 21.6301 16.4495 21.5784C17.4161 21.5608 18.3725 21.3936 19.2779 21.0838C20.0514 20.8099 20.7537 20.3915 21.3401 19.8553C21.9264 19.3192 22.3839 18.6772 22.6832 17.9703C23.0222 17.143 23.2053 16.2691 23.2245 15.3858C23.28 14.2517 23.2933 13.8878 23.2933 10.9993C23.2933 8.11081 23.28 7.74696 23.2234 6.61182C23.2042 5.72857 23.0211 4.85469 22.6821 4.02736C22.3896 3.31728 21.931 2.6741 21.3383 2.14273C20.7568 1.60117 20.0528 1.18212 19.2757 0.914855C18.3703 0.605064 17.4139 0.437828 16.4473 0.42026C15.2061 0.369584 14.8079 0.357422 11.6466 0.357422Z"
        fill="white"
      />
      <path
        d="M11.6444 5.53516C10.4615 5.53516 9.30517 5.85567 8.32163 6.45615C7.33809 7.05664 6.57151 7.91014 6.11884 8.90871C5.66617 9.90729 5.54773 11.0061 5.7785 12.0662C6.00927 13.1263 6.57889 14.1 7.41532 14.8643C8.25175 15.6286 9.31743 16.149 10.4776 16.3599C11.6378 16.5708 12.8403 16.4625 13.9332 16.0489C15.026 15.6353 15.9601 14.9348 16.6173 14.0362C17.2745 13.1375 17.6252 12.0809 17.6252 11C17.6252 9.55066 16.9951 8.16064 15.8735 7.13578C14.7519 6.11092 13.2306 5.53516 11.6444 5.53516ZM11.6444 14.5473C10.8766 14.5473 10.126 14.3393 9.48756 13.9495C8.84913 13.5597 8.35154 13.0057 8.0577 12.3575C7.76387 11.7093 7.68699 10.9961 7.83678 10.308C7.98658 9.61988 8.35633 8.98781 8.89926 8.49171C9.4422 7.99561 10.1339 7.65776 10.887 7.52089C11.6401 7.38401 12.4207 7.45426 13.1301 7.72275C13.8394 7.99124 14.4458 8.4459 14.8723 9.02925C15.2989 9.61261 15.5266 10.2984 15.5266 11C15.5266 11.9408 15.1176 12.8431 14.3895 13.5084C13.6615 14.1736 12.674 14.5473 11.6444 14.5473Z"
        fill="white"
      />
      <path
        d="M17.8624 6.59703C18.6343 6.59703 19.26 6.02528 19.26 5.32C19.26 4.61471 18.6343 4.04297 17.8624 4.04297C17.0906 4.04297 16.4648 4.61471 16.4648 5.32C16.4648 6.02528 17.0906 6.59703 17.8624 6.59703Z"
        fill="white"
      />
    </svg>
  );
};