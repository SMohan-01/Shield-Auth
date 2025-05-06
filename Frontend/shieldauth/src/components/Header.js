import React, { useContext } from "react";
import "../styles/Header.css";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="header-container">
      <img
        src="/images/Home 2.png"
        alt="Shield Auth"
        className="header-image"
      />

      <h5>
        Hey {userData ? userData.name : "Developer"},{" "}
        <span role="img" aria-label="hi">
          👋
        </span>
      </h5>

      <h1>Welocme To Shield Auth</h1>

      <p>
        Shield Auth is your secure gateway for Authentication. Join us to
        experience seamless control and automation!
      </p>

      <button className="get-started-btn">Get Started</button>
    </div>
  );
};

export default Header;
