import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [message, setMessage] = useState("");

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("https://api-adtu.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ send cookies
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo(data.user); // ✅ store logged-in user in context
        setMessage(data.message);
        setRedirect(true); // ✅ trigger redirect
      } else {
        setMessage(data.error || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Something went wrong");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginPage;


