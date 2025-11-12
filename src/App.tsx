import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Delivery from './pages/Delivery';
import { useCart } from './contexts/CartContext';

function AppContent() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { getCartItemCount } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          cartItemCount={getCartItemCount()}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/delivery" element={<Delivery />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
