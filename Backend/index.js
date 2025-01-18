const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT
const connectDb = require('./Db/connectDb')
const connectCloudinary = require('./Utils/cloudinary')
const userRouter = require('./Router/userRouter')
const productRouter = require('./Router/productRouter')
const cartRouter = require('./Router/cartRouter')
const orderRouter = require('./Router/orderRouter')

//Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });
  
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Path
app.use('/api/auth', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(PORT, (err) =>{
    err ? console.log(`Error in Running Server - ${err}`) : console.log(`Server Running in Port ${PORT}`)
    connectDb()
    connectCloudinary()
})