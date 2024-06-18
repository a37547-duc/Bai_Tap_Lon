import React, { useState } from "react";
import LogoIcon from "../logo/LogoIcon";

import Search from "../Search/Search";
import Nav from "../Nav/Nav";

export default function Header() {
  return (
    <header className="z-50 p-3 bg-blue-js sticky flex justify-center  items-center md:bg-white   xl:container xl:mx-auto  ">
      <LogoIcon></LogoIcon>
      <Search></Search>
      <Nav></Nav>
    </header>
  );
}
