'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
      maxDate.setFullYear(today.getFullYear() - 18);
      
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
    
    setSubmitStatus('idle');
    setErrorMessage('');

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
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Inscrivez-vous</CardTitle>
          <CardDescription>
            Commencez à recevoir des conseils personnalisés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="space-y-2">
              <Label htmlFor="childFirstName">Prénom de votre enfant</Label>
              <Input
                id="childFirstName"
                type="text"
                value={formData.childFirstName}
                onChange={(e) => setFormData({ ...formData, childFirstName: e.target.value })}
                placeholder="Alice"
                disabled={isSubmitting}
                className={errors.childFirstName ? 'border-red-500' : ''}
              />
              {errors.childFirstName && (
                <p className="text-sm text-red-600">{errors.childFirstName}</p>
              )}
            </div>

            {/* Email du parent */}
            <div className="space-y-2">
              <Label htmlFor="parentEmail">Votre email</Label>
              <Input
                id="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                placeholder="vous@exemple.com"
                disabled={isSubmitting}
                className={errors.parentEmail ? 'border-red-500' : ''}
              />
              {errors.parentEmail && (
                <p className="text-sm text-red-600">{errors.parentEmail}</p>
              )}
            </div>

            {/* Date de naissance */}
            <div className="space-y-2">
              <Label htmlFor="childBirthDate">Date de naissance de votre enfant</Label>
              <Input
                id="childBirthDate"
                type="date"
                value={formData.childBirthDate}
                onChange={(e) => setFormData({ ...formData, childBirthDate: e.target.value })}
                disabled={isSubmitting}
                max={new Date().toISOString().split('T')[0]}
                className={errors.childBirthDate ? 'border-red-500' : ''}
              />
              {errors.childBirthDate && (
                <p className="text-sm text-red-600">{errors.childBirthDate}</p>
              )}
            </div>

            {/* Genre */}
            <div className="space-y-3">
              <Label>Genre</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={formData.childGender === 'boy' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, childGender: 'boy' })}
                  disabled={isSubmitting}
                  className="h-12"
                >
                  👦 Garçon
                </Button>
                <Button
                  type="button"
                  variant={formData.childGender === 'girl' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, childGender: 'girl' })}
                  disabled={isSubmitting}
                  className="h-12"
                >
                  👧 Fille
                </Button>
              </div>
              {errors.childGender && (
                <p className="text-sm text-red-600">{errors.childGender}</p>
              )}
            </div>

            {/* Bouton d'envoi */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12"
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
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              En vous inscrivant, vous acceptez de recevoir nos emails éducatifs.
              Vous pourrez vous désinscrire à tout moment.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
