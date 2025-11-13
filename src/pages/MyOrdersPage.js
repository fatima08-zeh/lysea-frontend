import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
const API_BASE = "https://lysea-backend.onrender.com";

const MyOrdersPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      axios.get(`${API_BASE}/api/orders/user/${user.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Erreur chargement commandes :", err));
  }, [user]);

  return (
    <div className="orders-container">
      <h2>🛍 Mes commandes</h2>
      {orders.length === 0 ? (
        <p>Vous n’avez pas encore de commande.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Commande #{order.id} – {order.total_amount} CAD – {new Date(order.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrdersPage;
