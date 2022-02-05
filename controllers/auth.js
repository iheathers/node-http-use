const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

console.log("APIkEY", process.env.SENDGRID_API_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../models/user");

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMsg: req.flash("loginCredentialError")[0],
  });
};

const getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "SignUp",
    path: "/signup",
    errorMsg: req.flash("signUpError")[0],
  });
};

const postSignUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    req.flash("signUpError", "User exists");
    return res.redirect("/signup");
  }

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
      console.error(error);
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
        req.flash("loginCredentialError", "Incorrect User or Password");
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

  req.flash("loginCredentialError", "User does not exist");
  res.redirect("/login");
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("postLogout", { err });

    res.redirect("/login");
  });
};

module.exports = { getLogin, postLogin, postLogout, getSignUp, postSignUp };
