import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  cartItemCount: number;
}

export default function Navbar({
  darkMode,
  toggleDarkMode,
  cartItemCount,
}: NavbarProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("favorites");
        setFavCount(raw ? JSON.parse(raw).length : 0);
      } catch {
        setFavCount(0);
      }
    };
    load();
    const onChange = () => load();
    window.addEventListener("favorites-changed", onChange);
    return () => window.removeEventListener("favorites-changed", onChange);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-kitchen-dark/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center space-x-2 group">
            <span className="text-3xl">🍽️</span>
            <span className="text-2xl font-bold text-kitchen-gold group-hover:text-kitchen-brown transition-colors">
              UNKLAB U Kitchen
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/home"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/home")
                  ? "bg-kitchen-gold text-white dark:bg-kitchen-gold dark:text-kitchen-dark"
                  : "text-gray-700 dark:text-kitchen-light hover:bg-kitchen-light dark:hover:bg-kitchen-brown/30"
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/menu")
                  ? "bg-kitchen-gold text-white dark:bg-kitchen-gold dark:text-kitchen-dark"
                  : "text-gray-700 dark:text-kitchen-light hover:bg-kitchen-light dark:hover:bg-kitchen-brown/30"
              }`}
            >
              Menu
            </Link>

            <Link
              to="/favorites"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/favorites")
                  ? "bg-kitchen-gold text-white dark:bg-kitchen-gold dark:text-kitchen-dark"
                  : "text-gray-700 dark:text-kitchen-light hover:bg-kitchen-light dark:hover:bg-kitchen-brown/30"
              }`}
            >
              ❤️ Favorites
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>

            <Link
              to="/order"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/order")
                  ? "bg-kitchen-gold text-white dark:bg-kitchen-gold dark:text-kitchen-dark"
                  : "text-gray-700 dark:text-kitchen-light hover:bg-kitchen-light dark:hover:bg-kitchen-brown/30"
              }`}
            >
              Order
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/delivery"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/delivery")
                  ? "bg-kitchen-gold text-white dark:bg-kitchen-gold dark:text-kitchen-dark"
                  : "text-gray-700 dark:text-kitchen-light hover:bg-kitchen-light dark:hover:bg-kitchen-brown/30"
              }`}
            >
              Delivery
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-kitchen-light dark:bg-kitchen-brown/30 hover:bg-kitchen-gold/20 dark:hover:bg-kitchen-gold/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
