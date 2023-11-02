const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
// const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

    res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
    const specificBlog = await Blog.findById(req.params.id);

    if (specificBlog) {
        res.json(specificBlog);
    }
    else {
        res.status(404).end();
    }
});

blogsRouter.post("/", async (req, res) => {
    const { title, author, url, likes } = req.body;

    if (!title || !url) return res.status(400).json({ error: "Missing title, url or id" });

    const token = req.token;

    if (!token) {
        return res.status(401).json({ error : "token missing or wrong" })
    }

    const user = req.user;

    if (!user) return res.status(404).json({ error: `User with id: ${user.id} not found.` });

    const newBlogPost = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes ? likes : 0,
        user: user.id
    });

    const savedBlog = await newBlogPost.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, author, url, likes } = req.body;

    const updatedBlog = {};

    if (title) updatedBlog.title = title;
    if (author) updatedBlog.author = author;
    if (url) updatedBlog.url = url;
    if (likes) updatedBlog.likes = likes;

    const didBlogUpdate = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });

    if (didBlogUpdate) {
        res.status(201).json(didBlogUpdate);
    }
});

blogsRouter.delete("/:id", async (req, res) => {

    const blogId = req.params.id;
    const blogPost = await Blog.findById(blogId);

    const user = req.user;

    if (blogPost && user && (blogPost.user.toString() === user._id.toString())) {
        await Blog.findByIdAndDelete(blogId);
        res.status(204).json({ message: `Succsessfully deleted blog with id ${blogId}` });

    } else if (!blogPost) {
        return res.status(404).json({ error: "Blog not found" });
    } else {
        res.status(401).json({ error: "token invalid" });
    }
});

module.exports = blogsRouter;