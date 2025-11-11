import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const PaypalSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderID = query.get("token"); // PayPal renvoie token=ORDER_ID

    const capturePayment = async () => {
      try {
        const resp = await axios.post(
          "http://localhost:5001/api/checkout/capture-payment",
          { orderID, userId: user?.id }
        );

        if (resp.status === 200) {
          clearCart();
          alert("✅ Paiement confirmé !");
          navigate("/");
        } else {
          alert("❌ La capture du paiement a échoué.");
          navigate("/order");
        }
      } catch (e) {
        console.error("❌ Capture PayPal:", e);
        alert("❌ Erreur lors de la capture du paiement.");
        navigate("/order");
      }
    };

    if (orderID) capturePayment();
  }, [location.search, navigate, user, clearCart]);

  return <p>Traitement du paiement…</p>;
};

export default PaypalSuccess;
