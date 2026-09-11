import ProductModel from "../models/productModel.js";

export const getAllProducts = async () =>{
    return await ProductModel.find();
};



export const seedInitialProduct = async ()=>{
    const Products = [
        {title: "Product 1" , imageUrl: "img1.jpg" , price: 100 , stock: 20 },
        {title: "Product 2" , imageUrl: "img2.jpg" , price: 500 , stock: 10 }
    ];

    const existProducts = await getAllProducts();

    if(existProducts.length === 0){
        await ProductModel.insertMany(Products);
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
