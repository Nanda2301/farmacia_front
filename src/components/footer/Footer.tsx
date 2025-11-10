import React from "react";
import { Fish, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Fish className="w-6 h-6 text-cyan-400" />
              PetPharm
            </h5>
            <p className="text-gray-400 text-sm">
              A farmácia mágica que seu pet merece! 🐾✨
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 PetPharm - Todos os direitos mágicos reservados 🪄</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            Feito com <Heart className="w-4 h-4 text-red-500 fill-red-500" /> para pets do mundo todo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
