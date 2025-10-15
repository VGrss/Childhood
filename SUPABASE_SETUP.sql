-- ==========================================
-- CHILDHOOD.INK - SETUP COMPLET SUPABASE
-- Version 0.5 - Email Trigger System
-- ==========================================
-- 
-- ⚠️ PRÉREQUIS : La table "subscriptions" doit déjà exister
-- 
-- Instructions :
-- 1. Ouvrir Supabase Dashboard : https://supabase.com/dashboard
-- 2. Sélectionner votre projet
-- 3. Aller dans "SQL Editor" → "New Query"
-- 4. Copier-coller ce script complet
-- 5. Cliquer sur "Run" pour exécuter
--
-- Ce script créera :
-- - 3 nouvelles tables (email_templates, email_rules, scheduled_emails)
-- - Les policies RLS pour la sécurité
-- - Les triggers automatiques
-- - 4 templates d'emails exemples
-- - 4 règles de déclenchement
--
-- Note : Ce script est compatible avec le schéma v0.3 (table subscriptions)
-- ==========================================

-- ==========================================
-- PARTIE 1 : SUPPRESSION (si tables existent déjà)
-- ==========================================

DROP TABLE IF EXISTS public.scheduled_emails CASCADE;
DROP TABLE IF EXISTS public.email_rules CASCADE;
DROP TABLE IF EXISTS public.email_templates CASCADE;

-- ==========================================
-- PARTIE 2 : CRÉATION DES TABLES
-- ==========================================

-- Table des templates d'emails
CREATE TABLE public.email_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content JSONB NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  preview_text TEXT,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table des règles de déclenchement
CREATE TABLE public.email_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('relative', 'absolute', 'hybrid')) NOT NULL,
  
  -- Anchor (point de référence)
  anchor_kind TEXT CHECK (anchor_kind IN ('birthday', 'calendar', 'school_start')) NOT NULL,
  anchor_month INTEGER CHECK (anchor_month BETWEEN 1 AND 12),
  anchor_day TEXT,
  anchor_region TEXT,
  
  -- Offset (décalage)
  offset_days INTEGER DEFAULT 0,
  offset_weeks INTEGER DEFAULT 0,
  offset_months INTEGER DEFAULT 0,
  
  -- Age condition
  age_condition_op TEXT CHECK (age_condition_op IN ('==', '>=', '<=', 'between', 'none')),
  age_condition_value INTEGER,
  age_condition_min INTEGER,
  age_condition_max INTEGER,
  
  -- Timing
  send_time_hour INTEGER DEFAULT 10 CHECK (send_time_hour BETWEEN 0 AND 23),
  send_time_minute INTEGER DEFAULT 0 CHECK (send_time_minute BETWEEN 0 AND 59),
  
  -- Configuration
  template_id TEXT REFERENCES public.email_templates(id) NOT NULL,
  frequency TEXT CHECK (frequency IN ('once', 'yearly', 'monthly')) DEFAULT 'yearly',
  priority INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table des emails planifiés (queue)
CREATE TABLE public.scheduled_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id TEXT REFERENCES public.email_rules(id) NOT NULL,
  child_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE NOT NULL,
  parent_email TEXT NOT NULL,
  template_id TEXT REFERENCES public.email_templates(id) NOT NULL,
  
  -- Scheduling
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Idempotency
  idempotency_key TEXT UNIQUE NOT NULL,
  
  -- Status
  status TEXT CHECK (status IN ('scheduled', 'sent', 'failed', 'cancelled')) DEFAULT 'scheduled',
  error_message TEXT,
  
  -- Variables
  variables JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- PARTIE 3 : INDEX POUR PERFORMANCES
-- ==========================================

CREATE INDEX idx_email_rules_active ON public.email_rules(is_active);
CREATE INDEX idx_email_rules_type ON public.email_rules(type);
CREATE INDEX idx_email_templates_active ON public.email_templates(is_active);
CREATE INDEX idx_scheduled_emails_scheduled_for ON public.scheduled_emails(scheduled_for);
CREATE INDEX idx_scheduled_emails_status ON public.scheduled_emails(status);
CREATE INDEX idx_scheduled_emails_child_id ON public.scheduled_emails(child_id);

-- ==========================================
-- PARTIE 4 : ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_emails ENABLE ROW LEVEL SECURITY;

-- Templates : lecture publique
CREATE POLICY "Anyone can view active templates"
  ON public.email_templates FOR SELECT
  USING (is_active = true);

-- Rules : lecture publique
CREATE POLICY "Anyone can view active rules"
  ON public.email_rules FOR SELECT
  USING (is_active = true);

-- Scheduled emails : publiquement accessible en lecture (pour l'instant)
-- En v2.0 avec auth, on filtrera par auth.uid()
CREATE POLICY "Anyone can view scheduled emails"
  ON public.scheduled_emails FOR SELECT
  USING (true);

-- ==========================================
-- PARTIE 5 : TRIGGERS AUTOMATIQUES
-- ==========================================

CREATE TRIGGER set_updated_at_email_templates
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_email_rules
  BEFORE UPDATE ON public.email_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_scheduled_emails
  BEFORE UPDATE ON public.scheduled_emails
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================
-- PARTIE 6 : SEED DATA - TEMPLATES D'EMAILS
-- ==========================================

INSERT INTO public.email_templates (id, name, subject, content, variables, preview_text, version, is_active) VALUES

-- Template 1 : Rappel d'anniversaire
(
  'tpl_birthday',
  'Rappel d''anniversaire',
  '🎉 L''anniversaire de {child_name} approche !',
  '{
    "sections": [
      {
        "type": "intro",
        "body": "Bonjour {parent_name},\\n\\nDans 7 jours, {child_name} fêtera son anniversaire ! C''est l''occasion parfaite pour célébrer cette étape importante."
      },
      {
        "type": "activities",
        "title": "Idées d''activités",
        "body": "- Organiser une petite fête avec les amis\\n- Préparer un gâteau ensemble\\n- Créer un album photo de l''année écoulée\\n- Planter un arbre ''anniversaire''"
      },
      {
        "type": "conclusion",
        "body": "Profitez de ce moment spécial !\\n\\nL''équipe Childhood.ink"
      }
    ]
  }'::jsonb,
  '["child_name", "parent_name", "age"]'::jsonb,
  'L''anniversaire de votre enfant approche dans une semaine',
  1,
  true
),

-- Template 2 : Activités d'été
(
  'tpl_summer',
  'Activités d''été',
  '☀️ Activités estivales pour {child_name}',
  '{
    "sections": [
      {
        "type": "intro",
        "body": "Bonjour,\\n\\nL''été est là ! Voici des idées d''activités adaptées à l''âge de {child_name} ({age} ans)."
      },
      {
        "type": "activities",
        "title": "Activités recommandées",
        "body": "- Jeux d''eau dans le jardin\\n- Peinture en extérieur\\n- Chasse au trésor nature\\n- Ateliers créatifs d''été\\n- Initiation au jardinage"
      },
      {
        "type": "health",
        "title": "Conseils santé",
        "body": "N''oubliez pas :\\n- Protection solaire adaptée\\n- Hydratation régulière\\n- Éviter les heures les plus chaudes\\n- Chapeau et lunettes de soleil"
      }
    ]
  }'::jsonb,
  '["child_name", "parent_name", "age"]'::jsonb,
  'Découvrez les meilleures activités estivales pour votre enfant',
  1,
  true
),

-- Template 3 : Préparation rentrée
(
  'tpl_back_to_school',
  'Préparation rentrée scolaire',
  '🎒 Préparez la rentrée de {child_name}',
  '{
    "sections": [
      {
        "type": "intro",
        "body": "Bonjour,\\n\\nLa rentrée approche ! Voici quelques conseils pour préparer {child_name} sereinement."
      },
      {
        "type": "admin",
        "title": "Démarches administratives",
        "body": "✓ Vérifier les inscriptions\\n✓ Préparer les documents requis\\n✓ Commander les fournitures scolaires\\n✓ Programmer la visite médicale"
      },
      {
        "type": "activities",
        "title": "Préparation psychologique",
        "body": "- Parler positivement de l''école\\n- Lire des histoires sur la rentrée\\n- Visiter l''école si possible\\n- Reprendre progressivement le rythme"
      },
      {
        "type": "financial",
        "title": "Budget rentrée",
        "body": "Pensez aux aides disponibles :\\n- Allocation de rentrée scolaire (ARS)\\n- Bourse départementale\\n- Aides municipales"
      }
    ]
  }'::jsonb,
  '["child_name", "parent_name", "age"]'::jsonb,
  'Tous nos conseils pour une rentrée réussie',
  1,
  true
),

-- Template 4 : Première rentrée
(
  'tpl_school_start',
  'Première rentrée scolaire',
  '🏫 La grande rentrée de {child_name}',
  '{
    "sections": [
      {
        "type": "intro",
        "body": "Bonjour {parent_name},\\n\\nLa première rentrée scolaire de {child_name} approche ! C''est une étape majeure."
      },
      {
        "type": "admin",
        "title": "Liste de contrôle",
        "body": "□ Inscription validée\\n□ Visite médicale effectuée\\n□ Assurance scolaire\\n□ Fournitures préparées\\n□ Vêtements marqués\\n□ Contact avec l''enseignant"
      },
      {
        "type": "health",
        "title": "Bien-être de l''enfant",
        "body": "- Adapter progressivement le rythme de sommeil\\n- Rassurer sur cette nouvelle aventure\\n- Créer des rituels positifs\\n- Prévoir un doudou si nécessaire"
      }
    ]
  }'::jsonb,
  '["child_name", "parent_name", "age"]'::jsonb,
  'Préparez la première rentrée scolaire en toute sérénité',
  1,
  true
);

-- ==========================================
-- PARTIE 7 : SEED DATA - RÈGLES DE DÉCLENCHEMENT
-- ==========================================

INSERT INTO public.email_rules (
  id, name, description, type,
  anchor_kind, anchor_month, anchor_day,
  offset_days, offset_weeks, offset_months,
  age_condition_op, age_condition_value, age_condition_min, age_condition_max,
  send_time_hour, send_time_minute,
  template_id, frequency, priority, is_active
) VALUES

-- Règle 1 : Rappel d'anniversaire (7 jours avant)
(
  'birthday_reminder',
  'Rappel d''anniversaire',
  '7 jours avant chaque anniversaire',
  'relative',
  'birthday', NULL, NULL,
  -7, 0, 0,
  'none', NULL, NULL, NULL,
  10, 0,
  'tpl_birthday', 'yearly', 5, true
),

-- Règle 2 : Activités d'été (1er juillet, 2-5 ans)
(
  'summer_activities',
  'Activités estivales',
  'Activités d''été pour les 2-5 ans',
  'absolute',
  'calendar', 7, '1',
  0, 0, 0,
  'between', NULL, 2, 5,
  10, 0,
  'tpl_summer', 'yearly', 5, true
),

-- Règle 3 : Préparation rentrée (31 août, 3+ ans)
(
  'back_to_school_prep',
  'Préparation rentrée',
  'Conseils de rentrée fin août',
  'absolute',
  'calendar', 8, 'last',
  0, 0, 0,
  '>=', 3, NULL, NULL,
  10, 0,
  'tpl_back_to_school', 'yearly', 4, true
),

-- Règle 4 : Première rentrée (2 semaines avant, âge 3 ans)
(
  'first_school_start',
  'Première rentrée scolaire',
  'Préparation première rentrée à 3 ans',
  'hybrid',
  'school_start', 9, '1',
  0, -2, 0,
  '==', 3, NULL, NULL,
  10, 0,
  'tpl_school_start', 'once', 3, true
);

-- ==========================================
-- PARTIE 8 : COMMENTAIRES DE DOCUMENTATION
-- ==========================================

COMMENT ON TABLE public.email_templates IS 'Templates d''emails avec contenu riche et variables dynamiques';
COMMENT ON TABLE public.email_rules IS 'Règles de déclenchement d''emails basées sur des événements et conditions d''âge';
COMMENT ON TABLE public.scheduled_emails IS 'Queue d''emails planifiés avec système d''idempotence';

COMMENT ON COLUMN public.email_rules.type IS 'Type de règle: relative (birthday+offset), absolute (fixed date), hybrid (calendar+age)';
COMMENT ON COLUMN public.email_rules.anchor_kind IS 'Point de référence: birthday (naissance), calendar (date fixe), school_start (rentrée)';
COMMENT ON COLUMN public.scheduled_emails.idempotency_key IS 'Clé unique pour éviter les doublons: hash(rule_id + child_id + date)';

-- ==========================================
-- FIN DU SCRIPT
-- ==========================================
-- 
-- ✅ Si tout s'est bien passé, vous devriez voir :
-- - 3 nouvelles tables créées (email_templates, email_rules, scheduled_emails)
-- - 4 templates d'emails insérés
-- - 4 règles de déclenchement insérées
-- 
-- Pour vérifier :
-- SELECT * FROM email_templates;
-- SELECT * FROM email_rules;
-- SELECT COUNT(*) FROM email_templates; -- Doit retourner 4
-- SELECT COUNT(*) FROM email_rules; -- Doit retourner 4
--
-- Pour tester avec une inscription existante :
-- SELECT * FROM subscriptions LIMIT 1; -- Copier l'ID
-- Puis tester l'API : POST /api/schedule/preview avec la birth_date
-- 
-- ==========================================

