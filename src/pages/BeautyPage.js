import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/BeautyPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";
const API_BASE = "https://lysea-backend.onrender.com";

const BeautyPage = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const showFilters = true;

    const [selectedBrand, setSelectedBrand] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios
            .get(axios.get(`${API_BASE}/api/products`))
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Erreur chargement des produits :", error.message);
                setLoading(false);
            });
    }, []);

    const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

    const filteredProducts = products
        .filter((product) =>
            product.nom && product.nom.toLowerCase().includes(normalizedSearchTerm)
        )
        .filter((product) =>
            selectedBrand ? product.brand?.toLowerCase().trim() === selectedBrand.toLowerCase().trim() : true
        )
        .filter((product) =>
            maxPrice ? product.prix <= parseFloat(maxPrice) : true
        );

    return (
        <div className="beauty-page">
            <h2 className="section-title"></h2>

            <div className="page-content">
                {showFilters && (
                    <div className="filters-sidebar">
                        <h3>Filtres</h3>

                        <label>Marque</label>
                        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
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

                        <button onClick={() => {
                            setSelectedBrand("");
                            setMaxPrice("");
                        }}>Réinitialiser</button>
                    </div>
                )}

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
