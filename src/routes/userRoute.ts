import express, { request, response } from "express";
import { loginUser, register } from "../services/userService.js";


const router = express.Router();




router.post('/register' , async(request , response)=>{

    const {firstName , lastName , email , password} = request.body;
    const result = await register({firstName , lastName , email , password});

    // result. statusCode or .data ==> according to the function register in userServices file .
    response.status(result.statusCode).send(result.data);

});


router.post('/loginUser' , async(request , response)=>{
    const {email , password} = request.body;
    const result = await loginUser({email , password});

    response.status(result.statusCode).send(result.data);
});






export default router;