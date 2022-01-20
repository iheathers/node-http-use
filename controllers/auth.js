const { User } = require("../models/user");

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

const postLogin = async (req, res, next) => {
  try {
    const loggedInUser = await User.findById("61e2f62c8f03781acd2c1a01");

    if (loggedInUser) {
      req.session.isLoggedIn = true;
      req.session.user = loggedInUser;

      await req.session.save();

      res.redirect("/products");
    }
  } catch (error) {
    console.log("postLogin", { error });
  }

  res.redirect("/products");
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("postLogout", { err });

    res.redirect("/login");
  });
};

module.exports = { getLogin, postLogin, postLogout };
