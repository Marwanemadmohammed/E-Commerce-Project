import {useEffect, useState, type FC, type PropsWithChildren } from "react";
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


        useEffect(()=>{
        if(!token){
            return;
        };


        const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if(!response.ok){
                setError("Faild to fetch User Cart , please try again later");
            };

            const cart = await response.json();

                        const cartItemMapped = cart.items.map(({product , quantity , unitPrice} : {product : any ; quantity: any ; unitPrice: number})=>(
                {
                    productId: product._id,
                    title: product.title,
                    imageUrl: product.imageUrl,
                    quantity,
                    unitPrice: unitPrice
                }
            ));

            setCartItems(cartItemMapped);
            setTotalPrice(cart.totalPrice);
        };

        fetchCart();
    },[token]);


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


    const updateItemCart = async (productId: string , quantity: number) => {
        try{
            const response = await fetch(`${BASE_URL}/cart/items`,
            {
            method: "PUT",
            headers :{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId,
                quantity,
            })
        });

        if(!response.ok)
            {
                setError("Faild to update to Cart !");
            };

            const cart = await response.json();


            if(!cart){
                setError("Faild to parse Cart data");
            };


            const cartItemMapped = cart.items.map(({product , quantity , unitPrice} : {product : any ; quantity: any ; unitPrice: number})=>(
                    {
                        productId: product._id,
                        title: product.title,
                        imageUrl: product.imageUrl,
                        quantity,
                        unitPrice
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
    

            const deleteItemFromCart = async (productId:string)=>{
            try{
            const response = await fetch(`${BASE_URL}/cart/items/${productId}`,
            {
            method: "DELETE",
            headers :{
                "Authorization": `Bearer ${token}`
            },
        });

        if(!response.ok)
            {
                setError("Faild to delete to Cart !");
            };

            const cart = await response.json();


            if(!cart){
                setError("Faild to parse Cart data");
            };


            const cartItemMapped = cart.items.map(({product , quantity , unitPrice} : {product : any ; quantity: any ; unitPrice: number})=>(
                    {
                        productId: product._id,
                        title: product.title,
                        imageUrl: product.imageUrl,
                        quantity,
                        unitPrice
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


                        const clearCart = async ()=>{
            try{
            const response = await fetch(`${BASE_URL}/cart`,
            {
            method: "DELETE",
            headers :{
                "Authorization": `Bearer ${token}`
            },
        });

        if(!response.ok)
            {
                setError("Faild to clear to Cart !");
            };

            const cart = await response.json();


            if(!cart){
                setError("Faild to parse Cart data");
            };

            setCartItems([ ]);
            setTotalPrice(0);
            }
            catch(error)
                {
                    console.log(error);
                }
            };



            

    return(
            <CartContext.Provider value={{ cartItems , totalPrice , addItemToCart , updateItemCart , deleteItemFromCart , clearCart}}>
                {children}
            </CartContext.Provider>
    )
};


export default CartProvider;


