import { cartModel} from "../models/cartModel.js";


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