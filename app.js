//core module
const path = require("path");
//External Modules
const express = require("express");

//Local module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");
const errorController = require("./controllers/error");
const { default: mongoose } = require("mongoose");

// Create express app
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use((req, res, next) => {
  console.log("Cookie check middleware", req.get("Cookie"));
  req.isLoggedIn = req.get("cookie")
    ? req.get("Cookie").split("=")[1] === "true"
    : "false";
  next();
});

// ✔️ MOVE STATIC BEFORE ROUTERS
app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

// 404 should ALWAYS be last
app.use(errorController.pageNotFound);

const PORT = 3002;
const DB_PATH =
  "mongodb+srv://nehalshaikh8664_db_user:yPJDG8qPVlwskFZ4@nehalskhcluster.xtyv7bd.mongodb.net/airbnb?appName=NehalskhCluster";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo", err);
  });
