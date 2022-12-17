require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const corsOption = require("./config/corsOption");
const path = require("path");
const {logger} = require("./middleware/logEvents");
const errHandle = require("./middleware/errorHandle")
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require("./middleware/credentials")
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3400;

// Connect to mongoDB
connectDB();
// custom middleware logger

app.use(logger)

app.use(credentials);
// cross origin resourse sharing

app.use(cors(corsOption));
// express helps with regular expresion in the code
// the code below states that the route should begin with a slash (^)
// and end with one ($) or index.html file
//the (.html)? means optional

// the request are called like water fall from top to bottom

// built in middleware to handle urlencoded data in other words. form data
// "content-type : application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended : false}));

// built in middleware to handle json
app.use(express.json());

// middleware
app.use(cookieParser());
//  to handle static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));


app.use("/register", require("./routes/register"))
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT); // because i want to only protect the employee data
app.use("/employee", require("./routes/api/employee"));

 
// Routes handlers
/*
app.get("/hello(.html)?", (req,res,next) => {
 console.log("hello.html loading");
 next();
}, (req, res) => {
  res.send("hello routers")
})
*/

const one = (req,res,next) => {
  console.log("one");
  next()
}

const two = (req,res,next) => {
  console.log("two");
  next()
}

const three = (req,res) => {
  console.log("three");
  res.send("finished")
}

app.get("/chain(.html)?", [one,two,three]);

// this is the wild card using the wild card in regex
// app.get("/*", (req,res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// })

app.all("*", (req,res) => {
  res.status(404)
 if(req.accepts("html"))
 {
  res.sendFile(path.join(__dirname, "views", "404.html"));
 }
 else if(req.accepts("json"))
 {
  res.json({error: "404 not found"});
 }
 else
 {
  res.type("txt").send("404 not found")
 }
})

app.use(errHandle);


mongoose.connection.once("open", () => {
  console.log("connected to mongoDB")
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
