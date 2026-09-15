import { createContext , useContext} from "react";
import type { cartItem } from "../../types/CartItem";


interface CartContextType {
    cartItems: cartItem[];
    totalPrice: number;
    addItemToCart: (productId: string) => void;
    updateItemCart: (productId: string , quantity:number) => void;
};


export const CartContext = createContext<CartContextType>({cartItems: [] , totalPrice: 0 , addItemToCart:()=>{} , updateItemCart: ()=>{}});


export const useCart = () => useContext(CartContext); 