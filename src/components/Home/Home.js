import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import logo from "../Home/digital.png";
import Topnav from "../topNav/topnav";
const Home = () => {
  return (
    <div style={{ display: "flex" }}>
        <div style={{flex: 1}}>
        <Topnav />
<div style={{display:"flex", flex: 1}}>
      <Sidebar  />

      <div className="content" style={{ flex: 1,textAlign: "center" }}>
        <div style={{ marginTop: "30px" }}>
          <img
            src={logo}
            alt="Digitalflake Logo"
            style={{ maxWidth: "300px", }}
          />
          <h1>Welcome to digital Admin</h1>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
