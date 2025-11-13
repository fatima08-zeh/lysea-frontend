import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrdersList.css";
const API_BASE = "https://lysea-backend.onrender.com";
const OrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE}/api/orders`) // ✅ API des commandes
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
                                    {order.products.map((prod, index) => (
                                        <div key={index}>{prod.nom} x{prod.quantite}</div>
                                    ))}
                                </td>
                                <td>{order.total} DH</td>
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
