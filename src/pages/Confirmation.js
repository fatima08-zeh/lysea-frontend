import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Confirmation.css";  // Fichier CSS pour le style

const Confirmation = ({ message }) => {
    const navigate = useNavigate();

    return (
        <div className="confirmation-container">
            <h2>✅ Confirmation</h2>
            <p>{message || "Votre commande a été passée avec succès !"}</p>
            <button onClick={() => navigate("/")}>Retour à l'accueil</button>
        </div>
    );
};

export default Confirmation;
