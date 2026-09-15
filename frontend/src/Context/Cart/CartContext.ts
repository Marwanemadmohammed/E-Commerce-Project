import { createContext , useContext} from "react";
import type { cartItem } from "../../types/CartItem";


interface CartContextType {
    cartItems: cartItem[];
    totalPrice: number;
    addItemToCart: (productId: string) => void;
};


export const CartContext = createContext<CartContextType>({cartItems: [] , totalPrice: 0 ,addItemToCart:()=>{}});


export const useCart = () => useContext(CartContext); 