import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const AccountPage = () => {
  const { user, token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    nom: "",
    email: "",
    adresse: "",
    telephone: ""
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Charger les infos utilisateur
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`${API_BASE}/api/users/${user.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then((res) => {
        setData({
          nom: res.data.nom,
          email: res.data.email,
          adresse: res.data.adresse || "",
          telephone: res.data.telephone || ""
        });
      })
      .catch((err) => {
        console.error(err);

        // Déconnexion en cas de token expiré
        if (err.response?.status === 401) logout();
      })
      .finally(() => setLoading(false));
  }, [user, token, logout, navigate]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Sauvegarder les infos modifiées
  const handleSave = () => {
    axios
      .put(
        `${API_BASE}/api/users/${user.id}`,
        {
          adresse: data.adresse,
          telephone: data.telephone
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      )
      .then(() => {
        setEditing(false);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
      <h1>Mon compte</h1>

      <p>
        <strong>Nom :</strong> {data.nom}
      </p>
      <p>
        <strong>Email :</strong> {data.email}
      </p>

      {!editing ? (
        <button onClick={() => setEditing(true)}>Modifier mes infos</button>
      ) : (
        <div style={{ marginTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <label>
              Adresse :
              <input
                type="text"
                name="adresse"
                value={data.adresse}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>
              Téléphone :
              <input
                type="text"
                name="telephone"
                value={data.telephone}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>
          </div>

          <button onClick={handleSave} style={{ marginRight: 12 }}>
            Enregistrer
          </button>
          <button onClick={() => setEditing(false)}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
