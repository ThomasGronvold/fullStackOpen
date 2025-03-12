const dummy = (blogs) => {
    if (blogs.length === 0) { return 1; }
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favBlog = (blogs) => {
    if (blogs.length === 0) { return null; }
    const mostLikedBlogPost = blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0]);
    const postToBeReturned = {
        title: mostLikedBlogPost.title,
        author: mostLikedBlogPost.author,
        likes: mostLikedBlogPost.likes
    };
    return postToBeReturned;
};

const authorMostPosts = (blogs) => {
    if (blogs.length === 0) { return null; }

    let authorCounts = {};

    blogs.forEach((blog) => {
        if (authorCounts[blog.author]) {
            authorCounts[blog.author]++;
        } else {
            authorCounts[blog.author] = 1;
        }
    });

    let authorWithMostBlogs = "";
    let mostBlogs = 0;

    for (let author in authorCounts) {
        if (authorCounts[author] > mostBlogs) {
            mostBlogs = authorCounts[author];
            authorWithMostBlogs = author;
        }
    };

    return {
        author: authorWithMostBlogs,
        blogs: mostBlogs
    };
};

const authorMostLikes = (blogs) => {
    if (blogs.length === 0) { return null; }

    let authorCounts = {};

    blogs.forEach((blog) => {
        if (authorCounts[blog.author]) {
            authorCounts[blog.author]++;
        } else {
            authorCounts[blog.author] = 1;
        }
    });

    let authorWithMostBlogs = "";
    let mostBlogs = 0;

    for (let author in authorCounts) {
        if (authorCounts[author] > mostBlogs) {
            mostBlogs = authorCounts[author];
            authorWithMostBlogs = author;
        }
    };

    const reduceBlogPosts = blogs.filter(blogs => blogs.author === authorWithMostBlogs)
        .reduce((num, current) => num += current.likes, 0);

    return {
        author: authorWithMostBlogs,
        likes: reduceBlogPosts
    };
};

module.exports = {
    totalLikes,
    favBlog,
    authorMostPosts,
    authorMostLikes,
    dummy
};