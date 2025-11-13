import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddProductPage.css";

const brands = ["Karine Joncas", "Watier", "Reversa"]; // ✅ Liste des marques
const API_BASE = "https://lysea-backend.onrender.com";

const AddProductPage = ({ onProductAdded }) => {
    const [formData, setFormData] = useState({ 
        nom: "", 
        prix: "", 
        description: "", 
        image: null, 
        brand: ""  // ✅ Utilisation de `brand` pour correspondre à la base de données
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
        data.append("brand", formData.brand); // ✅ Assure-toi que c'est bien "brand" et non "marque"
        data.append("image", formData.image);
    
        console.log("📤 Données envoyées :", Object.fromEntries(data)); // ✅ Debug
    
        try {
            const response = await axios.post(`${API_BASE}/api/products/add`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("✅ Produit ajouté !");
            navigate("/admin/products");
        } catch (error) {
            console.error("❌ Erreur :", error);
            alert("❌ Erreur lors de l'ajout !");
        }
    };
    

    return (
        <div className="add-product-page">
            <div className="product-form-container">
                <div className="product-left"></div>
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
                            type="text" 
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
                        
                        {/* ✅ Sélection de la marque */}
                        <select name="brand" value={formData.brand} onChange={handleChange} required>
                                <option value="">Sélectionner une marque</option>
                                <option value="Karine Joncas">Karine Joncas</option>
                                <option value="Watier">Watier</option>
                                <option value="Reversa">Reversa</option>
                            
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
