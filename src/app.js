const express = require("express");
const chalk = require("chalk");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");
/* console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, "../public")); */

const app = express();

const port = process.env.PORT || 3000;

//To notify express about the templating engine - set templating engine
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));

hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//If views folder is named as 'templates' or is at some other location than root folder
app.set("views", path.join(__dirname, "../templates/views"));

/* app.get("", (req, res) => {
  res.render("index");
}); */

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Varun",
    teamName: "App team",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Varun",
    teamName: "About team",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the help page",
    title: "Help Page",
    name: "Varun",
    teamName: "Help team",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address missing" });
  }
  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error: error });
    }
    res.send({ data: response });
  });
  //res.send({ temperature: 0, Address: req.query.address });
});

app.get("/products", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please provide location",
    });
  }
  //console.log(req);
  //console.log("-----------------------------------------");
  console.log(req.query);
  res.send({ Products: [] });
});

app.get("/help/*", (req, res) => {
  //res.send("Help page does not exist");
  res.render("helpArticle", {
    title: "help page",
    teamName: "Content team",
  });
});

app.get("*", (req, res) => {
  //res.send("My 404 page");
  res.render("404", {
    title: "404 Page",
    teamName: "PMG group",
    errorMessage: "Page not found",
  });
});

/* app.get("/", (req, res) => {
  res.send("<h1>Weather</h1>");
}); */

/* app.get("/help", (req, res) => {
  res.send([
    { name: "Varun", age: 33 },
    { name: "Khurana", age: 28 },
  ]);
});

app.get("/about", (req, res) => {
  res.send("This is about page");
}); */

app.listen(port, () => {
  console.log(chalk.black.bgGreen.bold("Server is up on port", port));
});
