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
    <Card sx={{marginBottom:"20px"}} >
        <CardMedia
        sx={{ height: 300}}
        image={imageUrl}
        title={"green iguana"}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {price} EGP
        </Typography>
        </CardContent>
        <CardActions>
        <Button variant="contained" size="small">Add to Cart</Button>
        </CardActions>
    </Card>
    );
}