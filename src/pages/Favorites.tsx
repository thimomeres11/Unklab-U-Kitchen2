import { useEffect, useState } from "react";
import { menuData } from "../data/menuData";
import type { MenuItem } from "../data/menuData";
import { useCart } from "../contexts/CartContext";
import MenuCard from "../components/MenuCard";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("favorites");
    if (raw) {
      try {
        setFavorites(JSON.parse(raw));
      } catch {
        setFavorites([]);
      }
    }
    const onChange = () => {
      const raw2 = localStorage.getItem("favorites");
      setFavorites(raw2 ? JSON.parse(raw2) : []);
    };
    window.addEventListener("favorites-changed", onChange);
    return () => window.removeEventListener("favorites-changed", onChange);
  }, []);

  const favoriteItems: MenuItem[] = menuData.filter((m) =>
    favorites.includes(m.id)
  );

  const toggleFavorite = (id: number) => {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("favorites", JSON.stringify(next));
    window.dispatchEvent(new Event("favorites-changed"));
  };

  if (favoriteItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-kitchen-light">
            Favoritmu Kosong
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tekan ❤️ pada menu untuk menambahkannya ke favorit.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-kitchen-gold hover:bg-kitchen-brown text-white rounded-lg"
          >
            Lihat Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-kitchen-light mb-8">
          Daftar Favorit
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                  image: item.image,
                })
              }
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
