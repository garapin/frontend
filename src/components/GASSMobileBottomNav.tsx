import { HomeIconSVG } from "@/assets/icons/home-icon";
import { NoteIconSVG } from "@/assets/icons/note-icon";
import React from "react";

const GASSMobileBottomNav = () => {
  return (
    <div className="fixed bg-white w-screen py-4 bottom-0 left-0 z-40 lg:hidden border-t border-slate-600 border">
      <div className="px-6 flex items-center justify-evenly">
        <div className="text-center">
          <HomeIconSVG />
          <p>Home</p>
        </div>
        <div className="text-center">
          <NoteIconSVG />
          <p>Transaction</p>
        </div>
      </div>
    </div>
  );
};

export default GASSMobileBottomNav;
