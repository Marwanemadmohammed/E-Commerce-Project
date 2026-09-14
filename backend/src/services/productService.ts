import ProductModel from "../models/productModel.js";

export const getAllProducts = async () =>{
    return await ProductModel.find();
};



export const seedInitialProduct = async ()=>{

    try
    {
            const Products = [
        {
    title: "Dell XPS 13 Ultrabook",
    imageUrl: "https://m.media-amazon.com/images/I/51HgSm4COdS._AC_SX679_.jpg",
    price: 999,
    stock: 15
    },
    {
    title: "HP Pavilion Gaming Laptop",
    imageUrl: "https://tasawwq.com/wp-content/uploads/2024/08/51eJHmfWqHL._AC_SL1134_.jpg",
    price: 750,
    stock: 25
    },
    { 
    title: "Lenovo ThinkPad X1 Carbon",
    imageUrl: "https://dream2000.com/cdn/shop/files/untitled-2_1_2.jpg?v=1779610486&width=1780",
    price: 1299,
    stock: 10
    },
    {
    title: "MacBook Air M2",
    imageUrl: "https://iklinikstores.com/uploads/products/macbook-pro-14-inch-m3-3.webp",
    price: 1199,
    stock: 20
    },
    {
    title: "ASUS ROG Gaming Laptop",
    imageUrl: "https://m.media-amazon.com/images/I/41qBFkvunbL.jpg",
    price: 1499,
    stock: 8
    },
    {
    title: "Acer Aspire 5",
    imageUrl: "https://egyptlaptop.com/images/detailed/74/acer-laptop-gaming.webp",
    price: 599,
    stock: 30
    }
    ];

    const existProducts = await getAllProducts();

    if(existProducts.length === 0){
        await ProductModel.insertMany(Products);
    }
    }
    catch(err)
        {
            console.log("Can not see the database" , err);
        }
};




// To Add product
interface ProductParams{
    title : string;
    imageUrl : string;
    price : number;
    stock : number;
};

export const AddProduct = async ({title , imageUrl , price , stock} : ProductParams)=>{
    const findProduct = await ProductModel.findOne({title : title});

    if(findProduct){
        return { data : "Product is already exist" , statusCode : 400};
    }

    const newProduct = new ProductModel({title , imageUrl , price , stock});

    await newProduct.save();

    return {data : newProduct , statusCode : 200};
};
