import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import "../styles/Navbar.css";
import { UserContext } from "../context/UserContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";
const API_BASE = "https://lysea-backend.onrender.com";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useContext(UserContext);
  const { favorites, clearFavorites } = useContext(FavoritesContext);
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    clearCart();
    clearFavorites();
    logout();
    navigate("/login");
  };

  // Gestion du clic en dehors du menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      // Si le clic est en dehors de l'icône ET du menu déroulant, on ferme
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest(".icon")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
  return () => setSearchTerm(""); // vide le champ de recherche quand on quitte la page
}, []);


  return (
    <nav className="navbar">
      <Link to="/" className="logo">Lyséa</Link>
      <div className="nav-links">
        <Link to="/BeautyPage">BEAUTÉ</Link>
        <Link to="/lifestyle"></Link>
        <Link to="/blog"></Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="nav-icons">
        <Link to="/favorites" className="fav-link">
          <FaHeart className="icon" />
          {favorites.length > 0 && <span className="fav-badge">{favorites.length}</span>}
        </Link>

        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="icon" />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>

        {user && (
          <Link to="/account" className="welcome-text">
             Bonjour, {user.nom}
          </Link> )}        
       {user && user.role === "admin" && <Link to="/admin" className="admin-link">Admin</Link>}

        <div className="user-menu" ref={menuRef}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
        >
          <FaUserCircle 
            className="icon" 
          />
          {menuOpen && (
            <div className="dropdown">
              {user ? (
                <button onClick={handleLogout} className="logout-btn">Déconnecter</button>
              ) : (
                <>
                  <Link to="/login" className="dropdown-item">Sign In</Link>
                  <Link to="/register" className="dropdown-item">Register Now</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
