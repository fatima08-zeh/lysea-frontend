import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetailPage.css";
import { CartContext } from "../context/CartContext";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios
            .get(`${API_BASE}/api/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error("❌ Erreur chargement du produit :", error));
    }, [id]);

    if (!product) return <p>Chargement...</p>;

    return (
        <div className="product-detail-container">
            {/* ✅ URL dynamique via API_BASE */}
            <img
                src={`${API_BASE}${product.image_url}`}
                alt={product.nom}
                className="product-detail-image"
            />

            <div className="product-detail-content">
                <h2 className="product-title">{product.nom}</h2>
                <p className="product-price">{product.prix} CAD</p>
                <p className="product-description">{product.description}</p>

                <div className="quantity-selector">
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                >
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
