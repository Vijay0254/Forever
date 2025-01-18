const jwt = require('jsonwebtoken')
const UserModel = require('../Models/UserModel')

const verifyUser = (req,res,next) =>{
    const token = req.cookies.token
    if(token){
        jwt.verify(token, process.env.USER_SECRET_KEY, async(err, decoded) =>{
            try{
                if(err){
                    return res.status(200).json({message: "Token not Valid"})
                }
                else{
                    const user = await UserModel.findById({_id: decoded.id}).select("-password")
                    req.user = user
                    next()
                }
            }
            catch(err){
                console.log(`Error in User Verify Token - ${err}`)
                return res.status(200).json({messgae: "Internal Server Error"})
            }
        })
    }
    else{
        return res.status(200).json({message: "Token Timed out"})
    }
}

module.exports = { verifyUser }