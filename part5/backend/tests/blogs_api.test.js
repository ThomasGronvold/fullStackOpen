const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blogs");
const User = require("../models/users");
const loginRouter = require("../controllers/login");

describe('resets the DB after each test', () => {
  let firstUser;
  let blogs;
  let token;

  beforeAll(async () => {
    blogs = (await helper.createInitialBlogs());

    const loginUser = {
      username: "Harry",
      password: "abc*123"
    };

    loginResult = await api
      .post("/api/login")
      .send(loginUser);

    token = loginResult.body.token;
  });

  beforeEach(async () => {
    firstUser = await User.findOne();
    await Blog.deleteMany();

    for (const blogPost of blogs) {
      const res = await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(blogPost)
        .expect(201);
    }
  });

  /* GET REQUEST TESTS */
  describe("Accessing information from blogs", () => {

    test("blogs are returned as json and correct number of posts", async () => {
      const res = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const numOfBlogs = res.body.length;
      expect(numOfBlogs).toBe(blogs.length);
    });

    test("blogs has identifier field named 'id'", async () => {
      const res = await api.get("/api/blogs");

      await Promise.all(
        res.body.map((blogPost) => expect(blogPost.id).toBeDefined())
      );
    });
  });

  /* POST REQUEST TESTS */
  describe("Creating a new Blog", () => {

    test("blogs can successfully create a new blogPost", async () => {

      const newBlog = {
        title: "The time I went to the North Pole",
        author: "Kim Possible",
        url: "Randomwebsite.com.no.gov",
        likes: 32,
      };

      await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const afterAddingPost = await helper.blogsInDb();
      expect(afterAddingPost).toHaveLength(blogs.length + 1);
    });

    test("blogs will automatically set likes to 0 if field is not set", async () => {

      const newBlog = {
        title: "If the likes are",
        author: "0",
        url: "then the likes works as it should",
      };

      await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const afterAddingPost = await helper.blogsInDb();
      const lastPost = afterAddingPost.length - 1;
      expect(afterAddingPost[lastPost].likes).toBe(0);
    });

    test("blogs will res with status code 400 when title or url is missing", async () => {

      /* Tests when title is missing */
      const newBlogTitleMissing = {
        author: "John Simmons",
        url: "www.thisIsATest.com",
        likes: 43
      };

      await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogTitleMissing)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      /* Tests when url is missing */
      const newBlogURLMissing = {
        title: "John Simmons",
        author: "Samantha Simmons",
        likes: 43
      };

      await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogURLMissing)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const afterAddingPost = await helper.blogsInDb();
      expect(afterAddingPost.length).toBe(blogs.length);
    });
  });

  test("blogs will respond with 401 if token is not provided", async () => {

    const newBlog = {
      title: "The time I went to the North Pole",
      author: "Kim Possible",
      url: "Randomwebsite.com.no.gov",
      likes: 32,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  describe("Deletion of blogs", () => {
    test("Deleting a specific blog", async () => {

      const postToDelete = (await helper.blogsInDb())[0];

      const res = await api
         .set('Authorization', `Bearer ${token}`)
         .delete(`/api/blogs/${postToDelete.id}`)
         .expect(204);

      const dbLengthAfter = await helper.blogsInDb();

      expect(dbLengthAfter).toHaveLength(blogs.length - 1);
    });
  });


  /* Deleting blogs */
  test("Deleting a specific blog, that you do not own", async () => {

    const postToDelete = (await helper.blogsInDb())[0];

    const loginUser = {
      username: "Harry",
      password: "abc*123"
    };

    loginResult = await api
      .post("/api/login")
      .send(loginUser);

    token = loginResult.body.token;


    await api
      .set('Authorization', `Bearer ${token}`)
      .delete(`/api/blogs/${postToDelete.id}`)
      .expect(204);

    const dbLengthAfter = await helper.blogsInDb();

    expect(dbLengthAfter).toHaveLength(blogs.length - 1);
  });

  /* Updating blogs (put req) */
  describe("Updateing blogs", () => {
    test("Updating a specific blog", async () => {
      const blogsInDb = await helper.blogsInDb();

      const updatedBlog = {
        likes: (blogsInDb[0].likes + 1)
      };

      await api
        .put(`/api/blogs/${blogsInDb[0].id}`)
        .send(updatedBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const dbLikesAfter = (await helper.blogsInDb())[0];

      expect(dbLikesAfter.likes).toBe(blogsInDb[0].likes + 1);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
}, 100000);