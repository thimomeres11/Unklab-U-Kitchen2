export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "makanan-berat" | "makanan-ringan" | "minuman";
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan telur, ayam, dan sayuran segar",
    price: 25000,
    image: "/images/menu/nasi-omelet.jpeg",
    category: "makanan-berat",
  },
  {
    id: 2,
    name: "Mie Goreng Komplit",
    description: "Mie goreng dengan telur, rendang, sambal, dan acar",
    price: 20000,
    image: "/images/menu/MieGoreng.jpeg",
    category: "makanan-berat",
  },
  {
    id: 3,
    name: "Bakso Spesial",
    description: "Bakso sapi dengan isian sambal, daging, dan mie",
    price: 25000,
    image: "/images/menu/bakso.jpeg",
    category: "makanan-berat",
  },
  {
    id: 4,
    name: "Nasi Campur",
    description:
      "Nasi putih dengan ayam goreng, urap, sate lilit, dan sambal matah",
    price: 30000,

    image: "/images/menu/NasiCampur.jpeg",
    category: "makanan-berat",
  },
  {
    id: 5,
    name: "Bakso Daging",
    description: "Bakso dengan daging sapi, tulang, dan kuah kaldu gurih",
    price: 22000,
    image: "/images/menu/bakso.jpeg",
    category: "makanan-berat",
  },
  {
    id: 6,
    name: "Gado-Gado",
    description: "Sayuran rebus dengan bumbu kacang khas Indonesia",
    price: 27000,
    image: "/images/menu/Gado_gado.jpeg",
    category: "makanan-berat",
  },
  {
    id: 7,
    name: "Nasi Apong",
    description: "Nasi khas Manado dengan sambal roa dan lauk lengkap",
    price: 20000,
    image: "/images/menu/NasiApong.jpeg",
    category: "makanan-berat",
  },

  // Makanan Ringan
  {
    id: 8,
    name: "Pisang Sepatu",
    description: "Pisang goreng crispy dengan taburan gula",
    price: 8000,
    image: "/images/menu/PisangSpatu.jpeg", // placeholder karena tidak ada pisang image
    category: "makanan-ringan",
  },
  {
    id: 9,
    name: "Roti Bakar",
    description: "Roti bakar dengan selai coklat atau keju",
    price: 12000,
    image: "🍞",
    category: "makanan-ringan",
  },
  {
    id: 10,
    name: "Lumpia Basah",
    description: "Lumpia dengan isian sayuran dan daging",
    price: 10000,
    image: "🌯",
    category: "makanan-ringan",
  },
  {
    id: 11,
    name: "Kentang Goreng",
    description: "Kentang goreng crispy dengan saus sambal",
    price: 15000,
    image: "/images/menu/Kentang.jpeg",
    category: "makanan-ringan",
  },
  {
    id: 12,
    name: "Tahu Isi",
    description: "Tahu goreng dengan isian sayuran dan daging",
    price: 8000,
    image: "🧆",
    category: "makanan-ringan",
  },
  {
    id: 13,
    name: "Bakwan Jagung",
    description: "Bakwan jagung goreng yang renyah dan gurih",
    price: 10000,
    image: "/images/menu/Bakwan.jpeg",
    category: "makanan-ringan",
  },

  // Minuman
  {
    id: 14,
    name: "Es Kepal Milo",
    description: "Campuran buah dan jelly dengan sirup dan susu",
    price: 15000,
    image: "/images/menu/Eskepalmilo.jpeg",
    category: "minuman",
  },

  {
    id: 15,
    name: "Nutrisari",
    description: "Sayuran rebus dengan bumbu kacang khas Indonesia",
    price: 18000,
    image: "/images/menu/Nutrisari.jpeg",
    category: "minuman",
  },

  {
    id: 16,
    name: "Tinutuan",
    description: "Bubur Manado (Tinutuan) dengan sayuran segar",
    price: 18000,
    image: "/images/menu/Tinutuan.jpeg",
    category: "makanan-berat",
  },
  {
    id: 17,
    name: "Aqua",
    description: "Es teh dengan gula dan es",
    price: 5000,
    image: "/images/menu/Aqua.jpeg",
    category: "minuman",
  },
  {
    id: 18,
    name: "Smoothie",
    description: "Smoothie dengan buah-buahan",
    price: 10000,
    image: "/images/men/SmoothieTaro.jpeg",
    category: "minuman",
  },
];
