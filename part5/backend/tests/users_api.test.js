const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const User = require("../models/users");

describe("Init before each test", () => {

    beforeEach(async () => {
        await User.deleteMany({});
        const users = await helper.initialUsers;

        for (const user of users) {
            await api
                .post("/api/users")
                .send(user)
                .expect(201)
                .expect("Content-Type", /application\/json/);
        }
    });

    test("New user can be created", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "Tom",
            name: "Bombadil",
            password: "LordOfTheRings"
        };
        
        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test("New user with wrong username requirements", async () => {

        const newUser = {
            username: "To",
            name: "Bombadil",
            password: "LordOfTheRings"
        };

        const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toEqual("Invalid input. Both username and password must be at least 3 characters long.");
    });

    test("New user with wrong password requirements", async () => {
        const newUser = {
            username: "Dr.Bombay",
            name: "Bombadil",
            password: "Lo"
        };

        const res = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(res.body.message).toEqual("Invalid input. Both username and password must be at least 3 characters long.");
    });

    test("New user without unique username", async () => {
        const newUser = {
            username: "Harry",
            name: "Bombadil",
            password: "LordOfTheRings"
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
}, 100000);