import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // State variables to store username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation if needed
    if (!username || !password) {
      setMessage("Please enter both username and password.");
      return;
    }

    // Send the username and password to the backend for registration
    // You can use fetch or any other method to make a request to your backend API
    // Replace the URL and method with your actual backend endpoint
    fetch("http://localhost:5000/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          // Registration successful, clear the form and display a success message
          setUsername("");
          setPassword("");
          setMessage("Registration successful!");
          navigate("/");

        } else {
          // Registration failed, display an error message
          setMessage("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        setMessage("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        

      </form>
    </div>
  );
};

export default Register;
