import React, { useEffect } from "react";
import { Search, Star, Package, ShoppingCart, Heart } from "lucide-react";
import { categories as categoriesData, type Product } from "../../data/products";
import { products as productsData } from "../../data/products";

type ProductsData = typeof productsData;

type Props = {
  products: ProductsData;
  addToCart: (p: Product) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
};

export const ProductsSection: React.FC<Props> = ({
  products,
  addToCart,
  favorites,
  toggleFavorite,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}) => {

  useEffect(() => {
    if (window.location.hash === '#products') {
      const section = document.getElementById('products-section');
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const lower = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(lower) || product.description.toLowerCase().includes(lower);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products-section" className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Nossos Produtos Mágicos 🪄</h3>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Procure por produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 text-black border-cyan-200 focus:border-cyan-500 focus:outline-none shadow-md"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categoriesData.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
                  : "flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:scale-100 transition flex items-center justify-center gap-2"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-8 text-center">
                <div className="text-7xl mb-2">{product.image}</div>
                <span className="inline-block bg-white px-3 py-1 rounded-full text-xs font-semibold text-cyan-600">
                  {product.category}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-cyan-600">R$ {product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">
                    <Package className="w-3 h-3 inline mr-1" />
                    {product.stock} em estoque
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Adicionar
                  </button>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-lg transition ${
                      favorites.includes(product.id) ? "bg-red-500 text-white" : "bg-linear-to-r from-red-500 to-red-500"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-white" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProductsSection;