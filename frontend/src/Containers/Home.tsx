import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import  {type Product}  from "../types/Product";
import { BASE_URL } from "../Constants/BaseURL";
import { Box } from "@mui/material";



const HomePage = () => {
    const [products , setProducts] = useState<Product[]>([]);
    const [error , setError] = useState(false);
    
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(`${BASE_URL}/product`)
                const data = await response.json();
                setProducts(data);
            }
            catch{
                setError(true);
            }
        }


        fetchData();

    },[]);


    if(error){
        return <Box>Something went wrong please try again !</Box>
    };



    return (
        <Container sx={{ mt: 10 ,display:"flex", justifyContent:"center"  }}>
            <Grid container spacing={5}  sx={{display:"flex", justifyContent:"center"}}>
                {products.map((p )=>(
                    <Grid  size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProductCard
                            title={p.title}
                            imageUrl={p.imageUrl}
                            price={p.price}
                            id={p._id}
                            />
                    </Grid>   
                ))}

            </Grid>
        </Container>
    );
};

export default HomePage;