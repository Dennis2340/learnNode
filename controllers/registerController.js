const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req,res) => {
   // destructure the users info
   const  { user, pwd} = req.body;
   if(!user || !pwd) return res.status(400).json({"message" : "username and password required"});
   // check for duplication
  
    const duplication = await User.findOne({username : user}).exec()
   if(duplication)
   {
     return res.sendStatus(409); // conflict
   }

   try{

    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

      // using mongodb everything is simply
      // create and stroe
      
      const result = await User.create({
         "username" : user,
         "password" : hashedPwd
      })
       console.log(result)
      
     
     
     res.status(201).json({"success" : `new user ${user} created`})
   }catch(error){
    res.status(500).json({"message" : error.message});
   }
}

module.exports = { handleNewUser }