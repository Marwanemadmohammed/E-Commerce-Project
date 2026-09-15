import {useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { cartItem } from "../../types/CartItem";
import { BASE_URL } from "../../Constants/BaseURL";
import { useAuth } from "../Auth/AuthContext";

// FC ==> Means function component.

const CartProvider : FC<PropsWithChildren> = ({ children }) => {

    const {token} = useAuth();

    const [cartItems, setCartItems] = useState<cartItem[]>([]);
    const [totalPrice , setTotalPrice] = useState<number>(0);
    const [error , setError] = useState("");


    const addItemToCart = async (productId: string)=>{
        try{
            const response = await fetch(`${BASE_URL}/cart/items`,
            {
            method: "POST",
            headers :{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId,
                quantity: 1
            })
        });

        if(!response.ok)
            {
                setError("Faild to add to Cart !");
            };

            const cart = await response.json();


            if(!cart){
                setError("Faild to parse Cart data");
            };


            const cartItemMapped = cart.items.map(({product , quantity} : {product : any ; quantity: any})=>(
                {
                    productId: product._id,
                    title: product.title,
                    imageUrl: product.imageUrl,
                    quantity,
                    unitPrice: product.unitPrice
                }
            ));


            setCartItems([...cartItemMapped ]);
            setTotalPrice(cart.totalPrice);
        }

        catch(error)
        {
            console.log(error);
        }
    };

    return(
            <CartContext.Provider value={{ cartItems , totalPrice , addItemToCart}}>
                {children}
            </CartContext.Provider>
    )
};


export default CartProvider;