import ShoppingList from '../../Components/ShoppingList';

function HomePage({ cart,addToCart }){
    return (
        <div>
            <ShoppingList onAddToCart={addToCart} />
        </div>
    )
}

export default HomePage;