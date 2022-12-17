const fsPPromises = require("fs").promises

const path = require("path")
// reading data

// using them in a aync and await fashion
const fileOps = async () => {
  try {
    const data = await fsPPromises.readFile(path.join(__dirname, "files", "starter.txt","utf8"))
    console.log(data)
    await fsPPromises.unlink(path.join(__dirname, "files", "starter.txt"), data)

    await fsPPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data)
    await fsPPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "\n\n nice to meet you")
    await fsPPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"))
    
    const newData = await fsPPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt","utf8"))
    console.log(newData)
  } catch (err) {
    console.log(err.message)
  }
}

console.log()
// or add the utf eg , "utf8"
// // not hardcoded more safer and better
// // it is asynchronous// 
fs.readFile(path.join(__dirname, "files", "starter.txtx"), (err, data) => {
  if(err) throw err
  console.log(data.toString());
})

console.log("hello...")

// exit on uncaught errors
process.on("uncaughtException", err => {
  console.log(`There was an uncaughtError: ${err}`)
  process.exit(1)
})

// we are going to write a file
// its takes three parameters one the directory what we are writing to the file
// and the callback function

//note, it replaces if the file exist, it creates new file if not

fs.writeFile(path.join(__dirname, "files", "reply.txt"), "nice to meet you",(err) => {
  if(err) throw err
  console.log("writing file completed")
})

// append a file ie adding more content  to it
// similar to read file, create and modify



//to use append and write file

// if we want to use the file module we must put the in built
// function inside the call back function 

// this creates the file
// writing happend then append then rename 
fs.writeFile(path.join(__dirname, "files", "reply.txt"), "nice to meet you",(err) => {
  if(err) throw err
  console.log("writing file completed")

  // this modify the file
  fs.appendFile(path.join(__dirname, "files", "reply.txt"), "\n\n Yes it is my pleasure",(err) => {
    if(err) throw err
    console.log("append file completed")

    // this renames the file
    fs.rename(path.join(__dirname, "files", "reply.txt"), "newreply",(err) => {
      if(err) throw err
      console.log("renaming file completed")
    })
  })
})
