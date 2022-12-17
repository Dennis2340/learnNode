const fs = require("fs")

// we can check if a directory exist using the existsSync method
// and creates it if not exist
if(!fs.existsSync("./new"))
{
  fs.mkdir("./new", (err) => {
    if(err) throw err
    console.log("Directory Created");
  })
}

if(fs.existsSync("./"))
{
  fs.rmdir("./new", (err) => {
    if(err) throw err
    console.log("Directory Removed")
  })
}
// if(!fs.existsSync("./new"))
// {
// fs.mkdir("./new", (err) => {
//   if(err) throw err
//   console.log("Directory created")
// })
// }

// very useful to check if file exist or not

// this removed the directory
// if(fs.existsSync("./new"))
// {
// fs.rmdir("./new", (err) => {
//   if(err) throw err
//   console.log("Directory removed")
// })
// }

// done with reading and writing files
// next npm modules