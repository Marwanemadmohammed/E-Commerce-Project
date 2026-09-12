import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedInitialProduct } from "./services/productService.js";
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"

const app = express();
const port = 3001;

// This to know to send the request json body to transform it to put it in request.body
app.use(express.json());

// Here connect the database with express(BackEnd).
mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.log("Faild to connect", err));


    app.use('/user' , userRoute)

    seedInitialProduct();
    
    // Seed the products to database

    app.use('/product' , productRoute);

    
    app.use('/cart' , cartRoute);

app.listen(port , ()=>{
    console.log(`Server is running in http://localhost:${port}`);
});
