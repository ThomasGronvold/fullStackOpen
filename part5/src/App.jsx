/* Imports */
import { useState, useEffect } from "react";
/* Components */
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
/* Services */
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log("Username: " + username, "Password: " + password);
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ? (
        <Login
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <Blog blogs={blogs} user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
