-- Seed Data v0.5 - Email Templates & Rules Examples

-- 🎯 Templates d'emails
INSERT INTO public.email_templates (id, name, subject, content, variables, preview_text, version, is_active) VALUES
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

-- 📅 Règles de déclenchement
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
  -7, 0, 0, -- 7 jours avant
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
  'calendar', 7, '1', -- 1er juillet
  0, 0, 0,
  'between', NULL, 2, 5, -- Entre 2 et 5 ans
  10, 0,
  'tpl_summer', 'yearly', 5, true
),

-- Règle 3 : Préparation rentrée (31 août, à partir de 3 ans)
(
  'back_to_school_prep',
  'Préparation rentrée',
  'Conseils de rentrée fin août',
  'absolute',
  'calendar', 8, 'last', -- Dernier jour d'août
  0, 0, 0,
  '>=', 3, NULL, NULL, -- 3 ans et plus
  10, 0,
  'tpl_back_to_school', 'yearly', 4, true
),

-- Règle 4 : Première rentrée (2 semaines avant, âge 3 ans précisément)
(
  'first_school_start',
  'Première rentrée scolaire',
  'Préparation première rentrée à 3 ans',
  'hybrid',
  'school_start', 9, '1', -- 1er septembre (approximatif)
  0, -2, 0, -- 2 semaines avant
  '==', 3, NULL, NULL, -- Exactement 3 ans
  10, 0,
  'tpl_school_start', 'once', 3, true
);

-- Commentaires
COMMENT ON TABLE public.email_templates IS 'Exemples : birthday reminder, summer activities, back to school';
COMMENT ON TABLE public.email_rules IS 'Règles de déclenchement avec conditions d''âge et offsets';

