const Blog = require('../models/blogs');
const User = require('../models/users');
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

const initialUsers = [
    {
        username: "Harry",
        name: "Potter",
        password: "abc*123"
    },
    {
        username: "Benjamin",
        name: "Franklin",
        password: "abc*123"
    }
];

const createInitialBlogs = async () => {

    return [
        {
            title: 'The rose that died',
            author: 'William Johnson',
            url: 'www.helloworld.gov.no.com.se',
            likes: 34,
        },
        {
            title: 'Somewhere over the rainbow',
            author: 'John Snow',
            url: 'www.helloworld.gov.no.com.se',
            likes: 15,
        }
    ];
};

module.exports = {
    initialUsers, createInitialBlogs, blogsInDb, usersInDb,
};