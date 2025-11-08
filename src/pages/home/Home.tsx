import React, { useState } from "react";
import type { Product } from "../../data/products";
import ProductsSection from "../../components/products/ProductsSection";
import Features from "../../components/features/Features";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";
import CartSummary from "../../components/cartsummary/CartSummary";
import Footer from "../../components/footer/Footer";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const addToCart = (product: Product) => setCart((p) => [...p, product]);
  const toggleFavorite = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  const totalCart = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cart.length}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {currentPage === "home" && (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <Features />
        </>
      )}
      <ProductsSection
        addToCart={addToCart}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CartSummary cart={cart} total={totalCart} />
      <Footer />
      <div className="fixed bottom-0 left-0 w-full pointer-events-none opacity-20 z-0">
      </div>
    </div>
  );
}
