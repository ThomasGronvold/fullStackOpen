const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1, likes: 1 });

    res.json(users);
});

usersRouter.post("/", async (req, res) => {
   try {      
      const { username, name, password } = req.body;
    
      if (!username || !password || username.length < 3 || password.length < 3) {
         return res.status(400).json({ message: 'Invalid input. Both username and password must be at least 3 characters long.' });
         }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
         username,
         name,
         passwordHash,
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
   } catch (error) {
      console.log(error);
      res.status(500).end();
   }
    
});

module.exports = usersRouter;