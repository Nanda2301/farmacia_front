import React, { useState } from 'react';
import { CreditCard, Truck, User, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import type { CartItem } from '../../data/products';

type Props = {
  cart: CartItem[];
  totalCart: number;
  clearCart: () => void;
  navigate: (path: string) => void;
};

const CheckoutPage: React.FC<Props> = ({ cart, totalCart, clearCart, navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const isFormValid = formData.name && formData.email && formData.address && (
    formData.paymentMethod !== 'creditCard' || (formData.cardNumber && formData.cardExpiry && formData.cardCVC)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.warn('Seu carrinho está vazio.', { theme: 'colored' });
      navigate('/');
      return;
    }

    if (!isFormValid) {
      toast.warn('Preencha todos os campos obrigatórios antes de prosseguir. ⚠️', { theme: 'colored' });
      return;
    }

    console.log('Finalizando compra com os dados:', formData);

    setTimeout(() => {
      clearCart();
      toast.success('Compra finalizada com sucesso!', { theme: 'colored' });
      navigate('/profile');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-linear-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition container mx-auto px-4 py-12 text-center min-h-[70vh]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Finalização de Compra</h2>
        <p className="text-xl text-gray-500 mb-4">Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.</p>
        <button onClick={() => navigate('/')} className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition">
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Truck className="w-8 h-8 text-cyan-600" />
        Finalizar Compra
      </h2>
      
      <form onSubmit={handleCheckout} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4"><User className="w-5 h-5" /> Dados do Comprador</h3>
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
          <h3 className="text-2xl font-bold text-black flex items-center gap-2 mt-8 mb-4"><MapPin className="w-5 h-5" /> Endereço de Entrega</h3>
          <input
            type="text"
            name="address"
            placeholder="Endereço Completo (Rua, Número, Bairro, CEP)"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3  text-black  border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
          
          <h3 className="text-2xl font-bold  text-gray-800 flex items-center gap-2 mt-8 mb-4"><CreditCard className="w-5 h-5" /> Forma de Pagamento</h3>
          
          <div className="flex gap-4 text-black  flex-wrap">
            <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
              formData.paymentMethod === 'creditCard' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={formData.paymentMethod === 'creditCard'}
                onChange={handleChange}
                className="form-radio text-cyan-600"
              />
              Cartão de Crédito
            </label>
            <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
              formData.paymentMethod === 'pix' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="pix"
                checked={formData.paymentMethod === 'pix'}
                onChange={handleChange}
                className="form-radio text-cyan-600"
              />
              PIX
            </label>
          </div>

          {formData.paymentMethod === 'creditCard' && (
            <div className="space-y-4 pt-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Número do Cartão"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="Validade (MM/AA)"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
                <input
                  type="text"
                  name="cardCVC"
                  placeholder="CVC"
                  value={formData.cardCVC}
                  onChange={handleChange}
                  className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1 bg-linear-to-br from-teal-100 to-cyan-100 p-6 rounded-2xl shadow-xl sticky top-4 h-fit">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Seu Pedido</h3>
          <ul className="space-y-2 border-b pb-4 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-sm text-gray-700">
                <span className="truncate pr-2">{item.name} ({item.quantity})</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-bold text-gray-800">Total a Pagar:</span>
            <span className="text-3xl font-extrabold text-cyan-600">R$ {totalCart.toFixed(2)}</span>
          </div>
          
          <button
            type="submit"
            className="w-full mt-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-50"
            disabled={!isFormValid}
          >
            Confirmar e Pagar R$ {totalCart.toFixed(2)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;