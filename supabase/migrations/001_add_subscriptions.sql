-- Migration v0.3 - Table des inscriptions simples (sans authentification)
-- Cette table sera utilisée pour collecter les inscriptions avant l'implémentation de l'auth en v2.0

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_email TEXT UNIQUE NOT NULL,
  child_first_name TEXT NOT NULL,
  child_birth_date DATE NOT NULL,
  child_gender TEXT CHECK (child_gender IN ('boy', 'girl')) NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON public.subscriptions(parent_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_birth_date ON public.subscriptions(child_birth_date);
CREATE INDEX IF NOT EXISTS idx_subscriptions_subscribed_at ON public.subscriptions(subscribed_at);

-- Autoriser l'insertion publique (pas de RLS pour simplifier v0.3)
-- En production, nous ajouterons des rate limits et des vérifications anti-spam
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy pour permettre l'insertion publique
CREATE POLICY "Anyone can subscribe"
  ON public.subscriptions FOR INSERT
  WITH CHECK (true);

-- Policy pour empêcher la lecture publique (sécurité des données)
CREATE POLICY "Only service role can read subscriptions"
  ON public.subscriptions FOR SELECT
  USING (false);

-- Commentaires pour documentation
COMMENT ON TABLE public.subscriptions IS 'Table des inscriptions simples (v0.3) avant authentification complète';
COMMENT ON COLUMN public.subscriptions.parent_email IS 'Email du parent (utilisé pour les envois)';
COMMENT ON COLUMN public.subscriptions.child_first_name IS 'Prénom de l''enfant';
COMMENT ON COLUMN public.subscriptions.child_birth_date IS 'Date de naissance de l''enfant pour calculer l''âge';
COMMENT ON COLUMN public.subscriptions.child_gender IS 'Genre de l''enfant (boy/girl)';

