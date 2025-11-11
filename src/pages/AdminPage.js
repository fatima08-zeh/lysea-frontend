import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminPage.css"; // ✅ Assure-toi que ce fichier existe

const AdminPage = () => {
  const [product, setProduct] = useState({ nom: "", prix: "", image: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    alert(`Produit ajouté: ${product.nom}, Prix: ${product.prix}, Image: ${product.image}`);
  };

  return (
    <div className="admin-container">
      <h1>Page d'Administration</h1>
      {/* Boutons pour les autres pages */}
      <div className="admin-links">
        <Link to="/admin/users" className="admin-button">👤 Liste des Utilisateurs</Link>
        <Link to="/admin/products" className="admin-button">📦 Liste des Produits</Link>
        <Link to="/admin/orders" className="admin-button">📜 Liste des Commandes</Link>
        <Link to="/admin/add-product" className="admin-button add-product">➕ Ajouter un Produit</Link>
      </div>
    </div>
  );
};

export default AdminPage;
