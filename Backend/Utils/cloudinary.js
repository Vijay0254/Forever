const cloudinary = require('cloudinary')

async function connectCloudinary(){
    try{
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
        console.log(`Cloudinary Connected`)
    }
    catch(err){
        console.log(`Error in Connecting Cloudinary - ${err}`)
    }
}

module.exports = connectCloudinary