const { dummy, totalLikes, favBlog, authorMostPosts, authorMostLikes } = require("../utils/list_helper");

describe("dummy test", () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("totalLikes", () => {

  /* Step 1 */
  test("should return 0 for an empty list of blogs", () => {
    const emptyBlogs = [];
    expect(totalLikes(emptyBlogs)).toBe(0);
  });

  /* Step 2 */
  test("should return the total likes from all posts", () => {
    expect(totalLikes(blogs)).toBe(7 + 5 + 12 + 10 + 2);
  });

  /* Step 3 */
  test("should return the blog post with the most likes", () => {
    expect(favBlog(blogs)).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    );
  });

  /* Step 4 */
  test("should return the author with most posts", () => {
    expect(authorMostPosts(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 3
    });
  });

  /* Step 5 */
  test("should return the author who got the most likes", () => {
    expect(authorMostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: (5 + 12 + 10)
    });
  });
});

/* Dummy blog data */
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Edsger W. Dijkstra",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];