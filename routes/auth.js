const express = require("express");
const { check, body } = require("express-validator");

const { User } = require("../models/user");

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
authRouter.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom(async (email) => {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
          throw Error("User exists. Please use another email.");
        }

        return true;
      }),
    body(
      "password",
      "The password must be greater than 5 and should not contain any special characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw Error("Password did not match.");
      }
      return true;
    }),
  ],
  postSignUp
);

authRouter.get("/reset", getReset);
authRouter.post("/reset", postReset);

authRouter.get("/reset/:token", getNewPassword);
authRouter.post("/new-password", postNewPassword);

module.exports = {
  authRouter,
};
