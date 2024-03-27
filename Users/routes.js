// import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function Users(app) {
  app.get("/api/users", async (req, res) => {
    const users = await dao.findAllUsers();
    res.send(users);
  });
  app.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.send(user);
  });
  app.get("/api/users/username/:username", async (req, res) => {
    const username = req.params.username;
    console.log(username);
    const user = await dao.findUserByUsername(username);
    res.send(user);
  });
  app.get(
    "/api/users/username/:username/password/:password",
    async (req, res) => {
      const { username, password } = req.params;
      console.log(username);
      const user = await dao.findUserByCredentials(username, password);
      res.send(user);
    }
  );

  const register = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByUsername(username);
    // const user = await db.users.find((user) => user.username === username);
    if (user) {
      res.send(400);
      return;
    }
    // try {
    console.log("[0] Creating user");
    const newUser = await dao.createUser({ username, password });
    req.session["currentUser"] = newUser;
    res.send(newUser);
    // console.log("[1] Creating user");
    // // db.users.push(newUser);
    // res.send(200);
    // } catch (error) {
    //   res.send(400);
    // }
    // }
  };
  const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    // db.users.find(
    //   (user) => user.username === username && user.password === password
    // );
    if (user) {
      req.session["currentUser"] = user;
      res.send(user);
    } else {
      res.send(401);
    }
  };
  const logout = (req, res) => {
    req.session.destroy();
    res.send("User logged out");
  };
  const profile = (req, res) => {
    // res.send(200);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.send(401);
    }
  };
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.post("/api/users/profile", profile);
}
