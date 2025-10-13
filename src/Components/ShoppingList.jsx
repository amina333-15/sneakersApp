import { sneakersList } from "../datas/sneakersList"
import SneakerItem from "./SneakerItem";
import '../styles/ShoppingList.css';


function ShoppingList({onAddToCart}) {
    return (
        <div className="shopping-list">
            <h2>Nos Sneakers SALMI Amina</h2>
            <div className="sneakers-grid">
                {sneakersList.map((sneaker) => (
                    <SneakerItem

                        key={sneaker.id}
                        sneakerData={sneaker}
                        onAddToCart={onAddToCart}

                    //  bestSeller={sneaker.bestSeller}
                    //  key={sneaker.id}
                    //  nom={sneaker.nom}
                    //  marque={sneaker.marque}
                    //  prix={sneaker.prix}
                    //  style={sneaker.style}
                    //  esthetique={sneaker.esthetique}
                    //  confort={sneaker.confort}
                    //  image={sneaker.image}
                    />
                ))}
            </div>
        </div>
    );
}
export default ShoppingList;