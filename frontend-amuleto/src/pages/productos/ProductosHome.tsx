import './ProductosHome.css';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, type Product } from '../../services/products';

const ProductosHome = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, ] = useState(1);

    const limit = 12;

    const paginationLabel = useMemo(() => {
        if (!products.length) return '';
        return `Página ${page}`;
    }, [page, products.length]);

    useEffect(() => {
        let isMounted = true;

        setIsLoading(true);
        setError(null);

        getProducts({ page, limit, sortBy: 'id', sortOrder: 'desc' })
            .then((response) => {
                if (!isMounted) return;
                setProducts(response.data ?? []);
            })
            .catch((err: Error) => {
                if (!isMounted) return;
                setError(err.message || 'No se pudieron cargar los productos');
            })
            .finally(() => {
                if (!isMounted) return;
                setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [page]);

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

                {isLoading && <div className="products-empty">Cargando productos...</div>}
                {!isLoading && error && <div className="products-empty">{error}</div>}
                {!isLoading && !error && products.length === 0 && (
                    <div className="products-empty">No hay productos disponibles.</div>
                )}

                {!isLoading && !error && products.length > 0 && (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} onClick={() => navigate(`/producto-detalle/${product.id}`)} className="product-card">
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
                                    <h3 className="product-name">{product.nombre}</h3>
                                    <p className="product-price">{product.formattedPrice ?? `$ ${product.precio}`}</p>
                                </div>
                                <button className="add-to-cart-btn">
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                )}

                <div className="pagination" aria-label={paginationLabel}>
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
