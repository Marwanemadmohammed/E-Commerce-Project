import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';



const CartContainer = () => {

    const {cartItems , totalPrice} = useCart();
    
    return(
        <Container sx={{mt: 10}}>
            <Box sx={{display:"flex" , flexDirection:"column" }}>
            <Typography variant="h4" sx={{marginBottom:"20px"}}>My Cart</Typography>
            {cartItems.map((item)=>(
                <Box sx={{display:"flex" , flexDirection: "row" , justifyContent: "space-between" , alignItems: "center", padding: "20px", marginBottom:"30px", border:"2px solid #ededed" , borderRadius:"10px"}}>
                    <Box sx={{display: "flex" , flexDirection: "row" , alignItems: "center" , gap: 6 , padding: "0px 30px"}}>
                        <img src={item.imageUrl}  width={100} alt="Image" />
                        <Box>
                            <Typography>{item.title}</Typography>
                            <Typography>{item.quantity} &times; {item.unitPrice} EGP</Typography>
                            <Button sx={{fontSize:"bold"}}>Remove Item</Button>
                        </Box>
                    </Box>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button sx={{fontSize:"bold"}}>-</Button>
                            <Button sx={{fontSize:"bold"}}>+</Button>
                        </ButtonGroup>
                </Box>
            ))}
                <Box>
                    <Typography variant="h5" sx={{marginLeft:"20px" , paddingBottom:"100px"}}>Total Price : {totalPrice.toFixed(2)} EGP</Typography>
                </Box>
            </Box>
        </Container>
    );
};


export default CartContainer;