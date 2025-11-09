export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
};

export type CartItem = Product & {
  quantity: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Poção da Invisibilidade Melosa",
    description: "Para quando seu pet quer fugir dos abraços apertados",
    price: 89.9,
    category: "Poções Mágicas",
    image: "🧪",
    rating: 4.8,
    stock: 15,
  },
  {
    id: 2,
    name: "Elixir da Energia Infinita",
    description: "Especial para gatos preguiçosos que só dormem",
    price: 119.9,
    category: "Elixires",
    image: "⚡",
    rating: 4.9,
    stock: 8,
  },
  {
    id: 3,
    name: "Comprimido da Coragem para Banho",
    description: "Transforma terror aquático em momento spa relaxante",
    price: 45.9,
    category: "Comprimidos",
    image: "🛁",
    rating: 4.7,
    stock: 32,
  },
  {
    id: 4,
    name: "Spray Anti-Sofá Arranhado",
    description: "Proteja sua mobília dos ataques felinos noturnos",
    price: 67.9,
    category: "Sprays Mágicos",
    image: "🪄",
    rating: 4.6,
    stock: 20,
  },
  {
    id: 5,
    name: "Gotas do Miado Silencioso",
    description: "Para aqueles concertos às 3h da manhã",
    price: 54.9,
    category: "Gotas",
    image: "🎵",
    rating: 4.5,
    stock: 18,
  },
  {
    id: 6,
    name: "Cápsula da Obediência Canina",
    description: "Seu cão finalmente vai te ouvir... talvez",
    price: 99.9,
    category: "Cápsulas",
    image: "🐕",
    rating: 4.4,
    stock: 12,
  },
  {
    id: 7,
    name: "Pomada Anti-Travessuras",
    description: "Reduz em 50% as bagunças pela casa",
    price: 78.9,
    category: "Pomadas",
    image: "🎨",
    rating: 4.7,
    stock: 25,
  },
  {
    id: 8,
    name: "Xarope do Sono Tranquilo",
    description: "Para pets agitados que não param nunca",
    price: 85.9,
    category: "Xaropes",
    image: "😴",
    rating: 4.8,
    stock: 14,
  },
];

export const categories = [
  "Todos",
  "Poções Mágicas",
  "Elixires",
  "Comprimidos",
  "Sprays Mágicos",
  "Gotas",
  "Cápsulas",
  "Pomadas",
  "Xaropes",
];
