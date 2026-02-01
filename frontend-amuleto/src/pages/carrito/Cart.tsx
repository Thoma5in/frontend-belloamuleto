import { Info, MapPin, Minus, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import './cart.css';

interface CartItem {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    price: number;
    discount: string;
    quantity: number;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(price);
};

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Anillo Corazón Rojo',
            originalPrice: 1168750,
            price: 850000,
            discount: '27% OFF',
            image:
                'https://images.unsplash.com/photo-1605100804763-eb2fc645a45c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            quantity: 1,
        },
        {
            id: 2,
            name: 'Pendientes Dorados',
            originalPrice: 1168750,
            price: 850000,
            discount: '27% OFF',
            image:
                'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            quantity: 1,
        },
        {
            id: 3,
            name: 'Collar Colgante',
            originalPrice: 1168750,
            price: 850000,
            discount: '27% OFF',
            image:
                'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            quantity: 1,
        },
    ]);

    const shippingCost = 0;

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    const total = subtotal + shippingCost;

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items =>
            items.map(item => {
                if (item.id !== id) return item;
                const nextQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: nextQuantity };
            }),
        );
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <h1 className="page-title">Confirmar Compra</h1>
                <div className="info-banner">
                    <Info size={20} className="info-icon" />
                    <span>Tu carrito está vacío.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1 className="page-title">Confirmar Compra</h1>

            <div className="info-banner">
                <Info size={20} className="info-icon" />
                <span>Verifica que todo está perfecto antes de confirmar la compra</span>
            </div>

            <div className="cart-layout">
                <div className="cart-items-section">
                    <div className="section-header">
                        <h2>Carrito</h2>
                        <span className="item-count">{cartItems.length} items</span>
                    </div>

                    <div className="items-list">
                        {cartItems.map(item => (
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
                                    <button
                                        type="button"
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        aria-label="Disminuir cantidad"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        type="button"
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, 1)}
                                        aria-label="Aumentar cantidad"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="checkout-sidebar">
                    <div className="summary-card discount-section">
                        <h3>Código de descuento</h3>
                        <div className="discount-input-wrapper">
                            <input type="text" placeholder="Código de descuento" defaultValue="CUPON123" />
                            <button type="button" className="remove-code">
                                Eliminar
                            </button>
                        </div>
                        <span className="coupon-status">Cupón válido</span>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Envío</span>
                                <span className={shippingCost === 0 ? 'free-text' : undefined}>
                                    {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                                </span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        <button type="button" className="confirm-btn">
                            Confirmar Compra
                        </button>
                    </div>

                    <div className="summary-card payment-section">
                        <h3>Elige cómo pagar</h3>
                        <div className="payment-option">
                            <div className="paypal-logo">
                                <span className="p-blue">P</span>
                                <span className="p-light">ay</span>
                                <span className="p-blue">Pal</span>
                            </div>
                        </div>
                    </div>

                    <div className="summary-card address-section">
                        <div className="no-address-content">
                            <MapPin size={40} className="map-icon" />
                            <p className="no-address-title">No hay direcciones guardadas</p>
                            <p className="no-address-subtitle">Agregue una dirección para enviar su pedido</p>
                            <button type="button" className="add-address-btn">
                                Añadir dirección
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
