import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const nama = localStorage.getItem("nama") || "";

  const handleLogout = () => {
    localStorage.removeItem("nama");
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-kitchen-gold via-kitchen-brown to-kitchen-dark text-white">
        <div className="container mx-auto text-center">
          {/* User Info & Logout */}
          {nama && (
            <div className="flex justify-end mb-6">
              <div className="flex items-center gap-4">
                <span className="text-lg">
                  Halo, <span className="font-bold text-2xl">{nama}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* LOGO + TITLE */}
          <div className="mb-8 flex flex-col items-center">
            {/* LOGO — sedikit di atas title */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-2xl transform -translate-y-6 mx-auto">
                <img
                  src="/images/menu/LogoUkitchen.png"
                  alt="U-Kitchen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* TITLE */}
            <div className="flex items-center gap-4 justify-center mt-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 flex items-center gap-4">
                <span>The UNKLAB U Kitchen</span>
              </h1>
            </div>

            {/* SUBTITLE */}
            <p className="text-xl md:text-2xl text-kitchen-light max-w-2xl mx-auto">
              Nikmati berbagai menu makanan dan minuman lezat dari kantin UNKLAB
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/menu"
              className="px-8 py-4 bg-white text-kitchen-brown rounded-lg font-bold text-lg hover:bg-kitchen-light transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Lihat Menu
            </Link>
            <Link
              to="/order"
              className="px-8 py-4 bg-kitchen-brown text-white rounded-lg font-bold text-lg hover:bg-kitchen-dark transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-white"
            >
              Pesan Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-kitchen-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-kitchen-light">
            Mengapa Pilih UNKLAB U Kitchen?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-kitchen-light dark:bg-kitchen-brown/30 rounded-xl">
              <div className="text-5xl mb-4">🍜</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-kitchen-light">
                Menu Beragam
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dari makanan berat hingga minuman segar, semua tersedia untuk
                Anda
              </p>
            </div>

            <div className="text-center p-6 bg-kitchen-light dark:bg-kitchen-brown/30 rounded-xl">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-kitchen-light">
                Pesan Cepat
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sistem pemesanan online yang mudah dan cepat
              </p>
            </div>

            <div className="text-center p-6 bg-kitchen-light dark:bg-kitchen-brown/30 rounded-xl">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-kitchen-light">
                Antar ke Tempat
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pesanan Anda akan diantarkan langsung ke Tempat Anda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-kitchen-gold to-kitchen-brown text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memesan?</h2>
          <p className="text-xl mb-8 text-kitchen-light">
            Jelajahi menu kami dan pesan makanan favorit Anda sekarang!
          </p>
          <Link
            to="/menu"
            className="inline-block px-8 py-4 bg-white text-kitchen-brown rounded-lg font-bold text-lg hover:bg-kitchen-light transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Lihat Menu Lengkap
          </Link>
        </div>
      </section>
    </div>
  );
}
