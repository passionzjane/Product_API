const express = require('express')
const dotenv = require('dotenv')
const connectDB = require("./config/db");


dotenv.config({ path: './config/config.env'})

connectDB()

// Route files
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')

const app = express();


//Body parser(allows you access to req.body)
app.use(express.json());

app.use('/api/v1/products', productRoute)
app.use('/api/v1/auth', userRoute)

const PORT = process.env.PORT || 8000

const server = app.listen(

    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)