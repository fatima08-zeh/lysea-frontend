import React, { useContext, useEffect } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "../styles/BeautyPage.css";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, toggleFavorite, setFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔄 Charger les favoris stockés dans `localStorage` au chargement
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [setFavorites]);

  // ✅ Mettre à jour `localStorage` chaque fois que les favoris changent
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="beauty-page">
      <h2 className="section-title">Mes Favoris ❤️</h2>

      {favorites.length > 0 ? (
        <div className="product-grid">
          {favorites.map((product) => (
            <div key={product.id} className="favorite-item">
              <ProductCard
                product={product}
                toggleFavorite={() => toggleFavorite(product)}
                addToCart={() => addToCart(product)}
                isLiked={favorites.some((fav) => fav.id === product.id)}
                navigate={() => navigate(`/product/${product.id}`)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">Aucun favori pour le moment.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
