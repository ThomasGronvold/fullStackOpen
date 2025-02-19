/* Imports */
import { useState, useEffect, useRef } from "react";
/* Components */
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
/* Services */
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [update,setUpdate] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

   useEffect(() => {
      blogService.getAll().then(blogs => setBlogs(blogs))
   }, [update])

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
      setNotificationMessage({ message: "Wrong credentials", type: "error" });
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
         setNotificationMessage({ message: `A new blog ${blog.title} by ${blog.author} added`, type: "success" });
         blogFormRef.current.toggleVisibility();
         setTimeout(() => {
            setNotificationMessage(null);
         }, 5000);
      } catch (ex) {
         // Set notification message then clear it after 5 seconds
         setNotificationMessage({ message: "Failed to add new blog", type: "error" });
         setTimeout(() => {
         setNotificationMessage(null);
         }, 5000);
      }
   }

   const handleLikes = async (id, likes) => {
      await blogService.update({
        id: id,
        likes: likes + 1
      })
      /* +1 the value to update so the like element updates */
      setUpdate(prevUpdate => prevUpdate + 1);
    }

   const handleDeleteBlog = async (id) => {
      try {
         if(window.confirm("Are you sure you want to delete this blog?"))
         {
            await blogService.deleteBlog(id);
            setBlogs(blogs.filter(blog => blog.id !== id));
            setNotificationMessage({ message: "Blog deleted", type: "success" });
            setTimeout(() => {
               setNotificationMessage(null);
         }, 5000);
         }
      } catch (ex) {
         setNotificationMessage({ message: "Failed to delete blog", type: "error" });
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
            <h2>Blogs</h2>
            <p>
               {user.name} logged in.
               <button onClick={handleLogout}>Logout</button>
             </p>

            {blogs
               .sort((a, b) => b.likes - a.likes)
               .map((blog) => (
                  <Blog key={blog.id} blog={blog} user={user} handleLikes={handleLikes} handleDeleteBlog={handleDeleteBlog} />
               ))
            }

            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
               <CreateBlog handleAddNewBlog={handleAddNewBlog} />
            </Togglable>
         </>
      )}
    </div>
  );
};

export default App;
