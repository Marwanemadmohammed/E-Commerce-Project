import { createContext , useContext} from "react";
import type { cartItem } from "../../types/CartItem";


interface CartContextType {
    cartItems: cartItem[];
    totalPrice: number;
    addItemToCart: (productId: string) => void;
    updateItemCart: (productId: string , quantity:number) => void;
    deleteItemFromCart: (productId: string) => void;
    clearCart: () => void;
};


export const CartContext = createContext<CartContextType>({cartItems: [] 
    , totalPrice: 0 
    , addItemToCart:()=>{} 
    , updateItemCart: ()=>{} 
    , deleteItemFromCart: ()=>{} 
    , clearCart: ()=>{} 
});


export const useCart = () => useContext(CartContext); 