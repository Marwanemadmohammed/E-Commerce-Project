import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants/BaseURL";
import { useAuth } from "../Context/Auth/AuthContext";



const CartContainer = () => {

    const {token} = useAuth();

    const [cart , setCart] = useState();
    const [error , setError] = useState("");

    useEffect(()=>{

        if(!token){
            return;
        };


        const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if(!response.ok){
                setError("Faild to fetch User Cart , please try again later");
            };

            const data = await response.json();
            setCart(data);
        };



        fetchCart();
    },[token]);

    console.log(cart);

    return(
        <Container sx={{marginTop:"80px"}}>
        <Typography variant="h2">My cart</Typography>
        </Container>
    );
};


export default CartContainer;