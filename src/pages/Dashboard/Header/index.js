import React from "react";

import logo from "../../../assets/Logo.png";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}
