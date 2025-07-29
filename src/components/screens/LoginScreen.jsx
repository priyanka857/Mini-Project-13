// src/screens/LoginScreen.jsx
import React, { useState } from "react";
import axios from "axios";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/", // Adjust if your endpoint is different
        { username, password },
        {
          withCredentials: true, // IMPORTANT: allows cookies/session to be sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Login successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setMessage("Login failed: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginScreen;
