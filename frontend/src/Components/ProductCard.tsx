import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props{
    id: string;
    price: string;
    title: string;
    imageUrl: string;
}

export default function ProductCard({id , price , title , imageUrl} : Props) {
    return (
    <Card sx={{marginBottom:"20px" , padding: "10px" , height:"500px" , position:"relative"}} >
        <CardMedia
        sx={{ height: 300}}
        image={imageUrl}
        title={"green iguana"}
        />
        <CardContent sx={{marginTop:"30px"}}>
        <Typography gutterBottom variant="h6" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{fontSize:"larger"}}>
            {price} EGP
        </Typography>
        </CardContent>
        <CardActions>
        <Button variant="contained" size="small" sx={{background:"#24acce" , padding:"10px" , position:"absolute" , left:"20px", bottom:"20px" , fontWeight:"bold"}}>Add to Cart</Button>
        </CardActions>
    </Card>
    );
}