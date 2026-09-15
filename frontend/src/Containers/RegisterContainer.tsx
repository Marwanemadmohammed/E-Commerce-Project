import  Typography  from "@mui/material/Typography";
import  Box from "@mui/material/Box";
import  Container  from "@mui/material/Container";
import  TextField  from "@mui/material/TextField";
import  Button  from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../Constants/BaseURL";
import { useAuth } from "../Context/Auth/AuthContext";

const RegisterContainer =  () =>{

        const [error , setError] = useState("");

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const auth = useAuth();

    const onSubmit = async() =>{
        const firstName  = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passRef.current?.value;


        if(!firstName || !lastName || !email || !password){
            setError("Ckeck submitted data !");
            return; 
        };


        const response = await fetch(`${BASE_URL}/user/register`,{
            method: "POST",
            headers :{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });

        if(!response.ok){
            setError("User is already exist  !");
            return;
        }

        const token = await response.json();

        if(!token){
            setError("Incorrect token !");
            return;
        }

        auth.login(email , token);

    };

    return(
    <Container>
        <Box sx={{display:"flex" , justifyContent: "center" , marginTop: "100px" , flexDirection:"column" }}>
            <Typography variant="h4">
                Register New Account
            </Typography>

            <Box sx={{display:"flex" , flexDirection:"column" , justifyContent:"center" , padding:"40px" , gap:3 , border:2 ,marginTop:"30px" , borderRadius: "20px" , borderColor:"#f5f5f5" , boxShadow:"0px 0px 10px 2px #a5d2f9"}}>
                <TextField  inputRef = {firstNameRef} label="First Name" name="firstName"   />
                <TextField  inputRef = {lastNameRef} label="Last Name" name="lastName"   />
                <TextField  inputRef =  {emailRef} label="Email" name="email" />
                <TextField  inputRef =  {passRef}  type ="password" label="Password" name="password" />
                <Button onClick={onSubmit} variant="contained" sx={{backgroundColor:"#69b6fa"}}>Register</Button>
                {error && <Typography sx={{color:"red"}}>{error}</Typography>}
            </Box>
        </Box>
    </Container>
    )
}

export default RegisterContainer;