import { Link, useLocation } from 'react-router-dom';
import '../../styles/CheckoutPage.css';

function CheckoutPage({ cart, cartItemsCount, cartTotal }) {
  const location = useLocation();
  const grandTotal = location.state?.grandTotal ?? cartTotal;

  return (
    <div className="checkout-page">
      <div className="page-header">
        <h2>Finaliser votre commande</h2>
        <Link to="/cart" className="back-to-cart">
          Retour au panier
        </Link>
      </div>

      <div className="checkout-content">
        <h3>Récapitulatif de votre commande</h3>

        {/* ✅ Tableau des articles */}
        <table className="order-summary">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.nom}</td>
                <td>{item.quantity}</td>
                <td>{item.prix.toFixed(2)} €</td>
                <td>{(item.prix * item.quantity).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totaux */}
        <div className="totals">
          <p>Nombre d'articles : {cartItemsCount}</p>
          <p><strong>Total panier : {cartTotal.toFixed(2)} €</strong></p>
        </div>

        {/* Bouton vers livraison */}
        <Link to="/formulaire" className="go-to-shipping">
          Choisir le mode de livraison
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;
