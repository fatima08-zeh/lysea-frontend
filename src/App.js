import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import UsersList from "./pages/UsersList";
import ProductList from "./components/ProductList";
import OrdersList from "./pages/OrdersList";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import BeautyPage from "./pages/BeautyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from './pages/FavoritesPage';
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import BrandPage from "./pages/BrandPage";
import Confirmation from "./pages/Confirmation";
import PaypalSuccess from "./pages/PaypalSuccess";
import Chatbot from './components/Chatbot';
import AccountPage from "./pages/AccountPage";


import { UserProvider } from "./context/UserContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
    const [searchTerm, setSearchTerm] = useState(""); 
    return (
        <UserProvider>
            <CartProvider>
                <FavoritesProvider>
                    <ProductProvider>
                        <Navbar onSearch={setSearchTerm} /> 
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/BeautyPage" element={<BeautyPage searchTerm={searchTerm} />} />
                            <Route path="/admin" element={<AdminPage />} />
                            <Route path="/admin/users" element={<UsersList />} />
                            <Route path="/admin/products" element={<ProductList />} />
                            <Route path="/admin/orders" element={<OrdersList />} />
                            <Route path="/admin/add-product" element={<AddProductPage />} />
                            <Route path="/admin/edit-product/:id" element={<EditProductPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/favorites" element={<FavoritesPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/order" element={<OrderPage />} />
                            <Route path="/brands/:brandId" element={<BrandPage />} />
                            <Route path="/confirmation" element={<Confirmation />} />
                            <Route path="/paypal-success" element={<PaypalSuccess />} />
                            <Route path="/account" element={<AccountPage />} />

                        </Routes>
                        <Chatbot />
                    </ProductProvider>
                </FavoritesProvider>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
