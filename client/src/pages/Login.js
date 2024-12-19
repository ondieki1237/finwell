import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Importing the CSS file

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("[LOGIN ERROR] Response failed:", data.message);
        throw new Error(data.message || "Login failed");
      }
  
      console.log("[LOGIN SUCCESS] Response:", data);
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      // Call the onLogin prop to update the parent component's state
      onLogin(data.token, data.user);
  
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      console.error("[LOGIN ERROR] Error during login:", err.message);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>

      <div className="signup-link">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
