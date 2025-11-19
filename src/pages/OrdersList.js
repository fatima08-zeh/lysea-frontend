import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrdersList.css";

// ✔️ API dynamique (local + production)
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const OrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_BASE}/api/orders`)
            .then(response => setOrders(response.data))
            .catch(error => console.error("❌ Erreur chargement des commandes :", error));
    }, []);

    return (
        <div className="orders-list">
            <h2>Liste des Commandes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Produits</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="5">Aucune commande enregistrée.</td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.client}</td>
                                <td>
                                    {order.products?.map((prod, index) => (
                                        <div key={index}>
                                            {prod.nom} x{prod.quantite}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.total} CAD</td>
                                <td>{order.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersList;
