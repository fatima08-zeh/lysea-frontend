import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/auth.css";
import loginImage from "../assets/login-bg.jpg";
import { Link } from "react-router-dom";

const API_BASE = "https://lysea-backend.onrender.com";



const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", mot_de_passe: "" });
  const [errorMessage, setErrorMessage] = useState(""); 
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const response = await axios.post(`${API_BASE}/api/users/login`, formData);

      if (response.data && response.data.user) {
        login(response.data.user); 
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        window.dispatchEvent(new Event("storage"));
      } else {
        setErrorMessage("Erreur de connexion, veuillez réessayer.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("⚠️ Votre compte est bloqué. Contactez l'administration.");
      } else {
        setErrorMessage("❌ Email ou mot de passe incorrect.");
      }
      console.error("❌ Erreur lors de la connexion :", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
      <div className="auth-left">
      <img src={loginImage} alt="Beauty" />
      </div>
        <div className="auth-right">
          <h1 className="brand-name">LYSÉA</h1>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
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
            <button type="submit">Se connecter</button>
            <p className="auth-note">
              En vous inscrivant, vous accédez à des offres exclusives et des conseils beauté personnalisés.
            </p>
            <p className="auth-redirect">
  Vous n’avez pas encore de compte ?{" "}
  <Link to="/register" className="auth-link">Créer un compte</Link>
</p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
