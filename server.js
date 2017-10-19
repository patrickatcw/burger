var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "running50s",
  database: "movieplanner_db",
  port: "3306"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Root get route
app.get("/", function(req, res) {
  connection.query("SELECT * FROM movies;", function(err, data) {
    if (err) throw err;

    // Test it
    // console.log('The solution is: ', data);

    // Test it
    // res.send(data);

    res.render("index", { movies: data });
  });
});

// Post route -> back to home
app.post("/", function(req, res) {
  // Test it
  // console.log('You sent, ' + req.body.task);

  // Test it
  // res.send('You sent, ' + req.body.task);

  connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movies], function(err, result) {
    if (err) throw err;

    res.redirect("/");
  });
});

app.listen(port);
