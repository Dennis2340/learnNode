/*
the tutorials i am following

1 Start here
2 Write files
3 Npm modules
4 Event Emitter
5 Web server 
6 Express js
7 middleware
8 Routing
9 MVC react API
10 Authentication
11 Jwt auth
12 User Roles
13 MongoDb
14 Data models
15 Async Crud

MERN = mongodb expressjs react node
 */

/*
How NodeJs differs from vanilla Js

1 node runs in the server not in a browser
2 the console is in the terminal
3 global object instead of window object
console.log(global)

4 has common core modules that we will explore
5 commonJs modules instead of es6 modules

6 missing some js APIs like fetch

we can also export our module

module.exports = {names of the mudole you want to export eg add}
const math = require("./math")
or we destructure
cosnt { add, divide,sub} = require("./math")

*/

// operating system
const os = require("os")

const path = require("path")

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__filename))