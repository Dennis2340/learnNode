const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req,res) => {
  // res.sendFile("./views/index.html", { root : __dirname});
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
})


router.get("/privacy(.html)?", (req,res) => {
  res.sendFile(path.join(__dirname,"..", "views", "privacy.html")); 
})

module.exports = router;