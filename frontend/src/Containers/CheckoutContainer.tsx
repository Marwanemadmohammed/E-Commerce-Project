import { Box, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from '@mui/material/Button';
import { useRef } from "react";
import { BASE_URL } from "../Constants/BaseURL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth/AuthContext";




const CheckoutContainer = () => {

    const {cartItems , totalPrice} = useCart();

    const addressRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const {token} = useAuth();

    const {clearCart} = useCart();


    const handleConfirmOrder = async () => {
        const address = addressRef.current?.value;

        if(!address) return;

                const response = await fetch(`${BASE_URL}/cart/checkout`,{
                    method: "POST",
                    headers :{
                        "Content-Type" : "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        address
                    })
                });

                if(!response.ok) return;

                navigate("/Order-success");
                clearCart();
    };


    return(
        <Container sx={{mt: 10}}>

            <Box sx={{display:"flex" , flexDirection: "row" , alignItems:"center" , justifyContent:"space-between"}}>
            <Typography variant="h5" sx={{marginBottom:"20px", paddingLeft:"10px"}}>Checkout</Typography>
            </Box>

            <TextField inputRef={addressRef} label="Delivery Address" name="address" fullWidth  sx={{marginBottom:"30px"}}/>

                <Box sx={{display:"flex" , flexDirection:"column" ,border:"2px solid #ededed" , borderRadius:"10px" }}>
                    {cartItems.map((item)=>(
                        <Box sx={{display:"flex",flexDirection: "row" , justifyContent: "space-between" , alignItems: "center", padding: "10px"}}>
                            <Box sx={{display: "flex", width:"100%" , flexDirection: "row" , alignItems: "center" , gap: 1 , padding: "0px 30px"}}>
                                <img src={item.imageUrl}  width={100} alt="Image" />
                                <Box sx={{display:"flex", flexDirection:"row" , justifyContent:"space-between",width:'100%' ,alignItems:"center"}}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography>{item.quantity} &times; {item.unitPrice} EGP</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                        <Box >
                            <Typography variant="h6" sx={{ textAlign:"right" , marginRight:"30px" , padding:"10px"}}>Total Price : {totalPrice.toFixed(2)} EGP</Typography>
                        </Box>
                </Box> 


            <Button variant="contained" fullWidth sx={{marginTop:"30px"}} onClick={handleConfirmOrder}>Pay Now</Button>
        </Container>
    );
};

export default CheckoutContainer;

