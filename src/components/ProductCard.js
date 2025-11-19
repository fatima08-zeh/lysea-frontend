import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; 
import "../styles/ProductCard.css";

const ProductCard = ({ product, addToCart, toggleFavorite, isLiked, navigate }) => {
    return (
        <div className="product-card">
            {/* ❤️ Icône Favoris en haut à droite */}
            <FaHeart 
                className={`like-icon ${isLiked ? "liked" : ""}`} 
                onClick={() => toggleFavorite(product)} 
            />

            {/* 🖼️ Image Produit */}
            <img src={`http://localhost:5001${product.image_url}`} alt={product.nom} className="product-img" />

            {/* 📌 Infos Produit */}
            <div className="product-info">
                <h3>{product.nom}</h3>
                <p className="product-brand">{product.brand}</p>
                <p className="product-price"><strong>{product.prix} CAD</strong></p>
                <div className="product-buttons">
                    <button className="add-to-cart" onClick={() => addToCart(product)}>
                        <FaShoppingCart />
                    </button>
                    <button className="view-more" onClick={navigate}>
                        Voir plus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
