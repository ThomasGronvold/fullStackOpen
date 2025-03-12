import { log } from "console";

async function createUser(request, name, username, password) {
   let test = await request.post('/api/users', {
      data: {
         name: name,
         username: username,
         password: password
      }
   });
   console.log("test: ", test);
}

async function login(page, username, password) {
   await page.locator('#username').fill(username);
   await page.locator('#password').fill(password);
   await page.getByTestId('login-button').click();
}

async function createBlog(page, title, author, url) {
   await page.getByTestId('add-blog-button').click();
   await page.locator('#title').fill(title);
   await page.locator('#author').fill(author);
   await page.locator('#url').fill(url);
   await page.getByTestId('create-blog').click();
}

export { createUser, login, createBlog };