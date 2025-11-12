import { useState, useEffect } from "react";
import { menuData } from "../data/menuData";
import type { MenuItem } from "../data/menuData";
import MenuCard from "../components/MenuCard";
import { useCart } from "../contexts/CartContext";

export default function Menu() {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<
    "all" | "makanan-berat" | "makanan-ringan" | "minuman"
  >("all");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">(
    "name"
  );
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(menuData);

  useEffect(() => {
    let filtered = menuData;

    // Apply filter
    if (filter !== "all") {
      filtered = filtered.filter((item) => item.category === filter);
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredMenu(sorted);
  }, [filter, sortBy]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-kitchen-light mb-4">
            Menu Kami
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Pilih makanan dan minuman favorit Anda
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-kitchen-gold text-white"
                  : "bg-kitchen-light dark:bg-kitchen-brown/30 text-gray-700 dark:text-kitchen-light hover:bg-kitchen-gold/20"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter("makanan-berat")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "makanan-berat"
                  ? "bg-kitchen-gold text-white"
                  : "bg-kitchen-light dark:bg-kitchen-brown/30 text-gray-700 dark:text-kitchen-light hover:bg-kitchen-gold/20"
              }`}
            >
              Makanan Berat
            </button>
            <button
              onClick={() => setFilter("makanan-ringan")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "makanan-ringan"
                  ? "bg-kitchen-gold text-white"
                  : "bg-kitchen-light dark:bg-kitchen-brown/30 text-gray-700 dark:text-kitchen-light hover:bg-kitchen-gold/20"
              }`}
            >
              Makanan Ringan
            </button>
            <button
              onClick={() => setFilter("minuman")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "minuman"
                  ? "bg-kitchen-gold text-white"
                  : "bg-kitchen-light dark:bg-kitchen-brown/30 text-gray-700 dark:text-kitchen-light hover:bg-kitchen-gold/20"
              }`}
            >
              Minuman
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "price-asc" | "price-desc")
            }
            className="px-4 py-2 rounded-lg bg-kitchen-light dark:bg-kitchen-brown/30 text-gray-700 dark:text-kitchen-light border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-kitchen-gold"
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenu.map((item) => (
            <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Tidak ada menu yang ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
