import React from "react";
import logoIcon from "../../assets/image/logo-icon.png";
export default function LogoIcon() {
  return (
    <div className="hidden md:block ">
      <a href="">
        <img src={logoIcon} alt="logo" className="w-24" />
      </a>
    </div>
  );
}
