import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditProductPag.css";
const API_BASE = "https://lysea-backend.onrender.com";

const brands = ["Karine Joncas", "Watier", "Reversa"];

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    description: "",
    image: null,
    brand: "Autre",
  });

  const [previewImage, setPreviewImage] = useState(null);

  // ✅ Charger les infos du produit existant
  useEffect(() => {
    axios
      axios.get(`${API_BASE}/api/products/${id}`)
      .then((response) => {
        const product = response.data;
        setFormData({
          nom: product.nom,
          prix: product.prix,
          description: product.description || "",
          brand: product.brand || "",
          image: null,
        });
        setPreviewImage(`${API_BASE}${product.image_url}`);
      })
      .catch((error) =>
        console.error("❌ Erreur chargement du produit :", error)
      );
  }, [id]);

  // ✅ Gérer les changements dans les champs
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // ✅ Supprimer le produit
  const deleteProduct = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
        const response = await axios.delete(`${API_BASE}/api/products/${id}`);

      if (response.status === 200) {
        alert("✅ Produit supprimé !");
        navigate("/admin/products");
      } else {
        alert(`❌ Erreur : ${response.data.message}`);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la suppression :", error);
      alert("❌ Erreur lors de la suppression du produit !");
    }
  };

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


      alert("✅ Produit mis à jour avec succès !");
      navigate("/admin/products");
    } catch (error) {
      console.error("❌ Erreur mise à jour du produit :", error);
      alert("❌ Erreur lors de la mise à jour !");
    }
  };

  return (
    <div className="edit-product-page">
      <div className="product-form-container">
        <div className="product-left">
          {previewImage && <img src={previewImage} alt="Produit actuel" />}
        </div>
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
              type="text"
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
              placeholder="Description du produit"
              rows="4"
              required
            />
            {/* ✅ Sélection de la marque */}
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une marque</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
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
