import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/BrandPage.css"; 

const BrandPage = () => {
  const { brand } = useParams(); // Récupère la marque depuis l'URL
  const [products, setProducts] = useState([]);

    useEffect(() => {
        const formattedBrand = decodeURIComponent(brand); // ✅ Décoder l'URL
        axios.get(`http://localhost:5001/api/products/brand/${formattedBrand}`)
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error("❌ Erreur chargement des produits :", error);
          });
      }, [brand]);
      

  return (
    <div className="brand-page">
      <h1>{brand}</h1>
      <div className="products-list">
        {products.length === 0 ? (
          <p>Aucun produit disponible pour cette marque.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={`http://localhost:5000${product.image_url}`} alt={product.nom} className="product-image" />
              <div className="product-info">
                <h2>{product.nom}</h2>
                <p>{product.description}</p>
                <p className="product-price">{product.prix} CAD</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrandPage;
