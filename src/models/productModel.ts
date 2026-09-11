import mongoose , {Schema , Document} from "mongoose";

export interface Product extends Document{
    title : string;
    imageUrl : string;
    price : number;
    stock : number;
};

const productSchema : Schema = new Schema<Product>({
    title : {type : String , required : true},
    imageUrl : {type : String , required : true},
    price : {type : Number , required : true},
    stock : {type : Number , required : true , default : 0} // Means if you are not enter the stock to product that means stock = 0 the product is not available 

});


const ProductModel = mongoose.model<Product>("Product" , productSchema);

export default ProductModel;