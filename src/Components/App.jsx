import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Banner from './Banner';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ShippingForm from './Pages/ShippingPage';

import '../styles/App.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (sneaker) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === sneaker.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === sneaker.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...sneaker, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (idToRemove) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === idToRemove
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

 const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
const cartTotal = cart.reduce((total, item) => total + (item.prix * item.quantity), 0);

  return (
    <BrowserRouter>
      <div className='App'>
        <Banner cartItemsCount={cartItemsCount} />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<HomePage cart={cart} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} cartItemsCount={cartItemsCount} cartTotal={cartTotal} />} />
            <Route path="/formulaire" element={<ShippingForm cartTotal={cartTotal} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
