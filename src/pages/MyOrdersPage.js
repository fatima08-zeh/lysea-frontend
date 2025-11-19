import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

// ✔️ API dynamique local + production
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const MyOrdersPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || !user.id) return; // Sécurité si pas connecté

    axios
      .get(`${API_BASE}/api/orders/user/${user.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) =>
        console.error("❌ Erreur chargement commandes :", err)
      );
  }, [user]);

  // 🔐 Si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className="orders-container">
        <h2>🛍 Mes commandes</h2>
        <p>Veuillez vous connecter pour voir vos commandes.</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>🛍 Mes commandes</h2>

      {orders.length === 0 ? (
        <p>Vous n’avez pas encore de commande.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Commande #{order.id} –{" "}
              <strong>{order.total_amount} CAD</strong> –{" "}
              {new Date(order.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrdersPage;
