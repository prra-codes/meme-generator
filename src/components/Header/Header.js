import React from "react";
import "./Header.css";
import trollFace from "../../images/troll-face.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={trollFace} alt="troll face" className="header--image" />
      <p className="header--title ">Meme Generator</p>
    </header>
  );
};

export default Header;
