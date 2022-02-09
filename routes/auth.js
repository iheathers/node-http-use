const express = require("express");

const {
  getLogin,
  getReset,
  postLogin,
  getSignUp,
  postReset,
  postLogout,
  postSignUp,
  getNewPassword,
  postNewPassword,
} = require("./../controllers/auth");

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

authRouter.post("/logout", postLogout);

authRouter.get("/signup", getSignUp);
authRouter.post("/signup", postSignUp);

authRouter.get("/reset", getReset);
authRouter.post("/reset", postReset);

authRouter.get("/reset/:token", getNewPassword);
authRouter.post("/new-password", postNewPassword);

module.exports = {
  authRouter,
};
