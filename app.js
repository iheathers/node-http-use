const express = require("express");

const userRoutes = require("./routes/shop");
const { adminRouter } = require("./routes/admin");

const { User } = require("./models/user");
const { mongoConnect } = require("./utils/database");
const { getErrorPage } = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const user = await User.findByID("61e11edd605994a65bd90170");

    if (user) {
      req.user = new User(user.username, user.emailID, user.cart, user._id);
      next();
    }
  } catch (error) {
    console.log({ error });
  }
});

app.use("/admin", adminRouter);
app.use(userRoutes);

app.use(getErrorPage);

mongoConnect().catch((err) => {
  console.error("Something went wrong");
  throw err;
});

app.listen(3000);
