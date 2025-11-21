import '../../styles/ShippingPage.css';
import { useState } from 'react';

const ErrorMessage = ({ error }) => (
  error ? <span className="error-text">{error}</span> : null
);

function ShippingForm({ cartTotal = 0 }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryOptions: 'standard',
    deliveryTime: '',
    newsletter: false,
    additionalServices: {
      assembly: false,
      giftWrap: false,
      insurance: false
    },
    specialInstructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const servicePrices = {
    assembly: 105,
    giftWrap: 5,
    insurance: 15
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.firstName.trim()) errors.firstName = 'Prénom requis';
    if (!data.lastName.trim()) errors.lastName = 'Nom requis';
    if (!data.email.trim()) errors.email = 'Email requis';
    if (!data.address.trim()) errors.address = 'Adresse requise';
    if (!data.city.trim()) errors.city = 'Ville requise';
    if (!data.postalCode.trim()) errors.postalCode = 'Code postal requis';
    if (!data.deliveryTime) errors.deliveryTime = 'Créneau requis';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    setSuccess(true);
    setIsSubmitting(false);
  };

  // ✅ Calcul du total des services cochés
  const additionalServicesTotal = Object.entries(formData.additionalServices)
    .reduce((sum, [key, value]) => value ? sum + servicePrices[key] : sum, 0);

  const grandTotal = cartTotal + additionalServicesTotal;

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <h2>Formulaire de livraison</h2>

      <label>Prénom :<br />
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        <ErrorMessage error={errors.firstName} />
      </label><br />

      <label>Nom :<br />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        <ErrorMessage error={errors.lastName} />
      </label><br />

      <label>Email :<br />
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <ErrorMessage error={errors.email} />
      </label><br />

      <label>Téléphone (optionnel) :<br />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        <ErrorMessage error={errors.phone} />
      </label><br />

      <label>Adresse :<br />
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        <ErrorMessage error={errors.address} />
      </label><br />

      <label>Ville :<br />
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
        <ErrorMessage error={errors.city} />
      </label><br />

      <label>Code postal :<br />
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
        <ErrorMessage error={errors.postalCode} />
      </label><br />

      <fieldset>
        <legend>Options de livraison</legend>
        <select name="deliveryTime" value={formData.deliveryTime} onChange={handleChange}>
          <option value="">-- Choisir un créneau --</option>
          <option value="matin">Matin (8h-12h)</option>
          <option value="midi">Midi (10h-14h)</option>
          <option value="apres-midi">Après-midi (14h-18h)</option>
        </select>
        <ErrorMessage error={errors.deliveryTime} />
      </fieldset><br />

      <fieldset>
        <legend>Services additionnels</legend>
        <label>
          <input type="checkbox" name="additionalServices.assembly"
            checked={formData.additionalServices.assembly} onChange={handleChange} />
          Montage à domicile (+105,00€)
        </label><br />
        <label>
          <input type="checkbox" name="additionalServices.giftWrap"
            checked={formData.additionalServices.giftWrap} onChange={handleChange} />
          Emballage cadeau (+5,00€)
        </label><br />
        <label>
          <input type="checkbox" name="additionalServices.insurance"
            checked={formData.additionalServices.insurance} onChange={handleChange} />
          Assurance transport (+15,00€)
        </label>
      </fieldset><br />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi...' : 'Valider la livraison'}
      </button>

      {/* ✅ Résultat affiché directement sur la ShippingPage */}
      <div className="totals">
        <p>Total panier : {cartTotal} €</p>
        <p>Total services additionnels : {additionalServicesTotal} €</p>
        <p><strong>Total à payer : {grandTotal} €</strong></p>
      </div>

      {success && <p className="success-message">✅ Commande validée avec succès !</p>}
    </form>
  );
}

export default ShippingForm;
