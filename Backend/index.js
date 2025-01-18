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
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Content-Type-Options",
        "Accept",
        "X-Requested-With",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Origin"
    ],
    maxAge: 7200 // Max age for preflight requests (2 hours)
}));

// app.options('*', cors()); // Handle preflight requests

// app.use((req, res, next) => {
//     const allowedOrigins = [
//         process.env.FRONTEND_URL,
//         process.env.ADMIN_URL
//     ];
//     const origin = req.headers.origin;

//     // Allow only specific origins
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader("Access-Control-Allow-Origin", origin);
//     }

//     // Methods allowed
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
//     );

//     // Headers allowed
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );

//     // Allow credentials for cookies/auth
//     res.setHeader("Access-Control-Allow-Credentials", "true");

//     // Optional: Allow private network if needed (e.g., for local devices)
//     res.setHeader("Access-Control-Allow-Private-Network", "true");

//     // Max age for preflight requests (2 hours)
//     res.setHeader("Access-Control-Max-Age", "7200");

//     // Handle preflight OPTIONS requests
//     if (req.method === "OPTIONS") {
//         return res.sendStatus(204); // Respond OK for preflight checks
//     }

//     next();
// });

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