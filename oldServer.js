const http = require("http");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}; // this is doing inheritance
//initialise the objects
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3400;
myEmitter.on("log", (msg,fileName) => logEvents(msg, fileName));
const serveFile = async (filePath, contentType, response) => {

  try {
    const rawData = await fsPromises.readFile(
      filePath, 
       !contentType.includes("image") ? "utf8" : ""
      
      );
    const data = contentType === "application/json" ? JSON.parse(rawData) : rawData
    response.writeHead(
      filePath.includes("404.html") ? 404 : 200, 
      {"Content-Type" : contentType}
      );
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
      
      );

  } catch (error) {
    console.log(error);
    myEmitter.emit("log", `${error.name}: ${error.message}`, "errorLog.txt");
    response.statusCode = 500; // server error
    response.end();
  }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = path.extname(req.url);
  
  let contentType;

  switch(extension){
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascripts";
      break;

   case ".json":
      contentType = "application/json";
      break;
   case ".jpg":
      contentType = "image/jpeg";
      break;
   case ".png":
      contentType = "image/png";
      break;

   case ".txt":
      contentType = "text/plain";
      break;
   default:
    contentType = "text/html";
    break;
  }

  let filePath;
  if(contentType === "text/html" && req.url === "/")
  {
    filePath = path.join(__dirname, "views", "index.html");
  }
  else if(contentType === "text/html" && req.url.slice(-1) === "/")
  {
    filePath = path.join(__dirname, "views",req.url, "index.html");
  }
  else if(contentType === "text/html")
  {
    filePath = path.join(__dirname, "views", req.url);
  }
  else
  {
    filePath = path.join(__dirname,req.url);
  }

  //  makes the .html extension not required in the browser
  if(!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExist = fs.existsSync(filePath);

  if(fileExist)
  {
     // serve other files
     serveFile(filePath, contentType, res);
  }
  else
  {
    // this switch handles a redirect
     switch(path.parse(filePath).base)
     {
      case "old-page-html":
        res.writeHead(301, { "Location" : "/new-page.html"});
        res.end();
        break;
      case "www-page-html":
        res.writeHead(301, { "Location" : "/"})
        res.end();
        break;
      default:
        // serve a 404
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
     }
  }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))



   // add listener for the log event

   //emits the event listenend
