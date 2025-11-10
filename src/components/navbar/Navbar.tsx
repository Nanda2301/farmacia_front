import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Fish,
  Sparkles,
  Menu,
  X,
  Home,
  Grid,
  UserCircle,
  ShoppingCart,
} from "lucide-react";

type NavbarProps = {
  cartCount: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  navigate: (path: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  navigate,
  cartCount,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const location = useLocation();

  // 1. Estado para controlar a visibilidade da animação
  // true = Ícone (Fish) visível; false = Texto (PetPharm) visível
  const [isIconVisible, setIsIconVisible] = useState(true);

  // 2. Efeito para criar o ciclo de alternância
  useEffect(() => {
    // Alterne o estado a cada 3 segundos (3000ms)
    const interval = setInterval(() => {
      setIsIconVisible((prev) => !prev);
    }, 3000);

    // Limpeza: garante que o intervalo seja parado
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/home") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  const getButtonClass = (path: string) => {
    const baseClass =
      "bg-gradient-to-bl from-blue-500 via-cyan-500 to-teal-500 py-2 hover:bg-cyan-500 px-4 rounded flex items-center gap-2 transition";
    return isActive(path)
      ? `${baseClass} text-yellow-200 ring-2 ring-yellow-200`
      : baseClass;
  };

  const getMobileButtonClass = (path: string) => {
    const baseClass =
      "bg-linear-to-r from-cyan-800 to-teal-300 w-full text-left py-2 hover:bg-cyan-500 px-4 rounded flex items-center gap-2";
    return isActive(path)
      ? `${baseClass} text-yellow-200 ring-2 ring-yellow-200`
      : baseClass;
  };

  return (
    <header className="bg-gradient-to-bl from-cyan-800 to-teal-300 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => handleNavigation("/home")}
        >
          {/* Container para o Ícone e o Título Principal - ATENÇÃO AQUI */}
          <div className="relative w-[48px] h-[48px] flex items-center justify-center"> {/* w-[48px] e h-[48px] para garantir espaço */}
            {/* Ícone (Fish) - Alterna com o Texto */}
            <div
              className={`bg-white p-2 rounded-full shadow-md transition-opacity duration-1000 ${
                isIconVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Fish className="w-8 h-8 text-cyan-500" />
            </div>

            {/* Título Principal (PetPharm) - Alterna com o Ícone */}
            <div
              className={`absolute top-0 left-0 w-max transition-opacity duration-1000 ${
                isIconVisible ? "opacity-0" : "opacity-100"
              }`}
            >
              <h1 className="text-2xl font-bold flex items-center gap-2">
                PetPharm{" "}
                <Sparkles className="w-6 h-6 text-yellow-200" />
              </h1>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
          </div>
        </div>

        {/* Desktop */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavigation("/home")}
              className={getButtonClass("/home")}
            >
              <Home className="w-5 h-5" />
              Início
            </button>

            <button
              onClick={() => handleNavigation("/products")}
              className={getButtonClass("/products")}
            >
              <Grid className="w-5 h-5" />
              Produtos
            </button>

            <button
              onClick={() => handleNavigation("/profile")}
              className={getButtonClass("/profile")}
            >
              <UserCircle className="w-5 h-5" />
              Perfil
            </button>

            <button
              onClick={() => handleNavigation("/cart")}
              className="relative hover:scale-110 transition bg-gradient-to-bl from-blue-500 via-cyan-500 to-teal-500 p-2 rounded-md"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="bg-gradient-to-bl from-blue-500 via-cyan-500 to-teal-500 w-full text-left py-2 hover:bg-cyan-500 px-4 rounded flex items-center gap-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden mt-2 pb-4 space-y-2 animate-fade-in-down px-4">
          <button
            onClick={() => handleNavigation("/home")}
            className={getMobileButtonClass("/home")}
          >
            <Home className="w-5 h-5" />
            Início
          </button>

          <button
            onClick={() => handleNavigation("/products")}
            className={getMobileButtonClass("/products")}
          >
            <Grid className="w-5 h-5" />
            Produtos
          </button>

          <button
            onClick={() => handleNavigation("/profile")}
            className={getMobileButtonClass("/profile")}
          >
            <UserCircle className="w-5 h-5" />
            Perfil
          </button>

          <button
            onClick={() => handleNavigation("/cart")}
            className={getMobileButtonClass("/cart")}
          >
            <ShoppingCart className="w-5 h-5" />
            Carrinho ({cartCount})
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;