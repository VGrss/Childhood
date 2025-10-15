-- Migration v0.5 - Email Trigger System & Templates
-- Système sophistiqué de déclenchement d'emails basé sur des règles

-- Table des templates d'emails (refactorisation de la table existante)
DROP TABLE IF EXISTS public.email_templates CASCADE;

CREATE TABLE IF NOT EXISTS public.email_templates (
  id TEXT PRIMARY KEY, -- e.g., "tpl_birthday", "tpl_summer"
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content JSONB NOT NULL, -- Rich text content (sections)
  variables JSONB DEFAULT '[]'::jsonb, -- Liste des variables disponibles ["child", "parent", "age"]
  preview_text TEXT, -- Text de prévisualisation pour l'email
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table des règles de déclenchement (triggers)
CREATE TABLE IF NOT EXISTS public.email_rules (
  id TEXT PRIMARY KEY, -- e.g., "birthday_reminder", "back_to_school_age3"
  name TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('relative', 'absolute', 'hybrid')) NOT NULL,
  
  -- Anchor (point de référence)
  anchor_kind TEXT CHECK (anchor_kind IN ('birthday', 'calendar', 'school_start')) NOT NULL,
  anchor_month INTEGER CHECK (anchor_month BETWEEN 1 AND 12), -- Pour calendar/school_start
  anchor_day TEXT, -- Jour du mois (1-31) ou "last"
  anchor_region TEXT, -- Pour school_start (e.g., "FR", "US")
  
  -- Offset (décalage par rapport à l'anchor)
  offset_days INTEGER DEFAULT 0,
  offset_weeks INTEGER DEFAULT 0,
  offset_months INTEGER DEFAULT 0,
  
  -- Age condition (filtre par âge)
  age_condition_op TEXT CHECK (age_condition_op IN ('==', '>=', '<=', 'between', 'none')),
  age_condition_value INTEGER, -- Pour ==, >=, <=
  age_condition_min INTEGER, -- Pour between
  age_condition_max INTEGER, -- Pour between
  
  -- Timing
  send_time_hour INTEGER DEFAULT 10 CHECK (send_time_hour BETWEEN 0 AND 23),
  send_time_minute INTEGER DEFAULT 0 CHECK (send_time_minute BETWEEN 0 AND 59),
  
  -- Configuration
  template_id TEXT REFERENCES public.email_templates(id) NOT NULL,
  frequency TEXT CHECK (frequency IN ('once', 'yearly', 'monthly')) DEFAULT 'yearly',
  priority INTEGER DEFAULT 5, -- 1 = highest, 10 = lowest
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table des emails planifiés (queue)
CREATE TABLE IF NOT EXISTS public.scheduled_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id TEXT REFERENCES public.email_rules(id) NOT NULL,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  parent_email TEXT NOT NULL,
  template_id TEXT REFERENCES public.email_templates(id) NOT NULL,
  
  -- Scheduling
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Idempotency
  idempotency_key TEXT UNIQUE NOT NULL, -- hash(rule_id + child_id + target_date)
  
  -- Status tracking
  status TEXT CHECK (status IN ('scheduled', 'sent', 'failed', 'cancelled')) DEFAULT 'scheduled',
  error_message TEXT,
  
  -- Computed variables for the email
  variables JSONB DEFAULT '{}'::jsonb, -- {"child_name": "Alice", "age": 2}
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_email_rules_active ON public.email_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_email_rules_type ON public.email_rules(type);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON public.email_templates(is_active);
CREATE INDEX IF NOT EXISTS idx_scheduled_emails_scheduled_for ON public.scheduled_emails(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_scheduled_emails_status ON public.scheduled_emails(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_emails_child_id ON public.scheduled_emails(child_id);

-- Enable Row Level Security
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_emails ENABLE ROW LEVEL SECURITY;

-- Policies pour email_templates (lecture publique)
CREATE POLICY "Anyone can view active templates"
  ON public.email_templates FOR SELECT
  USING (is_active = true);

-- Policies pour email_rules (lecture publique)
CREATE POLICY "Anyone can view active rules"
  ON public.email_rules FOR SELECT
  USING (is_active = true);

-- Policies pour scheduled_emails (parents peuvent voir leurs propres emails)
CREATE POLICY "Users can view their scheduled emails"
  ON public.scheduled_emails FOR SELECT
  USING (
    child_id IN (
      SELECT id FROM public.children WHERE parent_id = auth.uid()
    )
  );

-- Trigger pour updated_at
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

-- Commentaires pour documentation
COMMENT ON TABLE public.email_templates IS 'Templates d''emails avec contenu riche et variables';
COMMENT ON TABLE public.email_rules IS 'Règles de déclenchement d''emails basées sur des événements et conditions';
COMMENT ON TABLE public.scheduled_emails IS 'Queue d''emails planifiés avec idempotence';

COMMENT ON COLUMN public.email_rules.type IS 'Type de règle: relative (birthday+offset), absolute (fixed date), hybrid (calendar+age)';
COMMENT ON COLUMN public.email_rules.anchor_kind IS 'Point de référence: birthday (naissance), calendar (date fixe), school_start (rentrée)';
COMMENT ON COLUMN public.scheduled_emails.idempotency_key IS 'Clé unique pour éviter les doublons: hash(rule_id + child_id + date)';

