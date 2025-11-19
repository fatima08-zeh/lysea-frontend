import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import signupImage from "../assets/signup-bg.jpg";

// ✔️ API dynamique (local + production)
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    mot_de_passe: "",
    role: "client",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(`${API_BASE}/api/users/register`, formData);
      
      navigate("/login");
    } catch (error) {
      console.error("❌ Erreur inscription :", error);
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-left">
          <img src={signupImage} alt="Beauty" />
        </div>

        <div className="auth-right">
          <h1 className="brand-name">LYSÉA</h1>
          <h2>Inscription</h2>

          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

            <input
              type="text"
              name="nom"
              placeholder="Nom"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="mot_de_passe"
              placeholder="Mot de passe"
              onChange={handleChange}
              required
            />

            <button type="submit">S'inscrire</button>

            <p className="auth-note">
              En vous inscrivant, vous accédez à des offres exclusives et des conseils beauté personnalisés.
            </p>

            <p className="auth-redirect">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="auth-link">
                Se connecter
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
