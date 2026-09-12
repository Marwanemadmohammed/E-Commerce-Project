import express from "express";
import { addItemToCart, getActiveCartForUser } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();


router.get('/' , validateJWT , async (req : any, res) =>{
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
});


router.post('/items' , validateJWT , async(req : any , res ) =>{
    const userId = req.user._id;
    const {productId , quantity} = req.body;
    const response = await addItemToCart({productId , quantity , userId});
    res.status( response.statusCode).send(response.data);
});



export default router;