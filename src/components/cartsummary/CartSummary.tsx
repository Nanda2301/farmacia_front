import React from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../../data/products";

type Props = {
  cart: Product[];
  total: number;
};

export const CartSummary: React.FC<Props> = ({ cart, total }) => {
  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-2xl shadow-2xl border-2 border-cyan-500 z-40 animate-in slide-in-from-bottom">
      <div className="flex items-center gap-3 mb-2">
        <ShoppingCart className="w-5 h-5 text-cyan-600" />
        <span className="font-bold text-gray-800">Carrinho</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{cart.length} item(s)</p>
      <p className="text-2xl font-bold text-cyan-600 mb-3">R$ {total.toFixed(2)}</p>
      <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition">
        Finalizar Compra
      </button>
    </div>
  );
};
export default CartSummary;
