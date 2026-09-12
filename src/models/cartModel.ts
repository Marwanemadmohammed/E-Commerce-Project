import mongoose ,{Schema , Document, type ObjectId}from "mongoose";
import type { Product } from "./productModel.js";

const CartStatusEnum = ["active" , "completed"];

export interface CartItem {
    product: Product;
    unitPrice: number;
    quantity: number;
};




export interface Cart extends Document{
    userId: ObjectId | string;
    items: CartItem[];
    totalPrice: number;
    status: "active" | "completed";
};




const CartItemSchema : Schema = new Schema<CartItem>({
    product: {type: Schema.Types.ObjectId , ref: "Product" , required: true},
    unitPrice: {type: Number , required: true },
    quantity: {type: Number , required: true , default: 1}
});



const CartSchema : Schema = new Schema<Cart>({
    userId: {type: Schema.Types.ObjectId, ref: "User" ,  required: true},
    items: { type : [CartItemSchema] , default:[] },
    totalPrice: {type: Number , required: true },
    status: {type: String , enum: CartStatusEnum , default: "active"}
});



export const cartModel = mongoose.model<Cart>("Cart" , CartSchema);