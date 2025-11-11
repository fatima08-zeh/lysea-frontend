import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UsersList.css";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/users/all");
            setUsers(response.data);
        } catch (error) {
            console.error("❌ Erreur chargement des utilisateurs :", error);
        }
    };

    const handleBlock = async (id) => {
        if (window.confirm("Voulez-vous vraiment bloquer cet utilisateur ?")) {
            try {
                await axios.put(`http://localhost:5001/api/users/block/${id}`);
                alert("Utilisateur bloqué !");
                fetchAllUsers();
            } catch (error) {
                console.error("❌ Erreur lors du blocage :", error);
            }
        }
    };

    const handleUnblock = async (id) => {
        if (window.confirm("Voulez-vous vraiment débloquer cet utilisateur ?")) {
            try {
                await axios.put(`http://localhost:5001/api/users/unblock/${id}`);
                alert("Utilisateur débloqué !");
                fetchAllUsers();
            } catch (error) {
                console.error("❌ Erreur lors du déblocage :", error);
            }
        }
    };

    return (
        <div className="users-list">
            <h2>👥 Liste des Utilisateurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Rôle</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="7">Aucun utilisateur trouvé.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nom}</td>
                                <td>{user.email}</td>
                                <td>{user.telephone}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.is_blocked ? (
                                        <span className="status-blocked">🔴 Bloqué</span>
                                    ) : user.is_connected ? (
                                        <span className="status-connected">🟢 Connecté</span>
                                    ) : (
                                        <span className="status-disconnected">⚪ Déconnecté</span>
                                    )}
                                </td>
                                <td>
                                    {user.is_blocked ? (
                                        <button className="btn-unblock" onClick={() => handleUnblock(user.id)}>Débloquer</button>
                                    ) : (
                                        <button className="btn-block" onClick={() => handleBlock(user.id)}>Bloquer</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
