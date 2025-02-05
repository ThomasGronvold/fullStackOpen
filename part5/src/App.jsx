/* Imports */
import { useState, useEffect } from "react";
/* Components */
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
/* Services */
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
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
      setNotificationMessage("Wrong credentials");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
      window.localStorage.removeItem("loggedBlogUser");
      setUser(null);
  };

  const handleAddNewBlog = async (newBlog) => {      
      try {
         const blog = await blogService.create(newBlog);
         setBlogs(blogs => [...blogs, blog]);
         // Set notification message then clear it after 5 seconds
         setNotificationMessage(`A new blog ${blog.title} by ${blog.author} added`);
         setTimeout(() => {
         setNotificationMessage(null);
         }, 5000);
      } catch (ex) {
         // Set notification message then clear it after 5 seconds
         setNotificationMessage("Failed to add new blog");
         setTimeout(() => {
         setNotificationMessage(null);
         }, 5000);
      }
   }

  return (
    <div>
      <Notification message={notificationMessage} />

      {user === null ? (
        <Login
         handleLogin={handleLogin}
         setUsername={setUsername}
         setPassword={setPassword}
        />
      ) : (
         <>
           <Blog blogs={blogs} user={user} handleLogout={handleLogout} />
           <CreateBlog handleAddNewBlog={handleAddNewBlog} />
         </>
      )}
    </div>
  );
};

export default App;
