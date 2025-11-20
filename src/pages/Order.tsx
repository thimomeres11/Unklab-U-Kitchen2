import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../contexts/CartContext";

/**
 * Order.tsx - versi dengan fitur pembayaran (mock)
 * + penyesuaian warna teks agar kontras dengan background tombol/card
 */

type PaymentMethod = "transfer" | "qris";

export default function Order() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    tableNumber: "",
    phoneNumber: "",
    Alamat: "",
  });

  // payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transfer");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<any | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // load saved alamat / nama
  useEffect(() => {
    const savedAlamat = localStorage.getItem("alamat_asrama");
    const savedNama = localStorage.getItem("nama");
    if (savedAlamat) setFormData((s) => ({ ...s, Alamat: savedAlamat }));
    if (savedNama) setFormData((s) => ({ ...s, name: savedNama }));
  }, []);

  // helper price
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = Math.round(subtotal + tax);

  // ================= Utility =================
  const randDigits = (n: number) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

  const generateVirtualAccount = () => {
    const bankCode = "123";
    return `880${bankCode}${randDigits(8)}`;
  };

  const generateQrisSvgDataUri = (payload: string) => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'>
      <rect width='100%' height='100%' fill='#fff'/>
      <rect x='20' y='20' width='260' height='260' fill='#111' />
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='12' fill='#fff'>QRIS</text>
      <text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='#fff'>${escapeXml(
        payload
      )}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  function escapeXml(unsafe: string) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  // ================= Handlers =================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "Alamat") localStorage.setItem("alamat_asrama", value);
    if (name === "name") localStorage.setItem("nama", value);
    if (name === "phoneNumber") localStorage.setItem("order_phone", value);
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

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.tableNumber ||
      !formData.phoneNumber ||
      !formData.Alamat
    ) {
      return false;
    }
    if (cart.length === 0) return false;
    return true;
  };

  const handlePlaceOrder = (e?: React.FormEvent) => {
    e?.preventDefault?.();
    if (!validateForm()) {
      alert("Lengkapi data pemesanan dan pastikan keranjang tidak kosong.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = () => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${randDigits(3)}`;
    const orderRecord = {
      id: orderId,
      name: formData.name,
      phone: formData.phoneNumber,
      alamat: formData.Alamat,
      items: cart,
      subtotal,
      tax,
      total,
      createdAt: new Date().toISOString(),
      paid: false,
    };

    localStorage.setItem("last_order", JSON.stringify(orderRecord));

    const paymentRecord: any =
      paymentMethod === "transfer"
        ? {
            method: "transfer",
            bank: "Bank Demo",
            va: generateVirtualAccount(),
            amount: orderRecord.total,
            orderId: orderRecord.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
          }
        : {
            method: "qris",
            qrisDataUri: generateQrisSvgDataUri(
              `${orderRecord.id}|${orderRecord.total}|${formData.name}`
            ),
            amount: orderRecord.total,
            orderId: orderRecord.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
          };

    setPaymentInfo(paymentRecord);
    localStorage.setItem("last_payment", JSON.stringify(paymentRecord));

    setShowConfirmModal(false);
    setShowPaymentModal(true);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setCart([]);
    }, 1200);
  };

  const simulateMarkPaid = () => {
    if (!paymentInfo) return;
    const payment = {
      ...paymentInfo,
      paidAt: new Date().toISOString(),
      paid: true,
    };
    localStorage.setItem("last_payment", JSON.stringify(payment));

    const rawOrder = localStorage.getItem("last_order");
    if (rawOrder) {
      try {
        const order = JSON.parse(rawOrder);
        order.paid = true;
        order.paidAt = new Date().toISOString();
        localStorage.setItem("last_order", JSON.stringify(order));
      } catch {}
    }

    setShowPaymentModal(false);
    navigate("/delivery");
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Teks disalin ke clipboard");
    } catch {
      alert("Gagal menyalin");
    }
  };

  const downloadDataUri = (dataUri: string, filename = "qris.svg") => {
    const a = document.createElement("a");
    a.href = dataUri;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // ================= Render =================
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-kitchen-light">
          Pemesanan
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ORDER FORM */}
          <div>
            <div className="bg-white dark:bg-kitchen-brown/30 rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Data Pemesanan
              </h2>

              <form
                id="order-form"
                onSubmit={(e) => handlePlaceOrder(e)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Nama
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-white"
                    placeholder="Masukkan nama Anda"
                    aria-label="Nama pemesan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Nomor kamar
                  </label>
                  <input
                    name="tableNumber"
                    value={formData.tableNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-white"
                    placeholder="Contoh: 202, 130, dll"
                    aria-label="Nomor kamar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Nomor HP
                  </label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-white"
                    placeholder="08xxxxxxxxxx"
                    aria-label="Nomor HP"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Alamat Asrama
                  </label>
                  <input
                    name="Alamat"
                    value={formData.Alamat}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-kitchen-dark text-gray-900 dark:text-white"
                    placeholder="Contoh: Crystal Lantai 2 Kamar 12"
                    aria-label="Alamat asrama"
                  />
                </div>

                {/* Payment method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Metode Pembayaran
                  </label>

                  <div className="flex gap-3">
                    <label
                      className={`flex-1 p-3 rounded-lg border cursor-pointer ${
                        paymentMethod === "transfer"
                          ? "border-kitchen-gold bg-kitchen-gold/10 text-gray-900 dark:text-white"
                          : "border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pm"
                        checked={paymentMethod === "transfer"}
                        onChange={() => setPaymentMethod("transfer")}
                        className="mr-2"
                        aria-label="Pilih transfer bank"
                      />
                      <span className="font-semibold">Transfer Bank</span>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        Transfer ke VA (contoh)
                      </div>
                    </label>

                    <label
                      className={`flex-1 p-3 rounded-lg border cursor-pointer ${
                        paymentMethod === "qris"
                          ? "border-kitchen-gold bg-kitchen-gold/10 text-gray-900 dark:text-white"
                          : "border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pm"
                        checked={paymentMethod === "qris"}
                        onChange={() => setPaymentMethod("qris")}
                        className="mr-2"
                        aria-label="Pilih QRIS"
                      />
                      <span className="font-semibold">QRIS</span>
                      <div className="text-xs text-gray-500 dark:text-gray-300">
                        Scan QR lalu bayar
                      </div>
                    </label>
                  </div>
                </div>

                {/* Place order */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => handlePlaceOrder()}
                    disabled={cart.length === 0}
                    className="w-full py-3 bg-kitchen-gold hover:bg-kitchen-brown text-white rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-disabled={cart.length === 0}
                    aria-label="Place order and choose payment"
                  >
                    Place Order & Pilih Pembayaran
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <OrderSummary
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />

            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                Subtotal:{" "}
                <span className="font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(subtotal)}
                </span>
              </div>
              <div>
                Pajak (10%):{" "}
                <span className="font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(tax)}
                </span>
              </div>
              <div className="font-bold text-kitchen-gold">
                Total:{" "}
                <span>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-kitchen-dark rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
              Konfirmasi Pesanan
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Total akan dibayarkan:{" "}
              <strong className="text-gray-900 dark:text-white">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(total)}
              </strong>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 bg-gray-200 rounded-lg text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-2 bg-kitchen-gold text-white rounded-lg"
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success small modal */}
      {showSuccessModal && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
            Pesanan berhasil dibuat — buka panduan pembayaran
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && paymentInfo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-kitchen-dark rounded-xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Instruksi Pembayaran
            </h3>

            {/* Transfer */}
            {paymentInfo.method === "transfer" && (
              <div className="space-y-3">
                <div className="rounded-lg border p-3 bg-gray-50 dark:bg-kitchen-dark/80">
                  <div className="text-sm text-gray-600">Bank:</div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {paymentInfo.bank}
                  </div>
                </div>

                <div className="rounded-lg border p-3 flex items-center justify-between bg-white dark:bg-kitchen-dark/80">
                  <div>
                    <div className="text-sm text-gray-600">Virtual Account</div>
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">
                      {paymentInfo.va}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => copyToClipboard(paymentInfo.va)}
                      className="px-3 py-2 bg-gray-100 rounded-lg text-gray-800"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border p-3 bg-gray-50 dark:bg-kitchen-dark/80">
                  <div className="text-sm text-gray-600">
                    Jumlah yang dibayar
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(paymentInfo.amount)}
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={simulateMarkPaid}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Saya sudah bayar (Simulasi)
                  </button>
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                    }}
                    className="flex-1 py-2 bg-gray-200 rounded-lg text-gray-800"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}

            {/* QRIS */}
            {paymentInfo.method === "qris" && (
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  Scan QRIS berikut dan bayar sesuai jumlah
                </div>

                <div className="flex items-center justify-center p-3 bg-white rounded-md">
                  <img
                    src={paymentInfo.qrisDataUri}
                    alt="QRIS"
                    className="w-48 h-48 object-contain rounded-md bg-white"
                  />
                </div>

                <div className="rounded-lg border p-3 bg-gray-50 dark:bg-kitchen-dark/80">
                  <div className="text-sm text-gray-600">
                    Jumlah yang dibayar
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(paymentInfo.amount)}
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() =>
                      downloadDataUri(paymentInfo.qrisDataUri, "qris.svg")
                    }
                    className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800"
                  >
                    Download QR
                  </button>
                  <button
                    onClick={simulateMarkPaid}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Saya sudah bayar (Simulasi)
                  </button>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500 mt-4">
              Ini hanya simulasi pembayaran. Untuk integrasi riil, hubungkan
              endpoint bank/QRIS pada bagian pembayaran.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
