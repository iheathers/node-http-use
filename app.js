const express = require("express");

const { mongoConnect } = require("./utils/database");

const userRoutes = require("./routes/shop");
const { adminRouter } = require("./routes/admin");

const { getErrorPage } = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use(userRoutes);

app.use(getErrorPage);

mongoConnect().catch((err) => {
  console.error("Something went wrong");
  throw err;
});

app.listen(3000);
