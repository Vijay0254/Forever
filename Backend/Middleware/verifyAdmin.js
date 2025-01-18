const jwt = require('jsonwebtoken')

const verifyAdmin = (req, res, next) =>{
    const admintoken = req?.cookies?.admintoken

    if(admintoken){
        jwt.verify(admintoken, process.env.ADMIN_SECRET_KEY, async(err, decoded) =>{
            try{
                if(err){
                    return res.status(200).json({message: "Token not Valid", success: false})
                }
                else{
                    req.user = decoded.email
                    next()
                }
            }
            catch(err){
                console.log(`Error in Admin Verify Token - ${err}`)
                return res.status(200).json({message: 'Internal Server Error'})
            }
        })
    }
    else{
        return res.status(200).json({message: "Token Timed Out", success: false})
    }
}

module.exports = { verifyAdmin }