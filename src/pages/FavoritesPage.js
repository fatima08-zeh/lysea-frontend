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

  // 🔄 Charger favoris depuis localStorage UNE seule fois
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, [setFavorites]);

  // 🔄 Sauvegarde automatique quand les favoris changent
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="beauty-page">
      <h2 className="section-title">Mes Favoris ❤️</h2>

      {favorites.length > 0 ? (
        <div className="product-grid">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              toggleFavorite={() => toggleFavorite(product)}
              addToCart={() => addToCart(product)}
              isLiked={true} // ✔️ inutile de recalculer, c’est une page de favoris
              navigate={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="no-products">Aucun favori pour le moment.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
