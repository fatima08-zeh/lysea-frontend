import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalButton from "../components/PayPalButton";
import "../styles/OrderPage.css";
import { useSearchParams } from "react-router-dom";
const API_BASE = "https://lysea-backend.onrender.com";
const OrderPage = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [address, setAddress] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [addressText, setAddressText] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [defaultAddress, setDefaultAddress] = useState(false);
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const productId = params.get("id");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const totalAmount = cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);

    useEffect(() => {
        if (user && user.id) {
            axios.get(`${API_BASE}/api/addresses/${user.id}`) 
                .then((response) => {
                    if (response.data) {
                        setAddress(response.data);
                        setIsAddressSaved(true); 
                        setFirstName(response.data.first_name);
                        setLastName(response.data.last_name);
                        setPhone(response.data.phone);
                        setAddressText(response.data.address);
                        setPostalCode(response.data.postal_code);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        console.warn("📭 Aucun enregistrement d'adresse trouvé pour cet utilisateur.");
                    } else {
                        console.error("❌ Erreur chargement de l'adresse :", error);
                    }
                });
        }
    }, [user]);
    
    useEffect(() => {
        if (productId) {
            axios.get(`${API_BASE}/api/products/${productId}`)
                .then((res) => setSelectedProduct(res.data))
                .catch((err) => console.error("❌ Produit introuvable :", err));
        }
    }, [productId]);

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
        setShowPaymentForm(true);
    };

    const handlePaymentSuccess = () => {
        alert("Paiement réussi !");
        clearCart();
        navigate("/");
    };

    const handlePayPalPayment = async () => {
        try {
            const response = await axios.post(`${API_BASE}/api/checkout/create-payment`, {
                amount: (totalAmount * 1.15).toFixed(2)
            });
    
            if (response.data.approvalUrl) {
                window.location.href = response.data.approvalUrl;
            } else {
                alert("Erreur lors de la création du paiement avec PayPal");
            }
        } catch (error) {
            console.error("Erreur lors du paiement avec PayPal :", error);
            alert("Erreur lors du paiement avec PayPal");
        }
    };
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
                // 🛠️ Adresse déjà existante → mise à jour
                await axios.put(`${API_BASE}/api/addresses/${user.id}`, payload);
                alert("✅ Adresse mise à jour !");
            } else {
                // 🆕 Pas encore d'adresse → création
                await axios.post(`${API_BASE}/api/addresses/save`, {
                    user_id: user.id,
                    ...payload,
                });
                alert("✅ Adresse enregistrée !");
                setIsAddressSaved(true);
            }
    
            setIsEditing(false);
        } catch (error) {
            console.error("❌ Erreur lors de la sauvegarde de l'adresse :", error);
            alert("Erreur lors de la sauvegarde de l'adresse");
        }
    };
    

    return (
        <div className="order-page">
            <h2>Passer à la caisse 🇨🇦</h2>
            <div className="order-container">
                <div className="order-left">
                    {isAddressSaved && !isEditing ? (
                        <>
                            <h3>Adresse de livraison enregistrée</h3>
                            <p><strong>Prénom :</strong> {firstName}</p>
                            <p><strong>Nom de famille :</strong> {lastName}</p>
                            <p><strong>Téléphone :</strong> {phone}</p>
                            <p><strong>Adresse :</strong> {addressText}</p>
                            <p><strong>Code postal :</strong> {postalCode}</p>
                            <button onClick={() => setIsEditing(true)} className="edit-btn">Modifier l'adresse</button>
                        </>
                    ) : (
                        <>
                            <h3>Adresse de livraison</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleSaveAddress(); }}>
                            <div className="form-row">
                                    <input type="text" placeholder="Prénom*" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    <input type="text" placeholder="Nom de famille*" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                                <input type="tel" placeholder="Téléphone*" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <input type="text" placeholder="Adresse*" value={addressText} onChange={(e) => setAddressText(e.target.value)} required />
                                <input type="text" placeholder="Code postal*" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                                <button type="submit" className="save-btn">Enregistrer et continuer</button>
                            </form>
                        </>
                    )}
                </div>

                {isAddressSaved && (
                    <div className="order-right">
                        <h3>Total de la commande</h3>
                        <p>Sous-total : {totalAmount.toFixed(2)} CAD</p>
                        <p>Livraison : GRATUIT</p>
                        <p>Taxes : {(totalAmount * 0.15).toFixed(2)} CAD</p>
                        <p>Total estimé : {(totalAmount * 1.15).toFixed(2)} CAD</p>
                        <h4>Choisissez votre méthode de paiement :</h4>
                        <PayPalButton amount={(totalAmount * 1.15).toFixed(2)} />
                        {showPaymentForm && paymentMethod === "paypal" && (
                            <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: (totalAmount * 1.15).toFixed(2),
                                                currency_code: "CAD",
                                            }
                                        }]
                                    })}
                                    onApprove={(data, actions) => actions.order.capture().then(handlePaymentSuccess)}
                                />
                            </PayPalScriptProvider>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
