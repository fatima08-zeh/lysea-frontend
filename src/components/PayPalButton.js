import React, { useState } from "react";
const API_BASE = "https://lysea-backend.onrender.com";

const PayPalButton = ({ amount }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/api/checkout/create-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Create-payment failed:", text);
        alert("Erreur lors de la création du paiement.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl; // redirection vers PayPal
      } else {
        alert("Lien d’approbation PayPal introuvable.");
      }
    } catch (error) {
      console.error("❌ Erreur PayPal :", error);
      alert("Erreur lors du paiement.");
    }
    setLoading(false);
  };

  return (
    <button onClick={handlePayment} className="btn-paypal" disabled={loading}>
      {loading ? "Chargement..." : "Payer avec PayPal"}
    </button>
  );
};

export default PayPalButton;
