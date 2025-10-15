// Email Scheduler - Core logic pour calculer les dates d'envoi

import { EmailRule, Child, CandidateDate, AgeConditionOp } from './types';
import { addDays, addWeeks, addMonths, addYears, differenceInDays, parseISO, format, lastDayOfMonth, setMonth, setDate, setHours, setMinutes } from 'date-fns';

/**
 * Calcule l'âge d'un enfant à une date donnée
 */
export function calculateAge(birthDate: Date, atDate: Date): number {
  const daysDiff = differenceInDays(atDate, birthDate);
  return Math.floor(daysDiff / 365.25);
}

/**
 * Vérifie si la condition d'âge est respectée
 */
export function checkAgeCondition(
  rule: EmailRule,
  child: Child,
  targetDate: Date
): boolean {
  if (!rule.age_condition_op || rule.age_condition_op === 'none') {
    return true;
  }

  const birthDate = parseISO(child.birth_date);
  const age = calculateAge(birthDate, targetDate);

  switch (rule.age_condition_op) {
    case '==':
      return age === rule.age_condition_value!;
    case '>=':
      return age >= rule.age_condition_value!;
    case '<=':
      return age <= rule.age_condition_value!;
    case 'between':
      return age >= rule.age_condition_min! && age <= rule.age_condition_max!;
    default:
      return false;
  }
}

/**
 * Applique l'offset à une date
 */
export function applyOffset(baseDate: Date, rule: EmailRule): Date {
  let result = new Date(baseDate);
  
  if (rule.offset_days) {
    result = addDays(result, rule.offset_days);
  }
  if (rule.offset_weeks) {
    result = addWeeks(result, rule.offset_weeks);
  }
  if (rule.offset_months) {
    result = addMonths(result, rule.offset_months);
  }
  
  return result;
}

/**
 * Génère les dates candidates pour une règle relative (basée sur la date de naissance)
 */
function expandRelativeCandidates(
  rule: EmailRule,
  child: Child,
  horizonDate: Date,
  timezone: string
): Date[] {
  const candidates: Date[] = [];
  const birthDate = parseISO(child.birth_date);
  const now = new Date();
  
  // Générer les anniversaires jusqu'à l'horizon
  let year = now.getFullYear();
  const maxYear = horizonDate.getFullYear() + 1;
  
  while (year <= maxYear) {
    const birthdayThisYear = new Date(year, birthDate.getMonth(), birthDate.getDate());
    
    if (birthdayThisYear >= now && birthdayThisYear <= horizonDate) {
      candidates.push(birthdayThisYear);
    }
    
    year++;
    
    // Limite de sécurité
    if (year > now.getFullYear() + 20) break;
  }
  
  return candidates;
}

/**
 * Génère les dates candidates pour une règle absolue (date fixe dans l'année)
 */
function expandAbsoluteCandidates(
  rule: EmailRule,
  horizonDate: Date,
  timezone: string
): Date[] {
  const candidates: Date[] = [];
  const now = new Date();
  
  if (!rule.anchor_month) return candidates;
  
  const years = [now.getFullYear(), now.getFullYear() + 1];
  
  for (const year of years) {
    let candidateDate: Date;
    
    if (rule.anchor_day === 'last') {
      // Dernier jour du mois
      candidateDate = lastDayOfMonth(new Date(year, rule.anchor_month - 1, 1));
    } else {
      // Jour spécifique
      const day = parseInt(rule.anchor_day || '1', 10);
      candidateDate = new Date(year, rule.anchor_month - 1, day);
    }
    
    if (candidateDate >= now && candidateDate <= horizonDate) {
      candidates.push(candidateDate);
    }
  }
  
  return candidates;
}

/**
 * Génère les dates candidates pour une règle hybride
 * (combinaison de calendar + age condition)
 */
function expandHybridCandidates(
  rule: EmailRule,
  child: Child,
  horizonDate: Date,
  timezone: string
): Date[] {
  // Pour l'instant, utiliser la même logique que absolute
  // Dans le futur, intégrer un calendrier externe pour school_start
  return expandAbsoluteCandidates(rule, horizonDate, timezone);
}

/**
 * Génère toutes les dates candidates pour une règle donnée
 */
export function expandCandidates(
  rule: EmailRule,
  child: Child,
  horizonDate: Date,
  timezone: string = 'Europe/Paris'
): Date[] {
  switch (rule.type) {
    case 'relative':
      return expandRelativeCandidates(rule, child, horizonDate, timezone);
    case 'absolute':
      return expandAbsoluteCandidates(rule, horizonDate, timezone);
    case 'hybrid':
      return expandHybridCandidates(rule, child, horizonDate, timezone);
    default:
      return [];
  }
}

/**
 * Applique l'heure d'envoi à une date
 */
export function applyScheduleTime(date: Date, rule: EmailRule): Date {
  let result = new Date(date);
  result = setHours(result, rule.send_time_hour);
  result = setMinutes(result, rule.send_time_minute);
  return result;
}

/**
 * Convertit une date locale en UTC
 * Note: Pour simplifier, on utilise la date telle quelle
 * En production, utiliser date-fns-tz pour une conversion précise
 */
export function toUTC(localDate: Date, timezone: string): Date {
  return localDate;
}

/**
 * Génère une clé d'idempotence pour éviter les doublons
 */
export function generateIdempotencyKey(
  ruleId: string,
  childId: string,
  targetDate: Date
): string {
  const dateStr = format(targetDate, 'yyyy-MM-dd');
  return `${ruleId}-${childId}-${dateStr}`;
}

/**
 * Calcule toutes les dates d'envoi pour un enfant et une liste de règles
 */
export function calculateSchedule(
  child: Child,
  rules: EmailRule[],
  horizonMonths: number = 18
): CandidateDate[] {
  const timezone = child.timezone || 'Europe/Paris';
  const now = new Date();
  const horizon = addMonths(now, horizonMonths);
  
  const allCandidates: CandidateDate[] = [];
  
  for (const rule of rules) {
    if (!rule.is_active) continue;
    
    const candidates = expandCandidates(rule, child, horizon, timezone);
    
    for (const candidateDate of candidates) {
      // Vérifier la condition d'âge
      if (!checkAgeCondition(rule, child, candidateDate)) {
        continue;
      }
      
      // Appliquer l'offset
      const targetDate = applyOffset(candidateDate, rule);
      
      // Appliquer l'heure d'envoi
      const scheduledDate = applyScheduleTime(targetDate, rule);
      
      // Ignorer les dates passées
      if (scheduledDate < now) {
        continue;
      }
      
      allCandidates.push({
        date: scheduledDate,
        rule,
        child,
      });
    }
  }
  
  // Trier par date
  allCandidates.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return allCandidates;
}

