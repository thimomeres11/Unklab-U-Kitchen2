import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import type { OrderForm } from "../types/cart";
import { useCart } from "../contexts/CartContext";

export default function Order() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OrderForm>({
    name: "",
    tableNumber: "",
    phoneNumber: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Keranjang Anda kosong. Silakan pilih menu terlebih dahulu.");
      return;
    }

    if (!formData.name || !formData.tableNumber || !formData.phoneNumber) {
      alert("Mohon lengkapi semua data pemesanan.");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmOrder = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);

    // Clear cart after order
    setTimeout(() => {
      setCart([]);
      setFormData({ name: "", tableNumber: "", phoneNumber: "" });
      setShowSuccessModal(false);
      navigate("/delivery");
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-kitchen-light">
          Pemesanan
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div>
            <div className="bg-white dark:bg-kitchen-brown/30 rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-kitchen-light mb-6">
                Data Pemesanan
              </h2>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-kitchen-light focus:outline-none focus:ring-2 focus:ring-kitchen-gold"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tableNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Nomor kamar
                  </label>
                  <input
                    type="text"
                    id="tableNumber"
                    name="tableNumber"
                    value={formData.tableNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-kitchen-light focus:outline-none focus:ring-2 focus:ring-kitchen-gold"
                    placeholder="Contoh: 202, 130, dll"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Nomor HP
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-kitchen-light focus:outline-none focus:ring-2 focus:ring-kitchen-gold"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Alamat"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Alamat Asrama
                  </label>
                  <input
                    type="tel"
                    id="Alamat"
                    name="Alamat"
                    value={formData.Alamat}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-kitchen-light focus:outline-none focus:ring-2 focus:ring-kitchen-gold"
                    placeholder="Masukkan alamat Anda"
                  />
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full py-3 bg-kitchen-gold hover:bg-kitchen-brown text-white rounded-lg font-bold text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-kitchen-dark rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-kitchen-light mb-4">
              Konfirmasi Pemesanan
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apakah Anda yakin ingin memesan{" "}
              {cart.reduce((sum, item) => sum + item.quantity, 0)} item?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 px-4 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-kitchen-light rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-2 px-4 bg-kitchen-gold hover:bg-kitchen-brown text-white rounded-lg font-medium transition-colors"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-kitchen-dark rounded-xl shadow-2xl max-w-md w-full p-6 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-kitchen-light mb-4">
              Pesanan Berhasil!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pesanan Anda sedang diproses. Anda akan diarahkan ke halaman
              status pengantaran.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
