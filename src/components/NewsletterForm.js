import React, { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); 

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMsg(null);

    try {
      
const res = await fetch("http://localhost:5001/api/newsletter/subscribe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});


      if (!res.ok) throw new Error("Échec d'inscription");

      setMsg({ type: "success", text: "Merci ! Vous êtes inscrit(e) 🎉" });
      setEmail("");
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Oups, réessayez dans un instant." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
      <input
        type="email"
        placeholder="Votre e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Adresse e-mail"
      />
      <button type="submit" disabled={loading || !email}>
        {loading ? "Envoi..." : "Rejoindre"}
      </button>

      {msg && (
        <p
          style={{
            color: msg.type === "success" ? "green" : "red",
            marginTop: 6,
          }}
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
