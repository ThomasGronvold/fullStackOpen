import { useState } from "react";

const Blog = ({ blog, user, handleLikes, handleDeleteBlog }) => {
   const [visible, setVisible] = useState(false);

   return (
      <div className="blog">
         <div key={blog.id} className="blogStyle">
            <h3>{blog.title}</h3>
            <p>{blog.author}</p>
            <button onClick={() => setVisible(!visible)}>View</button>
            {visible && (
               <>
                  <p>{blog.url}</p>
                  <p>{blog.likes} <button onClick={() => handleLikes(blog.id, blog.likes)}>Like</button></p>
                  {user.username === blog.user.username && <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>}
               </>
            )}
         </div>
      </div>
   );
};

export default Blog;
