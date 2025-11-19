import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditProductPag.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const brands = ["Karine Joncas", "Watier", "Reversa"];

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    description: "",
    image: null,
    brand: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  // 📌 Charger le produit existant
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products/${id}`)
      .then((response) => {
        const product = response.data;
        setFormData({
          nom: product.nom,
          prix: product.prix,
          description: product.description || "",
          brand: product.brand || "",
          image: null,
        });

        if (product.image_url) {
          setPreviewImage(`${API_BASE}${product.image_url}`);
        }
      })
      .catch((error) => {
        console.error("❌ Erreur chargement produit :", error);
        alert("Erreur lors du chargement du produit");
      });
  }, [id]);

  // 📌 Gérer les champs du formulaire
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // 🗑️ Supprimer produit
  const deleteProduct = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      const response = await axios.delete(`${API_BASE}/api/products/${id}`);

      if (response.status === 200) {
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("❌ Erreur suppression :", error);
      alert("Erreur lors de la suppression !");
    }
  };

  // 💾 Mise à jour du produit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("prix", formData.prix);
    data.append("description", formData.description);
    data.append("brand", formData.brand);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.put(`${API_BASE}/api/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("❌ Erreur mise à jour :", error);
      alert("Erreur lors de la mise à jour !");
    }
  };

  return (
    <div className="edit-product-page">
      <div className="product-form-container">
        
        {/* Image preview */}
        <div className="product-left">
          {previewImage && <img src={previewImage} alt="Produit" />}
        </div>

        {/* Formulaire */}
        <div className="product-right">
          <h2>Modifier le Produit</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom du produit"
              required
            />

            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              placeholder="Prix"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              required
            />

            <select name="brand" value={formData.brand} onChange={handleChange} required>
              <option value="">Sélectionner une marque</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <input type="file" name="image" accept="image/*" onChange={handleChange} />

            <button type="submit">Mettre à jour</button>
          </form>

          <button className="delete-btn" onClick={deleteProduct}>
            🗑️ Supprimer le produit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
