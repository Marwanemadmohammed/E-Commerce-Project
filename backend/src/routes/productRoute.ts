import express, { request, response } from "express";
import { AddProduct, getAllProducts } from "../services/productService.js";



const router = express.Router();




router.post('/Add' , async (request , response)=>{
    try{
        const {title , imageUrl , price , stock} = request.body;
        const result = await AddProduct({title , imageUrl ,price, stock});
    
        response.status(result.statusCode).send(result.data);
    }
    catch{
        response.status(500).send("Something went wrong !");
    }
});




router.get('/', async(request , response)=>{
    try{
        const AllProduct = await getAllProducts();
        response.status(200).send(AllProduct);
    }
    catch{
        response.status(500).send("Something went wrong !");
    }
});




export default router;