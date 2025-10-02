import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Handle non-200 responses (like 400 duplicate user)
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "❌ Registration failed");
        return;
      }

      const data = await response.json();
      setMessage(data.message || "✅ Registration successful!");
    } catch (err) {
      console.error("Frontend error:", err);
      setMessage("⚠️ Something went wrong. Check backend connection.");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        required
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        required
      />

      <button type="submit">Register</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterPage;

