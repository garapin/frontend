import { FacebookShareIconSVG } from "@/assets/icons/facebook-share";
import { TwitterShareIconSVG } from "@/assets/icons/twitter-share";
import { WhatsappShareIconSVG } from "@/assets/icons/whatsapp-share";
import React from "react";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

const SocialShare = () => {
  return (
    <div className="flex items-center justify-between mb-2">
      <p className="text-lg font-semibold">Share</p>
      <div className="flex items-center gap-3">
        <WhatsappShareButton
          url={window.location.href}
          className="focus:outline-none"
        >
          <WhatsappShareIconSVG />
        </WhatsappShareButton>
        <FacebookShareButton
          url={window.location.href}
          className="focus:outline-none"
        >
          <FacebookShareIconSVG />
        </FacebookShareButton>
        <TwitterShareButton
          url={window.location.href}
          className="focus:outline-none"
        >
          <TwitterShareIconSVG />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default SocialShare;
