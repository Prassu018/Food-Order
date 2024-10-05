import express from "express"
import cors from "cors"
import { connectDB } from "./Config/db.js"
import 'dotenv/config.js'
import foodRouter from "./Routes/foodRoutes.js"
import userRouter from "./Routes/userRoutes.js"
import cartRouter from "./Routes/CartRoutes.js"
import orderRouter from "./Routes/orderRoutes.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();


// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://prashant18:<db_password>@cluster0.shr4z.mongodb.net/?