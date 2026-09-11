import express, { request, response } from "express";
import { AddProduct, getAllProducts } from "../services/productService.js";



const router = express.Router();




router.post('/Add' , async (request , response)=>{
    const {title , imageUrl , price , stock} = request.body;
    const result = await AddProduct({title , imageUrl ,price, stock});

    response.status(result.statusCode).send(result.data);
});




router.get('/', async(request , response)=>{
    const AllProduct = await getAllProducts();
    response.status(200).send(AllProduct);
});




export default router;