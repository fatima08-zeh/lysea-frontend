import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { FaTrash } from "react-icons/fa";
import "../styles/CartPage.css";
const API_BASE = "https://lysea-backend.onrender.com";

const CartPage = () => {
    const { cart, addToCart, removeFromCart, clearCart, decreaseQuantity, increaseQuantity } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        console.log("📦 Produits dans le panier :", cart);
    }, [cart]);

    // Charger l'adresse depuis la base de données
    /* useEffect(() => {
       if (user) {
          axios.get(`http://localhost:5001/api/addresses/${user.id}`)
               .then((response) => setAddress(response.data))
               .catch((error) => console.error("❌ Erreur chargement de l'adresse :", error));
        }
    }, [user]);*/

    const totalPrice = cart.reduce((acc, product) => {
        return acc + (product.prix ? product.prix * product.quantity : 0);
    }, 0);

    return (
        <div className="cart-container">
            <h2>🛒 Mon Panier</h2>

            {address ? (
                <div className="address-info">
                    <h3>Adresse de livraison</h3>
                    <p>{address.first_name} {address.last_name}</p>
                    <p>{address.phone}</p>
                    <p>{address.address}</p>
                    {address.extra_info && <p>{address.extra_info}</p>}
                    <p>{address.postal_code}</p>
                    <button onClick={() => navigate("/order")} className="edit-address-btn">
                        Modifier l'adresse
                    </button>
                </div>
            ) : (
                <p></p>
            )}

{cart.length === 0 ? (
    <p>Votre panier est vide.</p>
) : (
    <>
        <ul>
            {cart.map((product) => (
                <li key={product.product_id} className="cart-item">
                    {product.image_url && (
                        <img src={`${API_BASE}${product.image_url}`} alt={product.nom} />
                    )}
                    <div>
                        <h3>{product.nom}</h3>
                        <p>
                            {Number.isFinite(parseFloat(product.prix)) 
                                ? `${parseFloat(product.prix).toFixed(2)} CAD`
                                : "Prix non disponible"}
                        </p>

                        <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(product.product_id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product.product_id)}>+</button>
                </div>

                        <p>
                            <strong>Total : 
                                {Number.isFinite(parseFloat(product.prix)) 
                                    ? (parseFloat(product.prix) * product.quantity).toFixed(2) 
                                    : "0.00"} CAD
                            </strong>
                        </p>
                        <button className="remove-btn" onClick={() => removeFromCart(product.product_id)}>
                            <FaTrash /> Retirer
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        <h3 className="total-price">
            Total: {cart.reduce((acc, product) => {
                const prix = Number.isFinite(parseFloat(product.prix)) ? parseFloat(product.prix) : 0;
                return acc + prix * product.quantity;
            }, 0).toFixed(2)} CAD
        </h3>
                            <button
                    className="clear-cart"
                    onClick={() => {
                        clearCart();
                        alert("✅ Panier vidé !");
                    }}
                    >
                    🗑️ Vider le panier
                    </button>

                    {user ? (
                        <button onClick={() => navigate("/order")} className="checkout-btn">
                            ✅ Passer la commande
                        </button>
                    ) : (
                        <p>🔒 Veuillez vous connecter pour passer la commande.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default CartPage;
