const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const { validationResult } = require("express-validator");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../models/user");

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMsg: req.flash("error")[0],
  });
};

const getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "SignUp",
    path: "/signup",
    errorMsg: req.flash("error")[0],
  });
};

const postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.errors[0].msg);
    return res.redirect("/signup");
  }

  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    email: email,
    password: hashedPassword,
    cart: { items: [] },
  });

  await newUser.save();

  const msg = {
    to: email,
    from: "dexter1@athohn.site", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      const errObj = new Error(error);
      errObj.httpStatusCode = 500;

      return next(errObj);
    });

  res.redirect("/login");
};

const postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const loggedInUser = await User.findOne({ email: email });

    if (loggedInUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        loggedInUser.password
      );

      if (!passwordMatch) {
        req.flash("error", "Incorrect User or Password");
        return res.redirect("/login");
      }

      req.session.isLoggedIn = true;
      req.session.user = loggedInUser;

      await req.session.save();

      return res.redirect("/products");
    }
  } catch (error) {
    const errObj = new Error(error);
    errObj.httpStatusCode = 500;

    return next(errObj);
  }

  req.flash("error", "User does not exist");
  res.redirect("/login");
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("postLogout", { err });

    res.redirect("/login");
  });
};

const getReset = (req, res, next) => {
  res.render("auth/reset", {
    pageTitle: "SignUp",
    path: "/reset",
    errorMsg: req.flash("error")[0],
  });
};

const postReset = async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    req.flash("error", "User does not exist");
    return res.redirect("/reset");
  }

  user.resetExpiration = Date.now() + 3600000;
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;

  await user.save();

  const msg = {
    to: email,
    from: "dexter1@athohn.site", // Change to your verified sender
    subject: "Reset Password",
    text: "Reset Password",
    html: `
	Click <a href="http://localhost:3000/reset/${resetToken}">here<a/> to reset password.
	`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      const errObj = new Error(error);
      errObj.httpStatusCode = 500;

      return next(errObj);
    });

  res.redirect("/login");
};

const getNewPassword = (req, res, next) => {
  const token = req.params.token;

  res.render("auth/new-password", {
    pageTitle: "New Password",
    path: "/new-password",
    token: token,
    errorMsg: req.flash("error")[0],
  });
};

const postNewPassword = async (req, res, next) => {
  const token = req.body.token;
  const oldPassword = req.body.oldPassword;
  const password = req.body.password;

  const user = await User.findOne({
    resetToken: token,
    resetExpiration: { $gt: Date.now() },
  });

  if (!user) {
    req.flash("error", "Invalid token / Token expired ");
    return res.redirect(`/reset/${token}`);
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);

  if (!passwordMatch) {
    req.flash("error", "Incorrect Old password");
    return res.redirect(`/reset/${token}`);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;

  await user.save();

  res.redirect("/login");
};

module.exports = {
  getLogin,
  getReset,
  postLogin,
  getSignUp,
  postReset,
  postLogout,
  postSignUp,
  getNewPassword,
  postNewPassword,
};
