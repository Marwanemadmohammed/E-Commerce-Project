import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { BASE_URL } from "../Constants/BaseURL";
import { useAuth } from "../Context/Auth/AuthContext";
import { useCart } from "../Context/Cart/CartContext";



const CartContainer = () => {

    const {token} = useAuth();
    const {cartItems , totalPrice} = useCart();
    const [error , setError] = useState("");

    // useEffect(()=>{

    //     if(!token){
    //         return;
    //     };


    //     const fetchCart = async () => {
    //         const response = await fetch(`${BASE_URL}/cart`,{
    //             headers:{
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
            
    //         if(!response.ok){
    //             setError("Faild to fetch User Cart , please try again later");
    //         };

    //         const data = await response.json();
    //         setCart(data);
    //     };



    //     fetchCart();
    // },[token]);

    return(
        <Container sx={{marginTop:"80px"}}>
        <Typography variant="h2">My cart</Typography>
        {cartItems.map((item)=>(
            <Box>{item.title}</Box>
        ))}
        </Container>
    );
};


export default CartContainer;