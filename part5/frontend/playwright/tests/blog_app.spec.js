const { test, expect, beforeEach, describe } = require('@playwright/test');
const { createUser, login, createBlog } = require('./helper');

describe('Blog app', () => {
   beforeEach(async ({ page, request }) => {
      await request.post('/api/testing/reset');
      await createUser(request, 'Luke Swimmer', 'Luke', 'Swimmer');
      await page.goto('/');
   });

   test('Login form is shown', async ({ page }) => {
      const loginForm = await page.getByTestId('loginForm');
      await expect(loginForm).toBeVisible();
   });

   describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
         await login(page, 'Luke', 'Swimmer');
         await expect(page.getByText('Luke Swimmer logged in')).toBeVisible();
      });
  
      test('fails with wrong credentials', async ({ page }) => {
         await login(page, 'Luke', 'wrong');
         const errorDiv = await page.locator('.error');
         await expect(errorDiv).toContainText('Wrong credentials');
      });
   });

   describe('When logged in', () => {
      beforeEach(async ({ page }) => {
         await login(page, 'Luke', 'Swimmer');
         await createBlog(page, 'blog can be created title', 'blog can be created author', 'blog can be created url');
      });
    
      test('a new blog can be created', async ({ page }) => {
         await expect(page.getByRole('heading', { name: 'blog can be created title' })).toBeVisible();
         await expect(page.getByText('blog can be created author', { exact: true })).toBeVisible();
      });
   });

   describe('When a blog exists', () => {
      beforeEach(async ({ page }) => {
         await login(page, 'Luke', 'Swimmer');
         await createBlog(page, 'blog can be created title', 'blog can be created author', 'blog can be created url');
         await page.click('text="View"');
      });

      test('a blog can be liked', async ({ page }) => {
         await page.getByTestId('like-blog-button').click();
         await expect(page.getByText('Likes: 1')).toBeVisible();
      });

      test('a blog can be deleted', async ({ page }) => {
         page.on('dialog', async dialog => {
            await dialog.accept();
         });
         await page.getByTestId('delete-blog-button').click();
         const errorDiv = await page.locator('.success');
         await expect(errorDiv).toContainText('Blog deleted');
      });

      test('a blog cannot be deleted by another user', async ({ page, request }) => {
         await page.getByTestId('logout-button').click();
         await createUser(request, 'Winter Warm', 'Winter', 'Warm');
         await login(page, 'Winter', 'Warm');
         await page.click('text="View"');
         await expect(page.getByTestId('delete-blog-button')).not.toBeVisible();
      });

      test('blogs are ordered by likes', async ({ page }) => {
         await page.getByTestId('like-blog-button').click();
         await createBlog(page, 'blog can be created title 2', 'blog can be created author 2', 'blog can be created url 2');
         await expect(page.locator('text="blog can be created title 2"')).toBeVisible();
         await page.locator('text="View"').nth(1).click();
         await page.getByTestId('like-blog-button').nth(1).click();
         await expect(page.getByText('Likes: 1')).toHaveCount(2);
         await page.getByTestId('like-blog-button').nth(1).click();
         await expect(page.getByText('Likes: 2')).toBeVisible();
         const firstBlogTitle = page.locator('.blog').nth(0).locator('role=heading');
         const secondBlogTitle = page.locator('.blog').nth(1).locator('role=heading');
         await expect(firstBlogTitle).toContainText('blog can be created title 2');
         await expect(secondBlogTitle).toContainText('blog can be created title');
      });
   });
});