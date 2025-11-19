import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/BrandPage.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const BrandPage = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const decodedBrand = decodeURIComponent(brand);

    axios
      .get(`${API_BASE}/api/products/brand/${decodedBrand}`)
      .then((res) => setProducts(res.data))
      .catch((err) =>
        console.error("❌ Erreur chargement des produits par marque :", err)
      );
  }, [brand]);

  return (
    <div className="brand-page">
      <h1>{decodeURIComponent(brand)}</h1>

      <div className="products-list">
        {products.length === 0 ? (
          <p>Aucun produit disponible pour cette marque.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`${API_BASE}${product.image_url}`}
                alt={product.nom}
                className="product-image"
              />

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
