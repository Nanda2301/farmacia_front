import React from "react";
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
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <header className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Logo e Título */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div className="bg-white p-2 rounded-full shadow-md">
              <Fish className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                PetPharm <Sparkles className="w-6 h-6 text-yellow-200" />
              </h1>
              <p className="text-xs text-cyan-100">
                Farmácia Mágica para Pets
              </p>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentPage("home")}
              className={`hover:text-yellow-200 transition flex items-center gap-2 ${
                currentPage === "home" ? "text-yellow-200" : ""
              }`}
            >
              <Home className="w-5 h-5" />
              Início
            </button>

            <button
              onClick={() => setCurrentPage("products")}
              className={`hover:text-yellow-200 transition flex items-center gap-2 ${
                currentPage === "products" ? "text-yellow-200" : ""
              }`}
            >
              <Grid className="w-5 h-5" />
              Produtos
            </button>

            <button
              onClick={() => setCurrentPage("profile")}
              className={`hover:text-yellow-200 transition flex items-center gap-2 ${
                currentPage === "profile" ? "text-yellow-200" : ""
              }`}
            >
              <UserCircle className="w-5 h-5" />
              Perfil
            </button>

            <button
              className="relative hover:scale-110 transition"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Botão Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in-down">
            <button
              onClick={() => {
                setCurrentPage("home");
                setIsMenuOpen(false);
              }}
              className="w-full text-left py-2 hover:bg-cyan-500 px-4 rounded flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Início
            </button>

            <button
              onClick={() => {
                setCurrentPage("products");
                setIsMenuOpen(false);
              }}
              className="w-full text-left py-2 hover:bg-cyan-500 px-4 rounded flex items-center gap-2"
            >
              <Grid className="w-5 h-5" />
              Produtos
            </button>

            <button
              onClick={() => {
                setCurrentPage("profile");
                setIsMenuOpen(false);
              }}
              className="w-full text-left py-2 hover:bg-cyan-500 px-4 rounded flex items-center gap-2"
            >
              <UserCircle className="w-5 h-5" />
              Perfil
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
