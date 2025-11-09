import React from 'react';
import { User, History, Package, Heart } from 'lucide-react';

type Props = {
  favorites: number[];
}

// Simulação de Dados de Pedidos
const mockOrders = [
  { id: '2025001', date: '01/10/2025', total: 179.80, status: 'Entregue', items: 2 },
  { id: '2025002', date: '15/10/2025', total: 45.90, status: 'Em Processamento', items: 1 },
  { id: '2025003', date: '28/10/2025', total: 299.70, status: 'Enviado', items: 3 },
];

const ProfilePage: React.FC<Props> = ({ favorites }) => {
  return (
    <div className=" bg-linear-to-br from-cyan-50 to-blue-50 container mx-auto px-4 py-12 min-h-[70vh]">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <User className="w-8 h-8 text-cyan-600" />
        Seu Perfil
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Informações do Usuário */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit">
          <div className="text-center mb-6">
            <div className="text-7xl mb-2">🧙‍♀️</div>
            <h3 className="text-2xl font-bold text-gray-800">Guardião dos Pets</h3>
            <p className="text-gray-500">guardiao@petpharm.com</p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-gray-700 font-semibold">
              <Package className="w-5 h-5 text-teal-500" />
              Pedidos Totais: <span className="font-bold text-cyan-600">{mockOrders.length}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-700 font-semibold">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              Itens Favoritos: <span className="font-bold text-cyan-600">{favorites.length}</span>
            </p>
          </div>
        </div>

        {/* Histórico de Pedidos */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <History className="w-6 h-6 text-teal-600" /> Histórico de Pedidos
          </h3>
          
          <ul className="space-y-4">
            {mockOrders.map((order) => (
              <li 
                key={order.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-cyan-50 transition"
              >
                <div>
                  <p className="font-bold text-gray-800">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-600">Data: {order.date} | {order.items} itens</p>
                </div>
                <div className="text-left sm:text-right mt-2 sm:mt-0">
                  <span className="text-xl font-bold text-cyan-600">R$ {order.total.toFixed(2)}</span>
                  <p className={`text-sm font-semibold mt-1 ${
                    order.status === 'Entregue' ? 'text-green-600' : 
                    order.status === 'Enviado' ? 'text-blue-600' : 
                    'text-yellow-600'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;