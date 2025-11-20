import { useState } from "react";
import type { MenuItem } from "../data/menuData";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export default function MenuCard({
  item,
  onAddToCart,
  isFavorite = false,
  onToggleFavorite,
}: MenuCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const isImageUrl =
    typeof item.image === "string" &&
    (item.image.startsWith("http") || item.image.startsWith("/"));

  return (
    <div className="bg-white dark:bg-kitchen-brown/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative">
      {/* Heart button (favorite) */}
      <button
        onClick={() => onToggleFavorite && onToggleFavorite(item.id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`absolute top-3 right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isFavorite ? "bg-green-100" : "bg-white/80 dark:bg-kitchen-dark/60"
        } shadow`}
      >
        <span
          className={`text-xl transition-colors ${
            isFavorite ? "text-green-600" : "text-gray-400"
          }`}
        >
          {/* menggunakan emoji heart — bisa diganti icon library */}
          {isFavorite ? "💚" : "🤍"}
        </span>
      </button>

      <div className="aspect-square bg-kitchen-light dark:bg-kitchen-dark flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 relative">
        {isImageUrl && !imageError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <span className="text-6xl mb-2">
              {isImageUrl && imageError ? "🍽️" : item.image}
            </span>
            {imageError && (
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Gambar tidak ditemukan
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-kitchen-light mb-2">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-kitchen-gold">
            {formatPrice(item.price)}
          </span>
          <button
            onClick={() => onAddToCart(item)}
            className="px-4 py-2 bg-kitchen-gold hover:bg-kitchen-brown text-white rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
