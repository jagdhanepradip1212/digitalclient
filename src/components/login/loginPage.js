import React, { useState } from "react";
import { Redirect } from "react-router-dom"; // Import Redirect for navigation
import "../login/login.css";
import Home from "../Home/Home";
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.png";
import back from "../../assets/back.jpg";




const LoginPage = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state to track login status
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleLogin = () => {
  //   // Perform your login logic here
  //   // For demonstration purposes, simply check if email and password are non-empty
  //   if (email === "admin" && password === "admin") {
  //     setIsLoggedIn(true); // Set login status to true
  //     navigate("/home"); // Navigate to the home page
  //   }
  // };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Assuming the API returns a token upon successful login
        const token = data.token;

        localStorage.setItem("token", token);
        console.log("Token:", token);

        // Store the token securely (e.g., in a cookie or local storage)
        // You can use a state management library (e.g., Redux) or context API for global state
        alert("login successsful");
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        console.error("Login failed:", data.error);
        alert("login failed");
      }

      // Redirect to the admin dashboard or perform any other actions
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login failure (show error message, etc.)
    }
  };


  // Render Home component if logged in
  if (isLoggedIn) {
    return <Home />;
  }

  // Render login form if not logged in
  return (
    <div className="container"style={{backgroundImage:`url(${back})`, backgroundSize: 'cover'}}>
      <div className="back" >
        <div className="login">
          <img
            src={login}
            alt="loginlogo"
            style={{ width: "250px", height: "100px" }}
          />
          <p style={{ color: "#717070" }}>Welcome to Digitalflake Admin</p>
          <form>
            <div>
              <label htmlFor="username" style={{ marginRight: "200px" }}>
                Email:
              </label>
              <br />
              <input
                type="username"
                id="username"
                value={username}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ marginRight: "200px" }}>
                Password:
              </label>
              <br />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <br />
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
