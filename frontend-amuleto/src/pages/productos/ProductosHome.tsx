import React from 'react';
import './ProductosHome.css';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const ProductosHome = () => {
    // Mock data for products
    const products = Array(15).fill({
        id: 1,
        name: 'Dual Hongo',
        price: '$ 50.000',
    });

    return (
        <div className="productos-page">
            <div className="productos-container">
                <h1 className="productos-title">Nuestros Productos</h1>

                <div className="filters-section">
                    <div className="filters-group">
                        <span className="filters-label">Filtros</span>
                        <div className="filter-dropdown">
                            <span>Filtro 1</span>
                            <ChevronDown size={14} />
                        </div>
                        <div className="filter-dropdown">
                            <span>Filtro 2</span>
                            <ChevronDown size={14} />
                        </div>
                        <div className="filter-dropdown">
                            <span>Filtro 3</span>
                            <ChevronDown size={14} />
                        </div>
                        <div className="filter-dropdown">
                            <span>Filtro 4</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                    <div className="sort-dropdown">
                        <span>A - Z</span>
                        <ChevronDown size={14} />
                    </div>
                </div>

                <div className="products-grid">
                    {products.map((_, index) => (
                        <div key={index} className="product-card">
                            <div className="product-image-container">
                                <div className="product-image-placeholder">
                                    {/* No image placed as requested */}
                                </div>
                                <button className="wishlist-btn">
                                    <Heart size={20} />
                                </button>
                            </div>
                            <div className="product-info">
                                <div className="product-details">
                                    <h3 className="product-name">Dual Hongo</h3>
                                    <p className="product-price">$ 50.000</p>
                                </div>
                                <button className="add-to-cart-btn">
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button className="pagination-btn arrow">
                        <ChevronLeft size={18} /> Anterior
                    </button>
                    <div className="pagination-numbers">
                        <span className="page-number active">1</span>
                        <span className="pagination-dot"></span>
                        <span className="page-number">20</span>
                        <span className="pagination-dot"></span>
                        <span className="page-number">100</span>
                    </div>
                    <button className="pagination-btn arrow">
                        Siguiente <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductosHome;
