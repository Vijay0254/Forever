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
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Debug origin
app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    next();
});

//Path
app.use('/api/auth', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Preflight Requests
app.options('*', cors());

app.listen(PORT, (err) =>{
    err ? console.log(`Error in Running Server - ${err}`) : console.log(`Server Running in Port ${PORT}`)
    connectDb()
    connectCloudinary()
})