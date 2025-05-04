import React from "react";
import logo from "../assets/PNU_signature.jpg";  // .ai 파일은 브라우저에서 직접 쓰기 어려워 jpg를 사용
import "./Header.css";

const Header: React.FC = () => (
  <header className="app-header">
    <img src={logo} alt="PNU 로고" />
  </header>
);

export default Header;