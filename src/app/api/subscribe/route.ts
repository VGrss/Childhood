import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface SubscriptionRequest {
  childFirstName: string;
  parentEmail: string;
  childBirthDate: string;
  childGender: 'boy' | 'girl';
}

export async function POST(request: NextRequest) {
  try {
    // Parse le body de la requête
    const body: SubscriptionRequest = await request.json();

    // Validation des données
    const { childFirstName, parentEmail, childBirthDate, childGender } = body;

    if (!childFirstName || !parentEmail || !childBirthDate || !childGender) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentEmail)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation du genre
    if (!['boy', 'girl'].includes(childGender)) {
      return NextResponse.json(
        { error: 'Genre invalide' },
        { status: 400 }
      );
    }

    // Validation de la date de naissance
    const birthDate = new Date(childBirthDate);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: 'Date de naissance invalide' },
        { status: 400 }
      );
    }

    if (birthDate > today) {
      return NextResponse.json(
        { error: 'La date de naissance ne peut pas être dans le futur' },
        { status: 400 }
      );
    }

    // Vérifier que l'enfant a moins de 18 ans
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 18);
    if (birthDate < maxDate) {
      return NextResponse.json(
        { error: 'Votre enfant doit avoir moins de 18 ans' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const { data: existingSubscription } = await supabaseAdmin
      .from('subscriptions')
      .select('id')
      .eq('parent_email', parentEmail.toLowerCase())
      .single();

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit' },
        { status: 409 }
      );
    }

    // Insérer la nouvelle inscription
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .insert([
        {
          parent_email: parentEmail.toLowerCase(),
          child_first_name: childFirstName.trim(),
          child_birth_date: childBirthDate,
          child_gender: childGender,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'inscription. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    // Succès !
    return NextResponse.json(
      {
        success: true,
        message: 'Inscription réussie !',
        data: {
          id: data.id,
          subscribed_at: data.subscribed_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

// Méthode OPTIONS pour CORS (si nécessaire)
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

