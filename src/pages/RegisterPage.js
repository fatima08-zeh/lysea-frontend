import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import signupImage from "../assets/signup-bg.jpg";
import { Link } from "react-router-dom";

const API_BASE = "https://lysea-backend.onrender.com";

<div className="auth-left">
  <img src={signupImage} alt="Beauty" />
</div>


const RegisterPage = () => {
  const [formData, setFormData] = useState({ nom: "", email: "", telephone: "", mot_de_passe: "", role: "client" });
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
      alert("Inscription réussie !");
      navigate("/login");
    } catch (error) {
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
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="telephone" placeholder="Téléphone" onChange={handleChange} required />
            <input type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} required />


            <button type="submit">S'inscrire</button>
            <p className="auth-note">
              En vous inscrivant, vous accédez à des offres exclusives et des conseils beauté personnalisés.
            </p>
            <p className="auth-redirect">
  Vous avez déjà un compte ?{" "}
  <Link to="/login" className="auth-link">Se connecter</Link>
</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
