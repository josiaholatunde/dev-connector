import React from "react";
import "./Navbar.scss";

const Footer = () => {
  return (
    <footer className="bg-primary">
      Copyright &copy; {new Date().getFullYear()} DevConnector
    </footer>
  );
};
export default Footer;
