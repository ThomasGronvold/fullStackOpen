import { useState } from "react";

const CreateBlog = ({ handleAddNewBlog }) => {

   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const [url, setUrl] = useState("");

   const newBlogPost = (e) => {
      e.preventDefault();
      handleAddNewBlog({
         title,
         author,
         url,
      });
      setTitle("");
      setAuthor("");
      setUrl("");
   };

   return (
      <div>
         <h2>Create New</h2>
         <form onSubmit={newBlogPost}>
            <table>
               <tbody>
                  <tr>
                     <td>
                        <label htmlFor="title">Title: </label>
                     </td>
                     <td>
                        <input
                           type="text"
                           name="title"
                           id="title"
                           data-testid="title"
                           onChange={({ target }) => setTitle(target.value)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label htmlFor="author">Author: </label>
                     </td>
                     <td>
                        <input
                           type="text"
                           name="author"
                           id="author"
                           data-testid="author"
                           onChange={({ target }) => setAuthor(target.value)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label htmlFor="url">URL: </label>
                     </td>
                     <td>
                        <input
                           type="text"
                           name="url"
                           id="url"
                           data-testid="url"
                           onChange={({ target }) => setUrl(target.value)}
                        />
                     </td>
                  </tr>
               </tbody>
            </table>
            <button>Add</button>
         </form>
      </div>
   );
};

export default CreateBlog;
