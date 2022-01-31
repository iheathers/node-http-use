const csrf = require("csurf");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const userRoutes = require("./routes/shop");
const { authRouter } = require("./routes/auth");
const { adminRouter } = require("./routes/admin");

const { User } = require("./models/user");
const { getErrorPage } = require("./controllers/error");

const app = express();
const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");
const MONGODB_URI =
  "mongodb+srv://heathids:heathids@cluster0.nyqib.mongodb.net/myDigitalShop?retryWrites=true&w=majority";

const mongodbStore = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: mongodbStore,
  })
);
app.use(csrfProtection);

app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  try {
    const user = await User.findById(req.session.user._id);

    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log({ error });
  }
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRouter);
app.use(userRoutes);
app.use(authRouter);

app.use(getErrorPage);

mongoose.set("debug", true);
const main = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log("mongoose connect", { error });
  }
};

main()
  .then(async () => {
    console.log("Database Connected");

    const existingUser = await User.find();

    if (!existingUser.length) {
      const user = new User({
        username: "test",
        email: "test@test.com",
        cart: {
          items: [],
        },
      });

      await user.save();
    }

    app.listen(3000);
  })
  .catch((error) => console.log("main", { error }));
