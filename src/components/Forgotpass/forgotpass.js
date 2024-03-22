import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "#662671" }}>Did you forget your password</h2>
      <p style={{ color: "#655A5A" }}>
        Enter your email address and we'll send you a link to restore password
      </p>
      <p
        style={{
          color: "#676767",
          fontSize: "16px",
          fontWeight: "400",
          marginRight: "300px",
        }}
      >
        Email Address
      </p>
      <input style={{ width: "500px", height: "50px" }} />
      <br />
      <Button
        style={{ backgroundColor: "#5C218B", width: "530px", height: "50px" }}
      >
        Request reset link
      </Button>
      <p style={{color:"#979595", textAlign: "center"}}>
        <Link to="/" style={{textDecoration: "underline", color: "#979595"}}>Back to log in</Link> {/* Link to navigate to login component */}
      </p>    </div>
  );
};

export default ForgotPass;
