const { format } = require("date-fns");
const { v4 : uuid} = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try
  {
    // this checks for the directory if it exists or not
    if(!fs.existsSync(path.join(__dirname, "logs")))
    {
       await fsPromises.mkdir(path.join(__dirname, "logs"))
    }
    // this create or append the file
   await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  }catch(err)
  {
     console.log(err)
  }
}

module.exports = logEvents 