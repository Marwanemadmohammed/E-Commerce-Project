import  Typography  from "@mui/material/Typography";
import  Box from "@mui/material/Box";
import  Container  from "@mui/material/Container";
import  TextField  from "@mui/material/TextField";
import  Button  from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../Constants/BaseURL";
import { useAuth } from "../Context/Auth/AuthContext";

// To transform the user from login page to products page
import { useNavigate } from "react-router-dom";


const LoginContainer =  () =>{

        const [error , setError] = useState("");

    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const auth = useAuth();

    const navigate = useNavigate();

    const onSubmit = async() =>{
        const email = emailRef.current?.value;
        const password = passRef.current?.value;


        if(!email || !password){
            setError("Ckeck submitted data !");
            return; 
        };


        const response = await fetch(`${BASE_URL}/user/loginUser`,{
            method: "POST",
            headers :{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if(!response.ok){
            setError("Unable to login ");
            return;
        }

        const token = await response.json();

        if(!token){
            setError("Incorrect token !");
            return;
        }

        auth.login(email , token);
        navigate("/"); // transform to Home page after success login

    };

    return(
    <Container>
        <Box sx={{display:"flex" , justifyContent: "center" , marginTop: "100px" , flexDirection:"column" }}>
            <Typography variant="h4">
                Login to your account
            </Typography>
            <Box sx={{display:"flex" , flexDirection:"column" , justifyContent:"center" , padding:"40px" , gap:3 , border:2 ,marginTop:"30px" , borderRadius: "20px" , borderColor:"#f5f5f5" , boxShadow:"0px 0px 10px 2px #a5d2f9"}}>
                <TextField  inputRef =  {emailRef} label="Email" name="email" />
                <TextField  inputRef =  {passRef}  type ="password" label="Password" name="password" />
                <Button onClick={onSubmit} variant="contained" sx={{backgroundColor:"#69b6fa"}}>Login</Button>
                {error && <Typography sx={{color:"red"}}>{error}</Typography>}
            </Box>
        </Box>
    </Container>
    )
}

export default LoginContainer;