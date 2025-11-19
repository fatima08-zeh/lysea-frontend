import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import PayPalButton from "../components/PayPalButton";
import "../styles/OrderPage.css";

// ✔️ API local + production
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const OrderPage = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [address, setAddress] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [addressText, setAddressText] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [defaultAddress, setDefaultAddress] = useState(false);

    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [params] = useSearchParams();
    const productId = params.get("id");

    const navigate = useNavigate();

    // Total panier
    const totalAmount = cart.reduce(
        (acc, item) => acc + item.prix * item.quantity,
        0
    );

    // 🔐 Redirection si pas connecté
    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    // 📌 Charger l’adresse de l’utilisateur
    useEffect(() => {
        if (!user) return;

        axios
            .get(`${API_BASE}/api/addresses/${user.id}`)
            .then((response) => {
                if (response.data) {
                    const addr = response.data;

                    setAddress(addr);
                    setIsAddressSaved(true);
                    setFirstName(addr.first_name || "");
                    setLastName(addr.last_name || "");
                    setPhone(addr.phone || "");
                    setAddressText(addr.address || "");
                    setPostalCode(addr.postal_code || "");
                }
            })
            .catch((error) => {
                if (error.response?.status === 404) {
                    console.log("📭 Aucun adresse enregistrée.");
                } else {
                    console.error("❌ Adresse erreur :", error);
                }
            });
    }, [user]);

    // 📌 Charger un produit spécifique (si param "id")
    useEffect(() => {
        if (productId) {
            axios
                .get(`${API_BASE}/api/products/${productId}`)
                .then((res) => setSelectedProduct(res.data))
                .catch((err) => console.error("❌ Produit introuvable :", err));
        }
    }, [productId]);

    // 📌 Sauvegarder ou mettre à jour l’adresse
    const handleSaveAddress = async () => {
        const payload = {
            first_name: firstName,
            last_name: lastName,
            phone,
            address: addressText,
            postal_code: postalCode,
            extra_info: extraInfo,
            is_default: defaultAddress,
        };

        try {
            if (isAddressSaved) {
                await axios.put(`${API_BASE}/api/addresses/${user.id}`, payload);
                
            } else {
                await axios.post(`${API_BASE}/api/addresses/save`, {
                    user_id: user.id,
                    ...payload,
                });
                setIsAddressSaved(true);
            }
            setIsEditing(false);
        } catch (error) {
            console.error("❌ Sauvegarde adresse :", error);
            alert("Erreur lors de la sauvegarde de l'adresse");
        }
    };

    return (
        <div className="order-page">
            <h2>Passer à la caisse 🇨🇦</h2>

            <div className="order-container">
                {/* ------- Adresse ------- */}
                <div className="order-left">
                    {isAddressSaved && !isEditing ? (
                        <>
                            <h3>Adresse enregistrée</h3>
                            <p><strong>Prénom :</strong> {firstName}</p>
                            <p><strong>Nom :</strong> {lastName}</p>
                            <p><strong>Téléphone :</strong> {phone}</p>
                            <p><strong>Adresse :</strong> {addressText}</p>
                            <p><strong>Code postal :</strong> {postalCode}</p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="edit-btn"
                            >
                                Modifier l'adresse
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>Adresse de livraison</h3>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSaveAddress();
                                }}
                            >
                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder="Prénom*"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nom*"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>

                                <input
                                    type="tel"
                                    placeholder="Téléphone*"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Adresse*"
                                    value={addressText}
                                    onChange={(e) => setAddressText(e.target.value)}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Code postal*"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                />

                                <button type="submit" className="save-btn">
                                    Enregistrer
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* ------- Paiement ------- */}
                {isAddressSaved && (
                    <div className="order-right">
                        <h3>Total de la commande</h3>
                        <p>Sous-total : {totalAmount.toFixed(2)} CAD</p>
                        <p>Livraison : GRATUIT</p>
                        <p>Taxes : {(totalAmount * 0.15).toFixed(2)} CAD</p>
                        <p className="total">
                            Total : {(totalAmount * 1.15).toFixed(2)} CAD
                        </p>

                        <h4>Payer avec PayPal</h4>

                        {/* 🔥 Bouton PayPal prêt */}
                        <PayPalButton amount={(totalAmount * 1.15).toFixed(2)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
