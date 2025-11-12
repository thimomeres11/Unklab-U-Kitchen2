import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-kitchen-brown dark:bg-kitchen-dark text-kitchen-light mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-kitchen-gold mb-4 flex items-center space-x-2">
              <span>🍽️</span>
              <span>UNKLAB U Kitchen</span>
            </h3>
            <p className="text-sm text-gray-300">
              Kantin online UNKLAB yang menyediakan berbagai menu makanan dan
              minuman lezat untuk seluruh civitas akademika.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-kitchen-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-kitchen-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-gray-300 hover:text-kitchen-gold transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="text-gray-300 hover:text-kitchen-gold transition-colors"
                >
                  Order
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="text-gray-300 hover:text-kitchen-gold transition-colors"
                >
                  Delivery Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-kitchen-gold mb-4">
              Kontak
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>Depan Jasmin GK2</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🕐</span>
                <span>Senin - Jumat: 07:00 - 18:00 WITA</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📱</span>
                <a
                  href="https://wa.me/6281234567890"
                  className="hover:text-kitchen-gold transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>kitchen@unklab.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-kitchen-gold/30 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 UNKLAB U Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
