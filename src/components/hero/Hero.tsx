import React from "react";
import { ShoppingBag } from "lucide-react";

type Props = {
  setCurrentPage: (p: string) => void;
};

export const Hero: React.FC<Props> = ({ setCurrentPage }) => {
  return (
    <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight">
              Magia e Cuidado para seu
              <span className="text-cyan-500"> Pet Especial</span> 🐾
            </h2>
            <p className="text-xl text-gray-600">
              Produtos encantados e eficazes para resolver todos os problemas do seu amiguinho peludo!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage("/#products")}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Ver Produtos
              </button>

            </div>
          </div>
          <div className="text-center text-9xl animate-bounce">🐱🐶</div>
        </div>
      </div>
    </section>
  );
};
export default Hero;