const jwt = require("jsonwebtoken")
const UserModel = require("../Models/UserModel")
const bcrypt = require('bcrypt')
const validator = require('validator')

const loginUserController = async(req, res) =>{
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(200).json({message: "Enter fully", success: false})
        }
        const exist = await UserModel.findOne({email: email})
        if(!exist){
            return res.status(200).json({message: "User Missing", success: false})
        }
        const verifyPassword = await bcrypt.compare(password, exist.password)
        if(!verifyPassword){
            return res.status(200).json({message: "Password is wrong", success: false})
        }
        const token = jwt.sign({id: exist._id, email: email}, process.env.USER_SECRET_KEY, {expiresIn: "1d"})
        res.cookie('token', token, {
            secure: true,
            sameSite: 'None'
        })
        return res.status(200).json({message: "Login Success", success: true})
    }
    catch(err){
        console.log(`Error in Login User Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const SignupUserController = async(req, res) =>{
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return res.status(200).json({message: "Enter full details", success: false})
        }
        const exist = await UserModel.findOne({email: email})
        if(exist){
            return res.status(200).json({message: "User Already Exist", success: false})
        }
        if(!validator.isEmail(email)){
            return res.status(200).json({message: "Enter Valid Email", success: false})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = UserModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(200).json({message: "User Registered", success: true})
    }
    catch(err){
        console.log(`Error in Signup User Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const logoutUserController = async(req, res) =>{
    try{
        res.clearCookie('token')
        return res.status(200).json({message: "Logout Success", success: true})
    }
    catch(err){
        console.log(`Error in Logout User Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const verifyUserController = async(req, res) =>{
    try{
        return res.status(200).json({success: true, user: {...req.user._doc}, message: "User"})
    }
    catch(err){
        console.log(`Error in Verify User Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const loginAdminController = async(req, res) =>{
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(200).json({message: "Enter fully", success: false})
        }
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(200).json({message: "Invalid Credentials", success: false})
        }
        const adminToken = jwt.sign({email: email}, process.env.ADMIN_SECRET_KEY, {expiresIn: "1d"})
        res.cookie('admintoken', adminToken, {
            secure: true,
            sameSite: 'None'
        })
        return res.status(200).json({message: "Login Success", success: true})
    }
    catch(err){
        console.log(`Error in Login Admin Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const logoutAdminController = async(req, res) =>{
    try{
        res.clearCookie('admintoken')
        return res.status(200).json({message: "Logout Success", success: true})
    }
    catch(err){
        console.log(`Error in Logout Admin Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

const verifyAdminController = async(req, res) =>{
    try{
        return res.status(200).json({success: true, user: req.user, message: "Admin"})
    }
    catch(err){
        console.log(`Error in verify Admin Controller - ${err}`)
        return res.status(200).json({message: 'Internal Server Error'})
    }
}

module.exports = { loginUserController, SignupUserController, logoutUserController, verifyUserController, loginAdminController, logoutAdminController, verifyAdminController }