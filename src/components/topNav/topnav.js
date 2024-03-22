import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "../../assets/profile.png";
import logo from "../../assets/logo.png";

const Topnav = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };
  // const toggleDropdown = () => {
  //   setDropdownVisible(!dropdownVisible); // Toggle the visibility state
  // };
  
  return (
    <div>
      <nav
        className="navbar navbar-light "
        style={{ backgroundColor: "#662671" }}
      >
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            width="170"
            height="45"
            className="d-inline-block align-top"
            alt="Profile"
          />
        </a>
    
          <img
            src={person}
            width="50"
            height="40"
            className="d-inline-block align-top"
            alt="Profile"
          />
        
        <button
        className="btn btn-outline-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
      </nav>
      {dropdownVisible && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "50px",
            right: "20px",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Topnav;
