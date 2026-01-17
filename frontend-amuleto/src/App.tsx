import './App.css'
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import ProductosHome from './pages/productos/ProductosHome';
import Cart from './pages/carrito/Cart';
import Favoritos from './pages/favoritos/favoritos';

function App() {

  return (
    <div className="app-container">
      <Header />


      <main style={{ padding: '2rem', textAlign: 'center', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosHome />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>


      <Footer />
    </div>
  )
}

export default App
