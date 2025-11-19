import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddProductPage.css";

const brands = ["Karine Joncas", "Watier", "Reversa"];
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prix: "",
        description: "",
        image: null,
        brand: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("nom", formData.nom);
        data.append("prix", formData.prix);
        data.append("description", formData.description);
        data.append("brand", formData.brand);
        data.append("image", formData.image);

        try {
            const response = await axios.post(
                `${API_BASE}/api/products/add`,   // ✅ URL FIXÉE
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("✅ Produit ajouté !");
            navigate("/admin/products");
        } catch (error) {
            console.error("❌ Erreur ajout produit :", error);
            alert("❌ Erreur lors de l'ajout !");
        }
    };

    return (
        <div className="add-product-page">
            <div className="product-form-container">
                <div className="product-right">
                    <h2>Ajouter un Produit</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input
                            type="text"
                            name="nom"
                            placeholder="Nom du produit"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="prix"
                            placeholder="Prix"
                            value={formData.prix}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description du produit"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionner une marque</option>
                            {brands.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
