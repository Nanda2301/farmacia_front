import React from 'react';
import { ShoppingCart, Trash2, MinusCircle, PlusCircle, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import type { CartItem } from '../../data/products';

type Props = {
  cart: CartItem[];
  totalCart: number;
  updateCartQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  navigate: (path: string) => void;
};

const CartPage: React.FC<Props> = ({ cart, totalCart, updateCartQuantity, removeFromCart, navigate }) => {
  
  const handleUpdateQuantity = (id: number, delta: 1 | -1, stock: number, name: string) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    
    if (newQuantity < 1) {
      toast.warn(`Removido o item: ${name} do carrinho.`, { theme: 'colored' });
      removeFromCart(id);
    } else if (newQuantity > stock) {
      toast.error("Estoque insuficiente! 😭", { theme: 'colored' });
    } else {
      updateCartQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id);
    toast.info(`Item removido: ${name}`, { theme: 'colored' });
  };

  return (
    <div className=" bg-linear-to-br from-cyan-50 to-blue-50 container mx-auto px-4 py-12 min-h-[70vh]">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <ShoppingCart className="w-8 h-8 text-cyan-600" />
        Seu Carrinho
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Lista de Itens */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500 mb-4">Seu carrinho está vazio! 😔</p>
              <button
                onClick={() => navigate('/')}
                className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition"
              >
                Voltar às Compras
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                    <div className="text-3xl p-3 bg-cyan-50 rounded-lg">{item.image}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)} / un</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full justify-end sm:w-auto">
                    {/* Controles de Quantidade */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1, item.stock, item.name)}
                        className="p-2 text-cyan-500 hover:bg-cyan-100 rounded-l-lg transition"
                        aria-label="Diminuir quantidade"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                      <span className="px-3 font-semibold text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1, item.stock, item.name)}
                        className="p-2 text-cyan-500 hover:bg-cyan-100 rounded-r-lg transition"
                        aria-label="Aumentar quantidade"
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Total do Item */}
                    <span className="font-bold text-gray-800 w-20 text-right">R$ {(item.price * item.quantity).toFixed(2)}</span>

                    {/* Botão de Remover */}
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-red-500 hover:text-red-700 transition p-2 ml-2"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Resumo do Pedido */}
        <div className="md:col-span-1 bg-linear-to-br from-cyan-100 to-teal-100 p-6 rounded-2xl shadow-xl sticky top-4 h-fit">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Resumo</h3>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="text-gray-600">Subtotal ({cart.length} itens)</span>
            <span className="font-semibold text-gray-800">R$ {totalCart.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-2 mb-4">
            <span className="text-gray-600">Frete Mágico</span>
            <span className="font-semibold text-green-600">GRÁTIS! ✨</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className="text-3xl font-extrabold text-cyan-600">R$ {totalCart.toFixed(2)}</span>
          </div>
          
          <button
            onClick={() => navigate('/checkout')}
            disabled={cart.length === 0}
            className="w-full bg-linear-to-r from-cyan-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Ir para o Pagamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;