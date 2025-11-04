import Cart from '../../Components/Cart';
import { Link } from 'react-router-dom';
import '../../styles/CartPage.css';

function CartPage({ cart, removeFromCart, clearCart }) {
    return (
        <div>
            <Cart
                cartItems={cart}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
            />

            {cart.length > 0 && (
                <div className='cart'>
                <div className="checkout-button-container">
                    <Link to="/checkout">
                        <button>Passer la commande</button>
                    </Link>
                </div>
                </div>
            )
            }
        </div>
    )
}

export default CartPage;