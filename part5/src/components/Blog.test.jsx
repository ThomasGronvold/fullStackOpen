import { render, screen } from '@testing-library/react';
import Blog from './Blog';
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
   renderedComponent = render(<Blog blog={blog} user={user} handleLikes={mockHandler}/>);
});

// 5.13: Blog List Tests, step 1
test('blog renders only title and author by default', () => {
   // Should be rendered
   const titleElement = screen.getByText(blog.title);
   const authorElement = screen.getByText(blog.author);

   // Should not be rendered
   const urlElement = screen.queryByText(blog.url);
   const likesElement = screen.queryByText(blog.likes);

   expect(titleElement).toBeDefined(); 
   expect(authorElement).toBeDefined(); 

   expect(urlElement).toBeNull();
   expect(likesElement).toBeNull();
});

//5.14: Blog List Tests, step 2
test('blog renders url and likes when view button is clicked', async () => {
   const user = userEvent.setup();
   const button = screen.getByText('View');
   await user.click(button);

   const urlElement = screen.getByText(blog.url);
   const likesElement = screen.getByText(blog.likes);

   expect(urlElement).toBeDefined();
   expect(likesElement).toBeDefined();
});

// 5.15: Blog List Tests, step 3
test('clicking like button on blogpost twice calls event handler (mockhandler) twice', async () => {
   const user = userEvent.setup();
   const button = screen.getByText('View');
   await user.click(button);

   const likeButton = screen.getByText('Like');
   await user.click(likeButton);
   await user.click(likeButton);

   expect(mockHandler).toHaveBeenCalledTimes(2);
});

// 5.16: Blog List Tests, step 4 - see CreateBlog.test.jsx