const Blog = ({ blogs, user, handleLogout }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in.
        <button onClick={handleLogout}>Logout</button>
      </p>

      {blogs.map((blog) => (
        <div key={blog.id} className="blog">
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          {/* <button onClick={toggleImportance}>{label}</button> */}
        </div>
      ))}
    </div>
  );
};

export default Blog;
