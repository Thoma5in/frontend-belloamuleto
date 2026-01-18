
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/icons/icono-bello-amuleto.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Mobile Menu Toggle */}
                <button
                    className="menu-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo Section */}
                <div className="logo-section">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="header-logo" />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/productos" className="nav-link active" onClick={() => setIsMenuOpen(false)}>Nuestros Productos</Link>
                    <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Accesorios Personalizables</a>
                    <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Regalos</a>
                    <a href="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Más Vendidos</a>
                </nav>

                {/* Right Section: Search & Icons */}
                <div className="header-actions">
                    <div className="search-container">
                        <input type="text" placeholder="Aretes......." className="search-input" />
                        <Search className="search-icon" size={18} />
                    </div>

                    <div className="action-icons">
                        <button className="icon-btn" aria-label="Account" onClick={() => navigate('/register')}>
                            <User size={24} />
                        </button>
                        <Link to="/cart" className="icon-btn" aria-label="Cart">
                            <ShoppingCart size={24} />
                        </Link>
                        <Link to="/favoritos" className="icon-btn" aria-label="Wishlist">
                            <Heart size={24} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
