import express, { request, response } from "express";
import { loginUser, register } from "../services/userService.js";


const router = express.Router();




router.post('/register' , async(request , response)=>{
    try{
        
            const {firstName , lastName , email , password} = request.body;
            const result = await register({firstName , lastName , email , password});
        
            // result. statusCode or .data ==> according to the function register in userServices file .
            response.status(result.statusCode).json(result.data);
    }
    catch{  
        response.status(500).send("Something went wrong !");
    }
    
});


router.post('/loginUser' , async(request , response)=>{
    try{
        const {email , password} = request.body;
        const result = await loginUser({email , password});
    
        response.status(result.statusCode).json(result.data); // .json means to send the data as json object
    }
    catch{
        response.status(500).send("Something went wrong !");
    }
});






export default router;