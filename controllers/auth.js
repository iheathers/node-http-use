const bcrypt = require("bcryptjs");

const { User } = require("../models/user");

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
  });
};

const getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "SignUp",
    path: "/signup",
    isAuthenticated: req.session.isLoggedIn,
  });
};

const postSignUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.redirect("/signup");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    email: email,
    password: hashedPassword,
    cart: { items: [] },
  });

  await newUser.save();

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
        return res.redirect("/login");
      }

      req.session.isLoggedIn = true;
      req.session.user = loggedInUser;

      await req.session.save();

      return res.redirect("/products");
    }
  } catch (error) {
    console.log("postLogin", { error });
  }

  res.redirect("/login");
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("postLogout", { err });

    res.redirect("/login");
  });
};

module.exports = { getLogin, postLogin, postLogout, getSignUp, postSignUp };
