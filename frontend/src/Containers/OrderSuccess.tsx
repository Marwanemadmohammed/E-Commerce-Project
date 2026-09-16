import { CheckCircleOutlined } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";



const OrderSuccessPage = () => {

    const navigate = useNavigate();

    const returnToHome = () => {
        navigate("/");
    };

    return (
        <Container fixed sx={{mt:15, display:"flex" , alignItems: "center" , justifyContent: "center" , gap:2 , flexDirection: "column"}}>
            <CheckCircleOutlined sx={{color:"green" , fontSize:"100px"}} />
            <Typography variant="h4">Thanks for your order.</Typography>
                <Typography variant="h6" >
                    We start processing it , and We will get back to you soon.
                </Typography>
                <Button variant="contained" sx={{backgroundColor:"green"}} onClick={returnToHome}>Go to Home Page</Button>
        </Container>
    )
};


export default OrderSuccessPage;