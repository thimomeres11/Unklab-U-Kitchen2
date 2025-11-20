import React from "react";
import type { CartItem } from "../types/cart";

interface OrderSummaryProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

const isImageUrl = (src: unknown) =>
  typeof src === "string" && (src.startsWith("/") || src.startsWith("http"));

// Sub-component untuk setiap item (boleh pakai hooks)
function OrderSummaryItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      key={item.id}
      className="flex items-center justify-between p-4 bg-kitchen-light dark:bg-kitchen-dark rounded-lg"
    >
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-16 h-16 flex items-center justify-center rounded-md bg-white/10 overflow-hidden">
          {isImageUrl(item.image) && !imgError ? (
            <img
              src={String(item.image)}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <span className="text-3xl">{imgError ? "🍽️" : item.image}</span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 dark:text-kitchen-light">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {formatPrice(item.price)} × {item.quantity}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-kitchen-gold hover:bg-kitchen-brown text-white font-bold transition-colors"
            disabled={item.quantity <= 1}
            aria-label={`Kurangi ${item.name}`}
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-kitchen-gold hover:bg-kitchen-brown text-white font-bold transition-colors"
            aria-label={`Tambah ${item.name}`}
          >
            +
          </button>
        </div>

        <span className="font-bold text-kitchen-gold w-24 text-right">
          {formatPrice(item.price * item.quantity)}
        </span>

        <button
          onClick={() => onRemoveItem(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          aria-label={`Hapus ${item.name}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default function OrderSummary({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-kitchen-brown/30 rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Keranjang Anda kosong
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Silakan pilih menu terlebih dahulu
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-kitchen-brown/30 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-kitchen-light mb-4">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <OrderSummaryItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>

      <div className="border-t border-gray-300 dark:border-gray-600 pt-4 space-y-2">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Pajak (10%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-kitchen-gold pt-2 border-t border-gray-300 dark:border-gray-600">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
