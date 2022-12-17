const User = require("../model/User")

const handleLogout = async (req,res) => {
  const  cookies = req.cookies
  if(!cookies?.jwt) return res.sendStatus(204) // no content even though request is successful

  const refreshToken = cookies.jwt

  // is refresh token in Db?
  
 const  foundUser = await User.findOne({refreshToken}).exec()
  if(!foundUser) {
    res.clearCookie("jwt", {
      httpOnly : true,
      sameSite : None,
      secure : true, 
       })
    return res.sendStatus(204)// no conten
  }

  // Delete refreshToken in db
   foundUser.refreshToken = ""
   const result = await foundUser.save()
   console.log(result)


  res.clearCookie("jwt", {
    httpOnly : true, 
    secure : true,
    sameSite : "None"
  }) // secure : true -only serves on https
  res.sendStatus(204)// no content
}
module.exports = { handleLogout }