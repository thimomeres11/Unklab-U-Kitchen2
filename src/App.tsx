import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Delivery from "./pages/Delivery";
import Login from "./pages/Login";
import { useCart } from "./contexts/CartContext";

function Layout() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { getCartItemCount } = useCart();
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && (
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          cartItemCount={getCartItemCount()}
        />
      )}
      <main className={isLoginPage ? "" : "grow"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
