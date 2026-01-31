import { Info, Minus, Plus, MapPin } from 'lucide-react';

import { useState } from 'react';
import './cart.css';

interface CartItem {
    id: number;
    name: string;
    image: string;
    color: string;
    price: number;
    quantity: number;
    selected: boolean;
}

const Cart = () => {
    // Dummy data for the view
    const cartItems = [
        {
            id: 1,
            name: "Anillo Corazón Rojo",
            originalPrice: 1168750,
            price: 850000,
            discount: "27% OFF",
            image: "https://images.unsplash.com/photo-1605100804763-eb2fc645a45c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Placeholder
            quantity: 1
        },
        {
            id: 2,
            name: "Pendientes Dorados",
            originalPrice: 1168750,
            price: 850000,
            discount: "27% OFF",
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Placeholder
            quantity: 1
        },
        {
            id: 3,
            name: "Collar Colgante",
            originalPrice: 1168750,
            price: 850000,
            discount: "27% OFF",
            image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", // Placeholder
            quantity: 1
        }
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="cart-page">
            <h1 className="page-title">Confirmar Compra</h1>

            <div className="info-banner">
                <Info size={20} className="info-icon" />
                <span>Verifica que todo está perfecto antes de confirmar la compra</span>
            </div>

            <div className="cart-layout">
                {/* Left Column: Cart Items */}
                <div className="cart-items-section">
                    <div className="section-header">
                        <h2>Carrito</h2>
                        <span className="item-count">{cartItems.length} items</span>
                    </div>

                    <div className="items-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <div className="price-info">
                                        <span className="original-price">{formatPrice(item.originalPrice)}</span>
                                        <div className="current-price-row">
                                            <span className="current-price">{formatPrice(item.price)}</span>
                                            <span className="discount-badge">{item.discount}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quantity-controls">
                                    <button className="qty-btn"><Minus size={16} /></button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button className="qty-btn"><Plus size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Summary & Checkout */}
                <div className="checkout-sidebar">
                    {/* Discount Code */}
                    <div className="summary-card discount-section">
                        <h3>Código de descuento</h3>
                        <div className="discount-input-wrapper">
                            <input type="text" placeholder="Código de descuento" defaultValue="CUPON123" />
                            <button className="remove-code">Eliminar</button>
                        </div>
                        <span className="coupon-status">Cupón válido</span>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>{formatPrice(2550000)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Envío</span>
                                <span className="free-text">Gratis</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Total (con IVA)</span>
                                <span>{formatPrice(2550000)}</span>
                            </div>
                        </div>

                        <button className="confirm-btn">Confirmar Compra</button>
                    </div>

                    {/* Payment Method */}
                    <div className="summary-card payment-section">
                        <h3>Elige cómo pagar</h3>
                        <div className="payment-option">
                            <div className="paypal-logo">
                                <span className="p-blue">P</span><span className="p-light">ay</span><span className="p-blue">Pal</span>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="summary-card address-section">
                        <div className="no-address-content">
                            <MapPin size={40} className="map-icon" />
                            <p className="no-address-title">No hay direcciones guardadas</p>
                            <p className="no-address-subtitle">Agregue una dirección para enviar su pedido</p>
                            <button className="add-address-btn">Añadir dirección</button>
                        </div>
                    </div>
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Duall Hongo',
            image: 'https://via.placeholder.com/80',
            color: 'Rojo',
            price: 50000,
            quantity: 1,
            selected: true
        },
        {
            id: 2,
            name: 'Duall Hongo',
            image: 'https://via.placeholder.com/80',
            color: 'Rojo',
            price: 50000,
            quantity: 1,
            selected: true
        },
        {
            id: 3,
            name: 'Duall Hongo',
            image: 'https://via.placeholder.com/80',
            color: 'Rojo',
            price: 50000,
            quantity: 1,
            selected: true
        },
        {
            id: 4,
            name: 'Duall Hongo',
            image: 'https://via.placeholder.com/80',
            color: 'Rojo',
            price: 50000,
            quantity: 1,
            selected: true
        }
    ]);

    const [allSelected, setAllSelected] = useState(true);

    const shippingCost = 2000;

    const toggleSelectAll = () => {
        const newAllSelected = !allSelected;
        setAllSelected(newAllSelected);
        setCartItems(cartItems.map(item => ({ ...item, selected: newAllSelected })));
    };

    const toggleSelectItem = (id: number) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setCartItems(updatedItems);
        setAllSelected(updatedItems.every(item => item.selected));
    };

    const updateQuantity = (id: number, change: number) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const selectedItems = cartItems.filter(item => item.selected);
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;

    const formatPrice = (price: number) => {
        return `$ ${price.toLocaleString('es-CO')}`;
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <h1 className="cart-title">Tus Productos</h1>
                    <div className="empty-cart">
                        <p>Tu carrito de compras está vacío.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="cart-title">Tus Productos</h1>
                
                <div className="cart-header">
                    <button className="select-all-btn" onClick={toggleSelectAll}>
                        <input 
                            type="checkbox" 
                            checked={allSelected} 
                            readOnly
                        />
                        <span>Marcar todos</span>
                    </button>
                    <button className="search-btn">Buscar tus productos</button>
                </div>

                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="item-checkbox">
                                <input 
                                    type="checkbox" 
                                    checked={item.selected}
                                    onChange={() => toggleSelectItem(item.id)}
                                />
                            </div>
                            
                            <div className="item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <div className="item-color">
                                    <span className="color-indicator" style={{backgroundColor: '#E8C4B8'}}></span>
                                </div>
                            </div>
                            
                            <div className="item-quantity">
                                <button 
                                    className="quantity-btn"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={item.quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="quantity-value">{item.quantity}</span>
                                <button 
                                    className="quantity-btn"
                                    onClick={() => updateQuantity(item.id, 1)}
                                >
                                    +
                                </button>
                            </div>
                            
                            <div className="item-actions">
                                <button 
                                    className="delete-btn"
                                    onClick={() => removeItem(item.id)}
                                    title="Eliminar producto"
                                >
                                    🗑️
                                </button>
                                <span className="item-price">{formatPrice(item.price)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Confirmar compra</h2>
                    
                    <div className="summary-row">
                        <span>Productos ({selectedItems.length})</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="summary-row">
                        <span>Envío</span>
                        <span>{formatPrice(shippingCost)}</span>
                    </div>
                    
                    <div className="summary-divider"></div>
                    
                    <div className="summary-row summary-total">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    
                    <button className="checkout-btn">Continuar Compra</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
