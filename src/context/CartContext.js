import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);


    // Charger le panier depuis le localStorage lors de l'initialisation
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Sauvegarder le panier dans le localStorage à chaque mise à jour
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cart]);

    useEffect(() => {
        const loadCart = async () => {
            if (user && user.id) {
                try {
                    const url = `http://localhost:5001/api/cart/${user.id}`;
                    console.log("🔗 URL de récupération du panier :", url);
                    
                    const response = await axios.get(url);
                    console.log("🛒 Panier chargé pour l'utilisateur :", user.id, response.data);
                    setCart(response.data);
                } catch (error) {
                    console.error("❌ Erreur chargement du panier :", error);
                    setCart([]);
                }
            } else {
                console.warn("⚠️ ID utilisateur non défini ou utilisateur non connecté.");
            }
        };
        loadCart();
    }, [user]);

    // Ajouter un produit au panier
    const addToCart = async (product) => {
        try {
            const existingProduct = cart.find((item) => item.id === product.id);
            if (existingProduct) {
                await axios.post("http://localhost:5001/api/cart/add", {
                    user_id: user.id,
                    product_id: product.id,
                    quantity: 1,
                });

                setCart((prevCart) =>
                    prevCart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            } else {
                await axios.post("http://localhost:5001/api/cart/add", {
                    user_id: user.id,
                    product_id: product.id,
                    quantity: 1,
                });
                setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
            }
        } catch (error) {
            console.error("❌ Erreur ajout panier :", error.message);
        }
    };

    // Vider le panier
const clearCart = async () => {
    try {
        if (user) {
            console.log("🧹 Tentative de vidage du panier...");
            await axios.delete(`http://localhost:5001/api/cart/clear/${user.id}`);
        }
        setCart([]);
        localStorage.removeItem("cart"); // ✅ Nettoyage propre du localStorage
        console.log("✅ Panier vidé avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors du vidage du panier :", error);
    }
};


// Fonction pour supprimer un produit du panier
const removeFromCart = async (productId) => {
    try {
        await axios.delete(`http://localhost:5001/api/cart/remove/${user.id}/${productId}`);
        
        // Mettre à jour le panier local en supprimant uniquement l'élément avec l'ID correspondant
        setCart((prevCart) =>
            prevCart.filter((item) => item.product_id !== productId)
        );
        console.log(`🗑️ Produit avec ID ${productId} retiré du panier.`);
    } catch (error) {
        console.error("❌ Erreur lors de la suppression du produit du panier :", error);
    }
};


// Incrémenter la quantité d'un produit dans le panier
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
        console.error("❌ Erreur lors de l'incrémentation :", error);
    }
};

// Diminuer la quantité d'un produit
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
        console.error("❌ Erreur lors de la décrémentation :", error);
    }
};


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};