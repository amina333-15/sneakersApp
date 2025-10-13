import { useState } from 'react';
import CustomerReview from './CustomerReview';
import '../styles/SneakerItem.css';

function SneakerItem({ sneakerData, onAddToCart }) {
    const [showReviews, setShowReviews] = useState(false);

    const { nom, marque, prix, style, esthetique, confort, image, bestSeller = false } = sneakerData;

    const handelAddToCart = () => {
        console.log('🧺 Données transmises : ', sneakerData);
        onAddToCart(sneakerData);
    };

    const handelToggleAvis = () => {
        setShowReviews(!showReviews);
    };

    return (
        <div className={`sneaker-item ${bestSeller ? 'best-seller' : ''}`}>
            {bestSeller && <span className="best-seller-badge">Top vente</span>}

            <div className="sneaker-image">
                <img src={image} alt={nom} className="sneaker-image" />
            </div>

            <h3>{nom}</h3>
            <p className="sneaker-brand">{marque}</p>
            <p className="sneaker-brand">{prix} €</p>
            <p className="sneaker-brand">{style}</p>

            <div className="sneaker-review">
                <button onClick={handelToggleAvis}>
                    {showReviews ? 'Masquer les avis' : 'Voir les avis'}
                </button>

                {showReviews && (
                    <div className="avis-details">
                        <CustomerReview reviewType="esthétisme" scaleValue={esthetique} />
                        <CustomerReview reviewType="confort" scaleValue={confort} />
                    </div>
                )}

                <div className="sneaker-actions">
                    <button onClick={handelAddToCart} className="add-to-cart-btn">
                        🧺 Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SneakerItem;
