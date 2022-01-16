const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/shop");
const { adminRouter } = require("./routes/admin");

const { User } = require("./models/user");
const { getErrorPage } = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("61e2f62c8f03781acd2c1a01");

    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log({ error });
  }
});

app.use("/admin", adminRouter);
app.use(userRoutes);

app.use(getErrorPage);

const uri =
  "mongodb+srv://heathids:heathids@cluster0.nyqib.mongodb.net/myDigitalShop?retryWrites=true&w=majority";

mongoose.set("debug", true);
const main = async () => {
  try {
    await mongoose.connect(uri);
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
