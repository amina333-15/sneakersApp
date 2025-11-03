import Cart from '../../Components/Cart';
import { Link } from 'react-router-dom';

function CartPage({ cart, removeFromCart, clearCart }){
    return (
        <div>
            <Cart
                cartItems={cart}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
            />

            {cart.length > 0 && (
                <div>
                    <Link to="/checkout">
                        <button>Passer la commande</button>
                    </Link>
                </div>
            )
            }
        </div>
    )
}

export default CartPage;