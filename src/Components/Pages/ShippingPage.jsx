import '../styles/ShippingPage.css';
import { useState } from 'react';
import '../styles/App.css';

// Composant réutilisable pour l'affichage des erreurs
const ErrorMessage = ({ error }) => (
  error ? <span className="error-text">{error}</span> : null
);

function ShippingForm({ onShippingComplete }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '', // ✅ champ optionnel
    address: '',
    city: '',
    postalCode: '',
    deliveryOptions: 'standard',
    deliveryTime: '', // ✅ créneau obligatoire
    newsletter: false,
    additionalServices: { // ✅ services additionnels
      assembly: false,
      giftWrap: false,
      insurance: false
    },
    specialInstructions: '' // ✅ instructions conditionnelles
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handler universel pour champs simples et imbriqués
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.email = 'Format email invalide';
    }

    const postalRegex = /^[0-9]{5}$/;
    if (data.postalCode && !postalRegex.test(data.postalCode)) {
      errors.postalCode = 'Code postal invalide';
    }

    const phoneRegex = /^[0-9\s\-+()]{10,}$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
      errors.phone = 'Téléphone invalide (minimum 10 chiffres)';
    }

    if (data.specialInstructions.length > 200) {
      errors.specialInstructions = 'Maximum 200 caractères';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess(true);
      onShippingComplete?.(formData);

    } catch (error) {
      setErrors({ general: "Erreur lors de l'envoi" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h2>Commande confirmée !</h2>
        <p>Vos informations de livraison ont été enregistrées.</p>
      </div>
    );
  }

  return (
    <div className="shipping-form">
      <h2>Informations de livraison</h2>

      <form onSubmit={handleSubmit}>
        {/* Informations personnelles */}
        <fieldset>
          <legend>Informations personnelles</legend>

          <div className="form-group">
            <label htmlFor="firstName">Prénom *</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.firstName} />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Nom *</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.lastName} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.email} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Téléphone (optionnel)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.phone} />
          </div>
        </fieldset>

        {/* Adresse */}
        <fieldset>
          <legend>Adresse de livraison</legend>

          <div className="form-group">
            <label htmlFor="address">Adresse *</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.address} />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ville *</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.city} />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Code postal *</label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
              maxLength={5}
              disabled={isSubmitting}
            />
            <ErrorMessage error={errors.postalCode} />
          </div>
        </fieldset>

        {/* Options de livraison */}
        <fieldset>
          <legend>Options de livraison</legend>

          <div className="radio-group">
            <label>
              <input
                name="deliveryOptions"
                type="radio"
                value="standard"
                checked={formData.deliveryOptions === 'standard'}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              Livraison standard (3-5 jours) - Gratuit
            </label>

            <label>
              <input
                name="deliveryOptions"
                type="radio"
                value="express"
                checked={formData.deliveryOptions === 'express'}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              Livraison express (24h) - 9,99€
            </label>
          </div>

          <label>
            Créneau de livraison *
            <select
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">-- Choisir un créneau --</option>
              <option value="morning">Matin (8h-12h)</option>
              <option value="noon">Midi (10h-14h)</option>
              <option value="afternoon">Après-midi (14h-18h)</option>
            </select>
          </label>
          <ErrorMessage error={errors.deliveryTime} />
        </fieldset>

        {/* Services additionnels */}
        <fieldset>
          <legend>Services additionnels</legend>
          <label>
            <input
              type="checkbox"
              name="additionalServices.assembly"
              checked={formData.additionalServices.assembly}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Montage à domicile (+105,00€)
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalServices.giftWrap"
              checked={formData.additionalServices.giftWrap}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            Emballage cadeau (+5,00€)
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalServices.insurance"
              checked={formData.additionalServices.insurance}
              onChange={handleChange}
          />
          Assurance transport (+15,00€)
        </label>
      </fieldset>

      {/* Instructions spéciales conditionnelles */}
      {formData.deliveryOptions === 'express' && (
        <div className="form-group">
          <label htmlFor="specialInstructions">Instructions spéciales</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder="Code d'accès, étage, etc."
            maxLength={200}
            disabled={isSubmitting}
          />
          <ErrorMessage error={errors.specialInstructions} />
        </div>
      )}

      {/* Préférences */}
      <fieldset>
        <legend>Préférences</legend>
        <div className="form-group">
          <label htmlFor="newsletter">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              checked={formData.newsletter}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            S'abonner à notre newsletter
          </label>
        </div>
      </fieldset>

      {/* Erreur générale */}
      {errors.general && (
        <div className="error-banner">
          <ErrorMessage error={errors.general} />
        </div>
      )}

      {/* Bouton de soumission */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Traitement...' : 'Confirmer la commande'}
      </button>
    </form>
  </div>
);
}

export default ShippingForm;
