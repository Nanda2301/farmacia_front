import React from "react";

export const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Por que escolher a PetPharm? ✨
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-xl transition">
            <div className="text-6xl mb-4">🎯</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Produtos Mágicos</h4>
            <p className="text-gray-600">Fórmulas únicas desenvolvidas por feiticeiros especializados em pets</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition">
            <div className="text-6xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Efeito Rápido</h4>
            <p className="text-gray-600">Resultados visíveis em até 24 horas ou seu dinheiro de volta</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 hover:shadow-xl transition">
            <div className="text-6xl mb-4">💚</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">100% Natural</h4>
            <p className="text-gray-600">Ingredientes naturais e aprovados pela Ordem dos Magos Veterinários</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
