import React, { createContext, useState } from "react";

// 🔹 Création du contexte produit
export const ProductContext = createContext();

// 🔹 Fournisseur du contexte
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
