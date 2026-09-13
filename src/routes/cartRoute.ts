import express from "express";
import { addItemToCart, checkout, ClearCart, deleteItemInCart, getActiveCartForUser, updateCartForUser } from "../services/cartService.js";
import validateJWT, { type ExtendRequest } from "../middlewares/validateJWT.js";

const router = express.Router();




router.get('/' , validateJWT , async (req : any, res) =>{
    try{
        const userId = req.user._id;
        const cart = await getActiveCartForUser({ userId });
        res.status(200).send(cart);
    }
    catch{
        res.status(500).send("Something went wrong !");
    }
});




router.post('/items' , validateJWT , async(req : any , res ) =>{
    try{
        const userId = req.user._id;
        const {productId , quantity} = req.body;
        const response = await addItemToCart({productId , quantity , userId});
        res.status( response.statusCode).send(response.data);
    }
    catch{
        res.status(500).send("Something went wrong !");
    }
});



router.put('/items' , validateJWT , async(req: ExtendRequest , res)=>{
    try{
        const userId = req?.user?._id;
        const {productId , quantity} = req.body;
        const response = await updateCartForUser({userId , productId , quantity});
    
        // For checking only.
        if (!response.statusCode) 
        {
        return res.status(500).send({ message: "Internal server error" });
        }
        res.status(response.statusCode).send(response.data);
    }
    catch{
        res.status(500).send("Something went wrong !");
    }
});


// To delete on itam 
router.delete('/items/:productId', validateJWT , async(req : ExtendRequest , res)=>{
    try{
        const userId = req?.user?._id;
        const { productId } = req.params;
        const response = await deleteItemInCart({ userId , productId});
        if(!response.statusCode){
            return res.status(500).send({message : "Internal server error "});
        }
        res.status(response.statusCode).send(response.data);
    }
    catch{
        res.status(500).send("Something went wrong !");
    }
});




// To delete all items in the cart
router.delete('/' , validateJWT , async(req: ExtendRequest , res)=>{
    try{
        const userId = req?.user?._id;
        const response = await ClearCart({ userId });
    
        if(!response.statusCode)
        {
            return res.status(500).send({message : "Internal server error "});
        }
        res.status(response.statusCode).send(response.data);
    }
    catch{
        res.status(500).send("Something went wrong !");
    }
});




// From order 

router.post('/checkout' , validateJWT , async (req: ExtendRequest , res)=>{
    try{
        const userId = req?.user?._id;
        const {address} = req.body;
        if(!address){
            return res.status(500).send({message : "Address must be entered "});
        }
        const response = await checkout({ userId , address });
        
        if(!response.statusCode)
        {
            return res.status(500).send({message : "Internal server error "});
        }
        res.status(response.statusCode).send(response.data);
    }
    catch{
        res.status(500).send("Something went wrong !");
    }
});



export default router;