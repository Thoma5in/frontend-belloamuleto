
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
