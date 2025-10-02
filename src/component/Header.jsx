import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUserInfo(data.user); // ✅ store the logged-in user
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching profile:", err);
      });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => setUserInfo(null)); // ✅ clear on logout
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userInfo ? (
          <>
            <span>👋 Hi, {userInfo.username}</span>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;








