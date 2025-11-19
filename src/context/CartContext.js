import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const CartContext = createContext(); 

export const CartProvider = ({ children }) => {
    const { user } = useContext(UserContext) || {};
    const [cart, setCart] = useState([]);

    
    useEffect(() => {
        if (user && user.id) {
            axios
                .get(`http://localhost:5001/api/cart/${user.id}`)
                .then((res) => setCart(res.data))
                .catch((err) => {
                    console.error("❌ Erreur chargement du panier :", err);
                    setCart([]);
                });
        }
    }, [user]);

    
    const addToCart = async (product) => {
        try {
            const exist = cart.find((item) => item.id === product.id);
            await axios.post("http://localhost:5001/api/cart/add", {
                user_id: user.id,
                product_id: product.id,
                quantity: 1,
            });

            if (exist) {
                setCart((prev) =>
                    prev.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            } else {
                setCart([...cart, { ...product, quantity: 1 }]);
            }
        } catch (error) {
            console.error("❌ Erreur ajout panier :", error);
        }
    };

   
    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/api/cart/remove/${user.id}/${productId}`);
            setCart(cart.filter((item) => item.product_id !== productId));
        } catch (error) {
            console.error("❌ Erreur suppression produit :", error);
        }
    };

    
    const clearCart = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/cart/clear/${user.id}`);
            setCart([]);
        } catch (error) {
            console.error("❌ Erreur vidage panier :", error);
        }
    };

   
    const increaseQuantity = async (productId) => {
        try {
            await axios.post("http://localhost:5001/api/cart/add", {
                user_id: user.id,
                product_id: productId,
                quantity: 1,
            });

            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.product_id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } catch (error) {
            console.error("❌ Erreur incrémentation :", error);
        }
    };

   
    const decreaseQuantity = async (productId) => {
        try {
            await axios.post("http://localhost:5001/api/cart/decrease", {
                user_id: user.id,
                product_id: productId,
            });

            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.product_id === productId && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        } catch (error) {
            console.error("❌ Erreur décrémentation :", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
                setCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
