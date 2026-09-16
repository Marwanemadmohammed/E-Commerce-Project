import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";



const CartContainer = () => {

    const {cartItems , totalPrice , updateItemCart , deleteItemFromCart , clearCart} = useCart();

    const navigate  = useNavigate();

    const handleQuantity = (productId: string , quantity: number) => {
        if(quantity > 0){
            updateItemCart(productId , quantity);
        }
    };


    const handleRemoveItem = (productId : string) => {
        deleteItemFromCart(productId);
    };


    const handelCheckout = () => {
        navigate("/checkout");
    };


    return(
        <Container sx={{mt: 10}}>

            <Box sx={{display:"flex" , flexDirection: "row" , alignItems:"center" , justifyContent:"space-between"}}>
            <Typography variant="h5" sx={{marginBottom:"20px", paddingLeft:"10px"}}>My Cart</Typography>
            <Button sx={{width:"fit-content" , fontSize:"larger",marginBottom:"20px"}} onClick={()=> clearCart()}>Clear Cart</Button>
            </Box>
            {cartItems.length ?
            <Box sx={{display:"flex" , flexDirection:"column" }}>
            {cartItems.map((item)=>(
                <Box sx={{display:"flex" , flexDirection: "row" , justifyContent: "space-between" , alignItems: "center", padding: "20px", marginBottom:"30px", border:"2px solid #ededed" , borderRadius:"10px"}}>
                    <Box sx={{display: "flex" , flexDirection: "row" , alignItems: "center" , gap: 6 , padding: "0px 30px"}}>
                        <img src={item.imageUrl}  width={100} alt="Image" />
                        <Box>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography>{item.quantity} &times; {item.unitPrice} EGP</Typography>
                            <Button onClick={()=> handleRemoveItem(item.productId)}>Remove Item</Button>
                        </Box>
                    </Box>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleQuantity(item.productId , (item.quantity - 1))} sx={{fontSize:"bold"}}>-</Button>
                            <Button onClick={() => handleQuantity(item.productId , (item.quantity + 1))} sx={{fontSize:"bold"}}>+</Button>
                        </ButtonGroup>
                </Box>
            ))}
                <Box sx={{padding:"10px 10px 50px 10px", display:"flex" , flexDirection:"row" , justifyContent:"space-between" }}>
                    <Typography variant="h6">Total Price : {totalPrice.toFixed(2)} EGP</Typography>
                    <Button variant="contained" sx={{width:"200px"}} onClick={handelCheckout} >Go to Checkout</Button>
                </Box>
            </Box> : 
                <Box sx={{backgroundColor:"#eeecec" , textAlign:"center" , padding:"100px",marginTop: "50px" , borderRadius:"10px"}}>
                    <Typography variant="h4">Cart is empty , Please start shopping and add items.</Typography>
                </Box>}
        </Container>
    );
};


export default CartContainer;

