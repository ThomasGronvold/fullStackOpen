import { useState } from "react";

const Blog = ({ blog, user, handleLikes, handleDeleteBlog }) => {
   const [visible, setVisible] = useState(false);

   return (
      <div className="blog">
         <div key={blog.id} className="blogStyle">
            <h3 data-testid="blog-title">{blog.title}</h3>
            <p data-testid="blog-author">{blog.author}</p>
            <button data-testid="view-blog-button" onClick={() => setVisible(!visible)}>View</button>
            {visible && (
               <>
                  <p data-testid="blog-url">{blog.url}</p>
                  <p>
                     Likes: <span data-testid="blog-likes">{blog.likes}</span> 
                     <button data-testid="like-blog-button" onClick={() => handleLikes(blog.id, blog.likes)}>Like</button>
                  </p>
                  {user.username === blog.user.username && <button data-testid="delete-blog-button" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>}
               </>
            )}
         </div>
      </div>
   );
};

export default Blog;
