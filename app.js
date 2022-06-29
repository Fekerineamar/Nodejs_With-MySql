import session from "express-session";
import bodyParser from "body-parser";
import express from "express";
import csrf from "csurf";
import path from "path";
// custom module
import con from "./_data/db.js";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import profile from "./routes/profile.js";
import getprofile from "./routes/getprofile.js";
import deleted from "./routes/delete.js";
import upload from "./routes/upload.js";
import middleware from "./routes/middleware.js";
import data from "./_data/data.json" assert { type: "json" };

const app = express();
let __dirname = path.resolve();

app.use(
  session({
    secret: "verysecretsessionforexpreesnodejssessions!",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
let token = csrf();

let sqlerr;
con.connect((err) => {
  if (err) {
    console.log("Connection Failed !!!", err);
    sqlerr = "Cannot Connect to Database!";
  } else {
    console.log("Connected !!"), Createdb();
  }
});
const Createdb = () => {
  let sql = `
CREATE DATABASE IF NOT EXISTS users;use users;
CREATE TABLE IF NOT EXISTS user (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(30) NOT NULL,
  lname VARCHAR(30) NULL,
  email VARCHAR(50) NOT NULL,
  pass VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NULL,
  addr1 VARCHAR(30) NULL,
  addr2  VARCHAR(30) NULL,
  country VARCHAR(30) NULL,
  state VARCHAR(30) NULL,
  image VARCHAR(30) NULL
  );
`;
  con.query(sql, (err, result) => {
    err && console.log(err);
    console.log(result);
  });
};

app.get("/", token, (req, res) => {
  let user;
  req.session.name && (user = req.session.name);
  res.render("index.ejs", {
    names: data,
    user: user,
    sqlerr: sqlerr,
    title: "home",
    csrfToken: req.csrfToken(),
  });
});
app.post("/signup", signup);
app.post("/login", login);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    err && console.log(err);
    res.redirect("/");
  });
});

app.get("/profile", getprofile);
app.post("/profile", profile);

app.post("/delete", deleted);

app.post("/uploads", middleware.single("image"), upload);

app.use(token, (req, res) => {
  let user;
  req.session.name && (user = req.session.name);
  res.render("./Component/404.ejs", {
    title: "404 Not Found",
    user: user,
    csrfToken: req.csrfToken(),
  });
});

const port = 3333;
app.listen(port, () => console.log("server listen on http://127.0.0.1:", port));
