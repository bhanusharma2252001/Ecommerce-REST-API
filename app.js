const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const userRoute=require("./routes/users.js")
const authRoute=require("./routes/auth.js")
const productRoute=require("./routes/product.js")
const cartRoute=require("./routes/cart.js")
const orderRoute=require("./routes/order.js")

const app=express();
mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected sucessfully!!"))
.catch((err)=>console.log(err))
app.use(express.json());

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);


app.listen(process.env.PORT||3000,(err)=>
{
    if(!err)
    {
        console.log("Server is runnning on port 3000");
    }
})