import { FacebookShareIconSVG } from "@/assets/icons/facebook-share";
import { FacebookSocialIconSVG } from "@/assets/icons/facebook-social-icon";
import { TwitterShareIconSVG } from "@/assets/icons/twitter-share";
import { WhatsappShareIconSVG } from "@/assets/icons/whatsapp-share";
import { IconButton } from "@mui/material";
import React from "react";

const SocialShare = () => {
  return (
    <div className="flex items-center justify-between mb-2">
      <p className="text-lg font-semibold">Share</p>
      <div className="flex items-center gap-1">
        <IconButton
          onClick={() => {
            window.open("https://wa.me/+6281380206100", "_blank");
          }}
        >
          <WhatsappShareIconSVG />
        </IconButton>
        <IconButton>
          <FacebookShareIconSVG />
        </IconButton>
        <IconButton>
          <TwitterShareIconSVG />
        </IconButton>
      </div>
    </div>
  );
};

export default SocialShare;
