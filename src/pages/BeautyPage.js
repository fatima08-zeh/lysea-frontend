import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/BeautyPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const BeautyPage = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const showFilters = true;

    const [selectedBrand, setSelectedBrand] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const { addToCart } = useContext(CartContext);

    // 🔥 API FIXÉE — Bonne URL
    useEffect(() => {
        axios
            .get(`${API_BASE}/api/products`)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Erreur chargement des produits :", error.message);
                setLoading(false);
            });
    }, []);

    // 🔍 Normalisation recherche
    const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

    // 🎯 Filtrage produits
    const filteredProducts = products
        .filter((product) =>
            product.nom?.toLowerCase().includes(normalizedSearchTerm)
        )
        .filter((product) =>
            selectedBrand ? product.brand?.toLowerCase() === selectedBrand.toLowerCase() : true
        )
        .filter((product) =>
            maxPrice ? Number(product.prix) <= Number(maxPrice) : true
        );

    return (
        <div className="beauty-page">
            <h2 className="section-title"></h2>

            <div className="page-content">
                {/* 🔵 Filtres */}
                {showFilters && (
                    <div className="filters-sidebar">
                        <h3>Filtres</h3>

                        <label>Marque</label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            <option value="">Marques</option>
                            <option value="Karine Joncas">Karine Joncas</option>
                            <option value="Watier">Watier</option>
                            <option value="Reversa">Reversa</option>
                        </select>

                        <label>Prix maximum</label>
                        <input
                            type="number"
                            placeholder="Ex: 100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />

                        <button
                            onClick={() => {
                                setSelectedBrand("");
                                setMaxPrice("");
                            }}
                        >
                            Réinitialiser
                        </button>
                    </div>
                )}

                {/* Produits */}
                {loading ? (
                    <p>Chargement des produits...</p>
                ) : filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                addToCart={() => addToCart(product)}
                                toggleFavorite={() => toggleFavorite(product)}
                                isLiked={favorites.some((fav) => fav.id === product.id)}
                                navigate={() => navigate(`/product/${product.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-products">Aucun produit disponible.</p>
                )}
            </div>
        </div>
    );
};

export default BeautyPage;
