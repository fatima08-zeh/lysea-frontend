import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProductList.css"; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("http://localhost:5001/api/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("❌ Erreur chargement des produits :", error));
    };

    const handleDelete = (id) => {
      if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
          axios.delete(`http://localhost:5001/api/products/${id}`)
              .then(() => {
                  setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                  alert("✅ Produit supprimé !");
                  fetchProducts(); // 🔥 Rafraîchir la liste après suppression
              })
              .catch(error => {
                  console.error("❌ Erreur lors de la suppression :", error);
                  alert("❌ Erreur lors de la suppression du produit !");
              });
      }
  };
  

    return (
        <div className="products-list">
            <h2>🛍️ Liste des Produits</h2>
            <div className="table-container">
                <table>
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Marque</th> {/* ✅ Ajout de la colonne Marque */}
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                <img src={`http://localhost:5001${product.image_url}`} alt={product.nom} className="product-img" />
                            </td>
                            <td>{product.brand}</td> {/* ✅ Affichage de la marque */}
                            <td>{product.nom}</td>
                            <td>{product.description}</td>
                            <td>{product.prix} CAD</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(product.id)}>🗑️ Supprimer</button>
                                <button className="edit-btn" onClick={() => navigate(`/admin/edit-product/${product.id}`)}>✏️ Modifier</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList; 
