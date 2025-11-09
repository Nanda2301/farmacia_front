import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Componentes do Layout
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CartSummary from "./components/cartsummary/CartSummary";


// Páginas e Seções
import HomePage from "./pages/home/Home";
import ProductsSection from "./components/products/ProductsSection";
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import ProfilePage from './pages/profile/ProfilePage';


// Tipos e Dados
import { products as productsData, type CartItem, type Product } from "./data/products";


// --- Definições Auxiliares para Tipagem e Organização ---


type ProductsSectionProps = React.ComponentProps<typeof ProductsSection>;


interface HomeRouteProps {
  navigate: (path: string) => void;
  productsSectionProps: ProductsSectionProps;
}


/**
 * Componente que exibe o Hero, Features (HomePage) e a Seção de Produtos.
 * Usado para a rota principal e a rota /products.
 */
const HomeRouteContent: React.FC<HomeRouteProps> = ({ navigate, productsSectionProps }) => (
  <>
    <HomePage setCurrentPage={navigate} />
    <ProductsSection
      {...productsSectionProps}
    />
  </>
);


// --- Componente Principal da Aplicação (Gerencia Estado e Rotas) ---


const AppMain: React.FC = () => {
  const navigate = useNavigate(); // Hook do Router
  
  // --- Estados Centrais ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");


  const totalCart = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );


  // --- Funções de Lógica ---
  const addToCart = (product: Product, quantity: number = 1) => {
    // Lógica para adicionar item ao carrinho com validação de estoque e toast
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);


      if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
          toast.error("Estoque insuficiente! Não foi possível adicionar mais itens.", { theme: 'colored' });
          return prevCart;
        }
        toast.info(`Mais ${product.name} adicionado(s) ao carrinho!`, { theme: 'colored' });
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        if (quantity > product.stock) {
          toast.error("Estoque insuficiente! Não foi possível adicionar o item.", { theme: 'colored' });
          return prevCart;
        }
        toast.success(`${product.name} adicionado ao carrinho! ✅`, { theme: 'colored' });
        return [...prevCart, { ...product, quantity }];
      }
    });
  };


  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };


  const updateCartQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      return updatedCart.filter(item => item.quantity > 0); 
    });
  };


  const toggleFavorite = (id: number) =>
    setFavorites((prev) => {
      if (prev.includes(id)) {
        toast.info("Item removido dos favoritos.", { theme: 'colored' });
        return prev.filter((f) => f !== id);
      } else {
        toast.success("Item adicionado aos favoritos! ❤️", { theme: 'colored' });
        return [...prev, id];
      }
    });
  
  const clearCart = () => setCart([]);


  // Props para ProductsSection, unidas para facilitar a passagem
  const productsSectionProps: ProductsSectionProps = {
    products: productsData,
    addToCart: addToCart as (p: Product) => void, // Casting para evitar erro de tipo na chamada simples
    favorites: favorites,
    toggleFavorite: toggleFavorite,
    selectedCategory: selectedCategory,
    setSelectedCategory: setSelectedCategory,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
  };



  return (
    <>
      <Navbar
        cartCount={cart.length}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navigate={navigate}
      />
      
      {/* Container de conteúdo principal. min-h-[80vh] para garantir altura mínima */}
      <div className="flex-grow min-h-[80vh]">
        <Routes>
          {/* Rotas Home e Produtos (mesmo componente) */}
          <Route 
            path="/" 
            element={<HomeRouteContent navigate={navigate} productsSectionProps={productsSectionProps} />} 
          />
          <Route 
            path="/products" 
            element={<HomeRouteContent navigate={navigate} productsSectionProps={productsSectionProps} />} 
          /> 
          
          {/* Rotas das novas páginas */}
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart}
                totalCart={totalCart}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                navigate={navigate}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage 
                cart={cart}
                totalCart={totalCart}
                clearCart={clearCart}
                navigate={navigate}
              />
            } 
          />
          <Route 
            path="/profile" 
            element={<ProfilePage favorites={favorites} />} 
          />
          
          {/* Rota 404 */}
          <Route path="*" element={<div className="text-center py-20 text-2xl">Página não encontrada 😥</div>} />
        </Routes>
      </div>


      <CartSummary 
        cart={cart} 
        total={totalCart} 
        navigate={navigate}
      />
      <Footer />
    </>
  );
};


// --- Estrutura Final do App (Como no seu Exemplo) ---


export default function App() {
  return (
    <>
      {/* 1. ToastContainer */}
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      
      {/* 2. BrowserRouter */}
      <BrowserRouter>
        {/* 3. Corpo Principal (Navbar, Rotas, Footer) */}
        <AppMain />
      </BrowserRouter>
    </>
  )
}