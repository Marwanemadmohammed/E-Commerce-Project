import mongoose, {Schema , Document, type ObjectId} from "mongoose";


export interface OrderItem extends Document{
    productTitle: string;
    productImage: string;
    productPrice: number;
    productQuantity: number
};


const OrderItemSchema : Schema = new Schema<OrderItem>({
    productTitle: {type: String , required: true},
    productImage: {type: String , required: true},
    productPrice: {type: Number , required: true},
    productQuantity: {type: Number , required: true},
});







export interface Order extends Document{
    OrderItems: OrderItem[];
    totalPrice : number;
    address: string;
    userId: ObjectId | string;
};


const OrderSchema : Schema = new Schema<Order>({
    OrderItems: {type: [OrderItemSchema] , default:[]},
    totalPrice: {type: Number , required: true},
    address : {type: String , required: true},
    userId: {type : Schema.Types.ObjectId , ref: "User" , required: true }
});





export const OrderModel = mongoose.model<Order>("Order" , OrderSchema);