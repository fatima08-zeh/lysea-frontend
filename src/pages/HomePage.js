import React from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import NewsletterForm from "../components/NewsletterForm";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <span className="badge">NOUVEAU · Fait au Québec</span>

          <h1>Lyséa</h1>

          <p className="subtitle">
            Révélez votre beauté naturelle avec les meilleurs soins cosmétiques conçus pour vous.
            Femme de passion et visionnaire, Karine Joncas a créé une cosmétique unique, performante
            et innovante conçue et adaptée pour la femme active moderne.
            La science de l’EFFICACITÉ, de la BEAUTÉ et du BIEN-ÊTRE sont les forces motrices derrière
            la philosophie de la marque.
          </p>

          <p className="secondary-text">
            Des produits fabriqués au Québec avec des ingrédients de qualité, testés par des dermatologues.
            Watier est une pionnière dans l’industrie de la beauté, sublimant la beauté unique de chaque femme.
          </p>

          <button onClick={() => navigate("/beautypage")}>
            Voir les produits
          </button>
        </div>

        <div className="hero-right">
          <img src="/images/home1.png" alt="Produits Lyséa" />
        </div>
      </section>

      {/* Routine beauté */}
      <section className="routine">
        <div className="routine-left">
          <h3>HYDRA BEAUTY</h3>
          <h2>LA ROUTINE BEAUTÉ MICROFLUIDIQUE</h2>
          <p>
            Trois coffrets conçus pour vos moments : soirées audacieuses, soirées sereines et aventures lointaines.
          </p>

          <button onClick={() => navigate("/product/16")}>
            DÉCOUVRIR
          </button>
        </div>

        <div className="routine-right">
          <img src="/images/routine.png" alt="Routine Hydra Beauty" />
        </div>
      </section>

      {/* Huile démaquillante */}
      <section className="feature-oil">
        <div className="feature-oil-image">
          <img src="/images/oil.png" alt="Huile démaquillante Lise Watier" />
        </div>

        <div className="feature-oil-text">
          <h3>LISE WATIER</h3>
          <h2>HUILE DÉMAQUILLANTE HAUTE PERFORMANCE</h2>
          <p>Formulée avec des extraits d’avocat et de noix de coco…</p>

          <button
            className="btn-link"
            onClick={() => navigate("/product/17")}
          >
            DÉCOUVRIR
          </button>
        </div>
      </section>

      {/* Pourquoi Lyséa */}
      <section className="why-dangila">
        <h2>Pourquoi Lyséa ?</h2>
        <p className="why-subtext">
          Des soins naturels, efficaces, cliniquement testés et conçus pour votre bien-être global.
        </p>

        <div className="why-cards">
          <div className="why-item">
            <img src="/images/natural.png" alt="Naturel" />
            <h3>Naturel</h3>
            <p>Ingrédients locaux et doux pour tous les types de peau.</p>
          </div>

          <div className="why-item">
            <img src="/images/safety.png" alt="Sans effets secondaires" />
            <h3>Sans effet secondaire</h3>
            <p>Testés par des experts, approuvés en clinique.</p>
          </div>

          <div className="why-item">
            <img src="/images/organic.png" alt="100% organique" />
            <h3>100% Organique</h3>
            <p>Formules respectueuses de la nature et sans cruauté.</p>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="about-lysea">
        <div className="about-left">
          <h2>À propos de Lyséa</h2>
          <p>
            Lyséa sélectionne les meilleurs soins cosmétiques du Québec.
            Conçus avec des ingrédients naturels et testés en clinique,
            nos produits offrent beauté, efficacité et bien-être.
          </p>

          <div className="about-buttons">
            <button className="btn-buy" onClick={() => navigate("/beautypage")}>
              Acheter
            </button>

            <button className="btn-secondary" onClick={() => navigate("/register")}>
              S'inscrire
            </button>
          </div>
        </div>

        <div className="about-right">
          <img src="/images/home9.png" alt="Produit Lyséa" />
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div>
          <h2>Abonnez-vous à notre infolettre</h2>
          <p>Recevez des conseils beauté et nos offres exclusives</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-col">
          <p>
            Apprenez à aimer l’évolution et le changement<br />
            et vous réussirez.
          </p>

          <p>
            💼 Vous cherchez un emploi ? Écrivez-nous à&nbsp;
            <a href="mailto:lysea.jobs@gmail.com">lysea.jobs@gmail.com</a>
          </p>

          <div className="footer-icons">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-medium-m"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        <div className="footer-col">
          <p>📍 123 rue Lyséa, Montréal, QC</p>
          <p>📞 +1 514 123 4567</p>
          <a href="mailto:hello@lysea.ca">✉ hello@lysea.ca</a>
        </div>

        <div className="footer-col footer-newsletter">
          <p>Recevez nos offres spéciales et nouveautés :</p>
          <NewsletterForm />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
