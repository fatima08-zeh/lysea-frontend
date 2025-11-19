import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const FavoritesContext = createContext(); 
export const FavoritesProvider = ({ children }) => {
    const { user } = useContext(UserContext) || {};
    const [favorites, setFavorites] = useState([]);

    // Charger les favoris depuis la base de données
    useEffect(() => {
        if (user && user.id) {
            axios
                .get(`http://localhost:5001/api/favorites/${user.id}`)
                .then((response) => {
                    setFavorites(response.data);
                })
                .catch((error) => console.error("❌ Erreur chargement des favoris :", error));
        }
    }, [user]);

    
    const toggleFavorite = async (product) => {
        const isFavorite = favorites.some((fav) => fav.id === product.id);
    
        try {
            if (isFavorite) {
                await axios.delete("http://localhost:5001/api/favorites/remove", {
                    data: { user_id: user.id, product_id: product.id },
                });
                setFavorites(favorites.filter((fav) => fav.id !== product.id));
            } else {
                await axios.post("http://localhost:5001/api/favorites/add", {
                    user_id: user.id,
                    product_id: product.id,
                });
                setFavorites([...favorites, product]);
            }
        } catch (error) {
            console.error("❌ Erreur gestion des favoris :", error);
        }
    };


    const clearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem("favorites");
    };
    
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, setFavorites, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
