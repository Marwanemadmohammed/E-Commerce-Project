import { cartModel} from "../models/cartModel.js";
import ProductModel from "../models/productModel.js";


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
    const exsistCart = cart.items.find((p)=> p.product.toString() === productId); // .toString because the p.product is an ObjectId
    if(exsistCart){
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
