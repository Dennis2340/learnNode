const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology : true,
      useNewUrlParser : true
    }) // this object prevent mongooDb to give warning to use
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB