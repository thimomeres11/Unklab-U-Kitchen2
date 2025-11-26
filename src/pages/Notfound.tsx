import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-linear-to-br from-kitchen-light via-white to-kitchen-light dark:from-kitchen-dark dark:via-kitchen-brown/60 dark:to-kitchen-dark">
      <span className="text-7xl md:text-8xl font-black text-kitchen-gold drop-shadow">
        404
      </span>
      <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800 dark:text-kitchen-light">
        Waduh, halaman tidak ditemukan
      </h1>
      <p className="mt-4 max-w-lg text-gray-600 dark:text-gray-300">
        Sepertinya kamu tersesat. Menu atau halaman yang kamu cari tidak
        tersedia, mungkin sudah dipindahkan atau namanya salah ketik.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/home"
          className="px-6 py-3 rounded-xl bg-kitchen-gold text-white font-semibold shadow-lg hover:bg-kitchen-brown transition-colors"
        >
          Kembali ke Home
        </Link>

      </div>
    </div>
  );
}

