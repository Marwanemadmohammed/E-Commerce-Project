import { STATES } from "mongoose";
import { cartModel} from "../models/cartModel.js";
import ProductModel, { type Product } from "../models/productModel.js";



interface createCartForUser{
    userId: string;
}

const createCartForUser = async ({userId}:createCartForUser)=>{
    const cart = await cartModel.create({userId , totalPrice: 0});
    await cart.save();
    return cart;
};







interface getActiveCartForUser{
    userId: string;
};



export const getActiveCartForUser = async ({userId}: getActiveCartForUser)=>{
    let getCart = await cartModel.findOne({userId , status: "active"});
    
    if(!getCart){
        getCart = await createCartForUser({userId});
    }

    return getCart;
};









interface AddItemToCart{
    productId: any;
    quantity: number;
    userId: string;
}


export const addItemToCart = async ({productId , quantity , userId} : AddItemToCart)=>{
    const cart = await getActiveCartForUser({userId});
    const existsCart = cart.items.find((p)=> p.product.toString() === productId); // .toString because the p.product is an ObjectId
    if(existsCart){
        return {data : "Item is already exist in the cart!" , statusCode: 400};
    }


    const product = await ProductModel.findById(productId);

    if(!product){
        return {data : "Product is not found" , statusCode: 400};
    }

    if(product.stock < quantity){
        return {data: "Low stock for quantity" , statusCode: 400};
    }

    cart.items.push({product: productId , unitPrice: product.price , quantity});

    // Update the total price of the cart .

    cart.totalPrice += product.price * quantity;

    const updatedCart = await cart.save();


    return {data:updatedCart , statusCode: 201};
};







interface UpdateCartForUser{
    productId: any;
    quantity: number;
    userId: string;
};


export const updateCartForUser = async ({productId , quantity ,userId} : UpdateCartForUser)=>{
    const cart = await getActiveCartForUser({userId});
    const existsItemInCart = cart.items.find((p)=> p.product.toString() === productId); 
    if(!existsItemInCart){
        return {data : "Item does not exist in the cart !"};
    };


    const product = await ProductModel.findById(productId);

    if(!product)
    {
        return {data : "Product is not found" , statusCode: 400};
    };


    if(product.stock < quantity)
    {
        return {data: "Low stock for quantity" , statusCode: 400};
    };


    existsItemInCart.quantity = quantity;


    const otherCartItems = cart.items.filter((p)=> p.product.toString() !== productId);

    let total = otherCartItems.reduce((sum , product)=>{
        sum += product.quantity * product.unitPrice;
        return sum;
    },0);


    total += existsItemInCart.quantity * existsItemInCart.unitPrice;

    cart.totalPrice = total;

    const updatedCart  = await cart.save();
    
    return {data : updatedCart , statusCode : 200};
    // Calculate the total price for the updated cart

};



interface DeleteItemInCart{
    userId: string;
    productId: any;
};


export const deleteItemInCart = async ({userId , productId} : DeleteItemInCart)=>{
    const cart = await getActiveCartForUser({userId});
        const existsItemInCart = cart.items.find((p)=> p.product.toString() === productId); 
    if(!existsItemInCart){
        return {data : "Item does not exist in the cart !"};
    };
    
    const otherCartItems = cart.items.filter((p)=> p.product.toString() !== productId);

    let total = otherCartItems.reduce((sum , product)=>{
        sum += product.quantity * product.unitPrice;
        return sum;
    },0);

    cart.totalPrice = total;

    cart.items = otherCartItems;

    const updatedCart = await cart.save();

    return {data : updatedCart , statusCode : 200};
};






// Clear all the cart 
interface clearCart{
    userId: string;
};


export const ClearCart = async ({userId} : clearCart)=>{
    const cart = await getActiveCartForUser({userId}); 
    
    cart.items = [];
    cart.totalPrice = 0;

    const clearedCart = await cart.save();

    return {data : clearedCart , statusCode: 200};
    
};

