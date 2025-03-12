import { render, screen } from '@testing-library/react';
import CreateBlog from './CreateBlog';
import { beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

let renderedComponent;
const blog = {
   title: 'Blog Title',
   author: 'Blog Author Name',
   url: 'http://example.com',
   likes: 0,
   user: {
      username: 'testuser',
   }
};

const user = {
   username: 'testuser'
};

const mockHandler = vi.fn();

beforeEach(() => {
   renderedComponent = render(<CreateBlog handleAddNewBlog={mockHandler}/>);
});

// 5.16: Blog List Tests, step 4
test('calls "handleAddNewBlog" with the correct blog details when the form is submitted', async () => {
   const userMimic = userEvent.setup();

   const titleInput = screen.getByTestId('title');
   const authorInput = screen.getByTestId('author');
   const urlInput = screen.getByTestId('url');
      
   await userMimic.type(titleInput, blog.title);
   await userMimic.type(urlInput, blog.url);
   await userMimic.type(authorInput, blog.author);

   const addButton = screen.getByText('Add');
   await userMimic.click(addButton);

   expect(mockHandler).toHaveBeenCalledWith({
      title: blog.title,
      author: blog.author,
      url: blog.url
   });
});
