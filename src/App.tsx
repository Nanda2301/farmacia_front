import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CartSummary from "./components/cartsummary/CartSummary";
import HomePage from "./pages/home/Home";
import ProductsSection from "./components/products/ProductsSection";
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import ProfilePage from './pages/profile/ProfilePage';
import { products as productsData, type CartItem, type Product } from "./data/products";

type ProductsSectionProps = React.ComponentProps<typeof ProductsSection>;

interface HomeRouteProps {
  navigate: (path: string) => void;
  productsSectionProps: ProductsSectionProps;
}

const HomeRouteContent: React.FC<HomeRouteProps> = ({ navigate, productsSectionProps }) => (
  <>
    <HomePage setCurrentPage={navigate} />
    <ProductsSection {...productsSectionProps} />
  </>
);

const ProductsPageContent: React.FC<{ productsSectionProps: ProductsSectionProps }> = ({ productsSectionProps }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="py-8">
      <ProductsSection {...productsSectionProps} />
    </div>
  );
};

const AppMain: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const totalCart = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (product: Product, quantity: number = 1) => {
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
        toast.success(`${product.name} adicionado ao carrinho!`, { theme: 'colored' });
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

  const productsSectionProps: ProductsSectionProps = {
    products: productsData,
    addToCart: addToCart as (p: Product) => void,
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
      
      <div className="flex-grow min-h-[80vh]">
        <Routes>
          <Route 
            path="/" 
            element={<HomeRouteContent navigate={navigate} productsSectionProps={productsSectionProps} />} 
          />
          <Route 
            path="/home" 
            element={<HomeRouteContent navigate={navigate} productsSectionProps={productsSectionProps} />} 
          />
          <Route 
            path="/products" 
            element={<ProductsPageContent productsSectionProps={productsSectionProps} />} 
          /> 
          
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
          
          <Route path="*" element={<div className="text-center py-20 text-2xl">Página não encontrada</div>} />
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

export default function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      <BrowserRouter>
        <AppMain />
      </BrowserRouter>
    </>
  )
}