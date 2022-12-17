const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this schema represents our data models, just like relational
//databse systems, notice it takes an object in the constructor
// this is the schema we had for our json file in the previouse versions
// of the course
const employeeSchema = new Schema({
  firstname :{
    type: String, 
    required: true // not optional
  },
  lastname: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Employee", employeeSchema);