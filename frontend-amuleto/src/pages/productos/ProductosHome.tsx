import './ProductosHome.css';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, type Product } from '../../services/products';
import {
    getCategories,
    getCategoryId,
    getCategoryName,
    type Category,
} from '../../services/categories';

const ProductosHome = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, ] = useState(1);

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

    const limit = 12;

    const paginationLabel = useMemo(() => {
        if (!products.length) return '';
        return `Página ${page}`;
    }, [page, products.length]);

    const selectedCategoryLabel = useMemo(() => {
        if (!selectedCategoryId) return 'Categorías';
        const match = categories.find((c) => getCategoryId(c) === selectedCategoryId);
        return match ? getCategoryName(match) : 'Categorías';
    }, [categories, selectedCategoryId]);

    useEffect(() => {
        let isMounted = true;

        setCategoriesError(null);

        getCategories()
            .then((response) => {
                if (!isMounted) return;
                setCategories(response.data ?? []);
            })
            .catch((err: Error) => {
                if (!isMounted) return;
                setCategoriesError(err.message || 'No se pudieron cargar las categorías');
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!isCategoriesOpen) return;

        const onDocClick = () => setIsCategoriesOpen(false);
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, [isCategoriesOpen]);

    useEffect(() => {
        let isMounted = true;

        setIsLoading(true);
        setError(null);

        getProducts({
            page,
            limit,
            sortBy: 'id',
            sortOrder: 'desc',
            idCategoria: selectedCategoryId,
        })
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
    }, [page, selectedCategoryId]);

    return (
        <div className="productos-page">
            <div className="productos-container">
                <h1 className="productos-title">Nuestros Productos</h1>

                <div className="filters-section">
                    <div className="filters-group">
                        <span className="filters-label">Filtros</span>
                        <div className="filter-dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
                            <button
                                type="button"
                                className="filter-dropdown"
                                aria-haspopup="listbox"
                                aria-expanded={isCategoriesOpen}
                                onClick={() => setIsCategoriesOpen((v) => !v)}
                            >
                                <span>{selectedCategoryLabel}</span>
                                <ChevronDown size={14} />
                            </button>

                            {isCategoriesOpen && (
                                <div className="dropdown-menu" role="listbox" aria-label="Categorías">
                                    <button
                                        type="button"
                                        className={`dropdown-item ${selectedCategoryId === undefined ? 'dropdown-selected' : ''}`}
                                        onClick={() => {
                                            setSelectedCategoryId(undefined);
                                            setIsCategoriesOpen(false);
                                        }}
                                    >
                                        Todas
                                    </button>

                                    {categories.map((category) => {
                                        const id = getCategoryId(category);
                                        const name = getCategoryName(category);
                                        if (id === undefined) return null;

                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                className={`dropdown-item ${selectedCategoryId === id ? 'dropdown-selected' : ''}`}
                                                onClick={() => {
                                                    setSelectedCategoryId(id);
                                                    setIsCategoriesOpen(false);
                                                }}
                                            >
                                                {name}
                                            </button>
                                        );
                                    })}

                                    {categoriesError && (
                                        <div className="dropdown-separator" />
                                    )}
                                    {categoriesError && (
                                        <div className="dropdown-hint">{categoriesError}</div>
                                    )}
                                </div>
                            )}
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
