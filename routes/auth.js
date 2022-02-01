const express = require("express");

const {
  getLogin,
  postLogin,
  getSignUp,
  postLogout,
  postSignUp,
} = require("./../controllers/auth");

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

authRouter.post("/logout", postLogout);

authRouter.get("/signup", getSignUp);
authRouter.post("/signup", postSignUp);

module.exports = {
  authRouter,
};
