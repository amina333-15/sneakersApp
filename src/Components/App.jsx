import { useState } from 'react';
import Banner from '../Components/Banner';
import ShoppingList from '../Components/ShoppingList';
import Cart from '../Components/Cart';
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
    })
  };

  const removeFromCart = (idToRemove) => {
  console.log('🗑️ Suppression demandée pour ID :', idToRemove);
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === idToRemove
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0)
  );
};

const clearCart = () => {
  console.log('🧹 Panier vidé');
  setCart([]);
};


  return (
    <div className='App'>
      <Banner />
      <ShoppingList onAddToCart={addToCart}/>
      <Cart cartItems={cart} onRemoveFromCart={removeFromCart} onClearCart={clearCart} />
    </div>
  )
}

export default App;
