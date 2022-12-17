// we can't remove large files in an instant

const fs = require("fs")
// read stream large data
const rs = fs.createReadStream("files directory",{encoding: "utf8"})

const ws = fs.createWriteStream("files directory with new name")

rs.on("data", (dataChunk) => {
  ws.write(dataChunk)
})

// piping is more efficient instead of the listener

rs.pipe(ws)