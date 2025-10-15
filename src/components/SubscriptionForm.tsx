'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  childFirstName: string;
  parentEmail: string;
  childBirthDate: string;
  childGender: 'boy' | 'girl' | '';
}

interface FormErrors {
  childFirstName?: string;
  parentEmail?: string;
  childBirthDate?: string;
  childGender?: string;
}

export default function SubscriptionForm() {
  const [formData, setFormData] = useState<FormData>({
    childFirstName: '',
    parentEmail: '',
    childBirthDate: '',
    childGender: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Validation côté client
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation du prénom de l'enfant
    if (!formData.childFirstName.trim()) {
      newErrors.childFirstName = 'Le prénom de votre enfant est requis';
    } else if (formData.childFirstName.trim().length < 2) {
      newErrors.childFirstName = 'Le prénom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Votre email est requis';
    } else if (!emailRegex.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Format d\'email invalide';
    }

    // Validation de la date de naissance
    if (!formData.childBirthDate) {
      newErrors.childBirthDate = 'La date de naissance est requise';
    } else {
      const birthDate = new Date(formData.childBirthDate);
      const today = new Date();
      const maxDate = new Date();
      maxDate.setFullYear(today.getFullYear() - 18); // Maximum 18 ans dans le passé
      
      if (birthDate > today) {
        newErrors.childBirthDate = 'La date de naissance ne peut pas être dans le futur';
      } else if (birthDate < maxDate) {
        newErrors.childBirthDate = 'Votre enfant doit avoir moins de 18 ans';
      }
    }

    // Validation du genre
    if (!formData.childGender) {
      newErrors.childGender = 'Veuillez sélectionner le genre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        childFirstName: '',
        parentEmail: '',
        childBirthDate: '',
        childGender: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Inscrivez-vous
          </h2>
          <p className="text-gray-600">
            Commencez à recevoir des conseils personnalisés
          </p>
        </div>

        {/* Message de succès */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">🎉 Inscription réussie !</p>
            <p className="text-sm mt-1">
              Vous recevrez bientôt votre premier email.
            </p>
          </div>
        )}

        {/* Message d'erreur */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">❌ Erreur</p>
            <p className="text-sm mt-1">{errorMessage}</p>
          </div>
        )}

        {/* Prénom de l'enfant */}
        <div>
          <label htmlFor="childFirstName" className="block text-sm font-semibold text-gray-700 mb-2">
            Prénom de votre enfant
          </label>
          <input
            type="text"
            id="childFirstName"
            value={formData.childFirstName}
            onChange={(e) => setFormData({ ...formData, childFirstName: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.childFirstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Alice"
            disabled={isSubmitting}
          />
          {errors.childFirstName && (
            <p className="text-red-600 text-sm mt-1">{errors.childFirstName}</p>
          )}
        </div>

        {/* Email du parent */}
        <div>
          <label htmlFor="parentEmail" className="block text-sm font-semibold text-gray-700 mb-2">
            Votre email
          </label>
          <input
            type="email"
            id="parentEmail"
            value={formData.parentEmail}
            onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.parentEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="vous@exemple.com"
            disabled={isSubmitting}
          />
          {errors.parentEmail && (
            <p className="text-red-600 text-sm mt-1">{errors.parentEmail}</p>
          )}
        </div>

        {/* Date de naissance */}
        <div>
          <label htmlFor="childBirthDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Date de naissance de votre enfant
          </label>
          <input
            type="date"
            id="childBirthDate"
            value={formData.childBirthDate}
            onChange={(e) => setFormData({ ...formData, childBirthDate: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.childBirthDate ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.childBirthDate && (
            <p className="text-red-600 text-sm mt-1">{errors.childBirthDate}</p>
          )}
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Genre
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, childGender: 'boy' })}
              disabled={isSubmitting}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                formData.childGender === 'boy'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              👦 Garçon
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, childGender: 'girl' })}
              disabled={isSubmitting}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                formData.childGender === 'girl'
                  ? 'border-pink-500 bg-pink-50 text-pink-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              👧 Fille
            </button>
          </div>
          {errors.childGender && (
            <p className="text-red-600 text-sm mt-1">{errors.childGender}</p>
          )}
        </div>

        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Inscription en cours...
            </span>
          ) : (
            "S'inscrire maintenant"
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          En vous inscrivant, vous acceptez de recevoir nos emails éducatifs.
          Vous pourrez vous désinscrire à tout moment.
        </p>
      </form>
    </div>
  );
}

