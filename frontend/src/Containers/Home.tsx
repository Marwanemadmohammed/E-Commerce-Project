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
<Container sx={{ mt: 10, maxWidth: '1200px !important' }}>
    <Box 
        sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            justifyContent: "flex-start"
        }}
    >
        {products.map((p) => (
            <Box 
                key={p._id}
                sx={{ 
                    flex: { xs: '0 0 100%', sm: '0 0 calc(50% - 10px)', md: '0 0 calc(33.333% - 14px)' },
                    boxSizing: 'border-box',
                    display: 'flex', 
                    flexDirection: 'column'
                }}
            >
                <ProductCard
                    title={p.title}
                    imageUrl={p.imageUrl}
                    price={p.price}
                    id={p._id}
                />
            </Box>   
        ))}
    </Box>
</Container>
    );
};

export default HomePage;