import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { calculateSchedule } from '@/lib/email-system/scheduler';
import { EmailRule, Child } from '@/lib/email-system/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * API Preview - Prévisualise le calendrier d'envoi pour un enfant
 * GET /api/schedule/preview?child_id=xxx&months=18
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const childId = searchParams.get('child_id');
    const monthsStr = searchParams.get('months') || '18';
    const horizonMonths = parseInt(monthsStr, 10);

    if (!childId) {
      return NextResponse.json(
        { error: 'child_id is required' },
        { status: 400 }
      );
    }

    // Récupérer l'enfant depuis la table subscriptions
    // (En v0.3, nous utilisons subscriptions. En v2.0, ce sera children)
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('id', childId)
      .single();

    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'Child not found' },
        { status: 404 }
      );
    }

    // Convertir subscription en Child
    const child: Child = {
      id: subscription.id,
      first_name: subscription.child_first_name,
      birth_date: subscription.child_birth_date,
      gender: subscription.child_gender,
      timezone: 'Europe/Paris',
    };

    // Récupérer toutes les règles actives
    const { data: rules, error: rulesError } = await supabaseAdmin
      .from('email_rules')
      .select('*')
      .eq('is_active', true);

    if (rulesError) {
      console.error('Error fetching rules:', rulesError);
      return NextResponse.json(
        { error: 'Failed to fetch rules' },
        { status: 500 }
      );
    }

    // Convertir les règles au bon format
    const typedRules: EmailRule[] = (rules || []).map((rule: any) => ({
      id: rule.id,
      name: rule.name,
      description: rule.description,
      type: rule.type,
      anchor_kind: rule.anchor_kind,
      anchor_month: rule.anchor_month,
      anchor_day: rule.anchor_day,
      anchor_region: rule.anchor_region,
      offset_days: rule.offset_days || 0,
      offset_weeks: rule.offset_weeks || 0,
      offset_months: rule.offset_months || 0,
      age_condition_op: rule.age_condition_op,
      age_condition_value: rule.age_condition_value,
      age_condition_min: rule.age_condition_min,
      age_condition_max: rule.age_condition_max,
      send_time_hour: rule.send_time_hour,
      send_time_minute: rule.send_time_minute,
      template_id: rule.template_id,
      frequency: rule.frequency,
      priority: rule.priority,
      is_active: rule.is_active,
      created_at: rule.created_at,
      updated_at: rule.updated_at,
    }));

    // Calculer le calendrier
    const schedule = calculateSchedule(child, typedRules, horizonMonths);

    // Formater pour la réponse
    const formattedSchedule = schedule.map((candidate) => ({
      date: format(candidate.date, 'yyyy-MM-dd HH:mm', { locale: fr }),
      date_human: format(candidate.date, "EEEE d MMMM yyyy 'à' HH'h'mm", { locale: fr }),
      rule_id: candidate.rule.id,
      rule_name: candidate.rule.name,
      template_id: candidate.rule.template_id,
      child_age: Math.floor((candidate.date.getTime() - new Date(child.birth_date).getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
    }));

    return NextResponse.json({
      success: true,
      child: {
        id: child.id,
        first_name: child.first_name,
        birth_date: child.birth_date,
      },
      horizon_months: horizonMonths,
      total_emails: formattedSchedule.length,
      schedule: formattedSchedule,
    });
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * API Preview - Prévisualise pour un enfant fictif (sans ID)
 * POST /api/schedule/preview
 * Body: { birth_date: "2022-02-25", first_name: "Alice" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birth_date, first_name, months } = body;

    if (!birth_date) {
      return NextResponse.json(
        { error: 'birth_date is required' },
        { status: 400 }
      );
    }

    const horizonMonths = months || 18;

    // Créer un enfant fictif
    const child: Child = {
      id: 'preview',
      first_name: first_name || 'Enfant',
      birth_date,
      gender: 'boy',
      timezone: 'Europe/Paris',
    };

    // Récupérer toutes les règles actives
    const { data: rules, error: rulesError } = await supabaseAdmin
      .from('email_rules')
      .select('*')
      .eq('is_active', true);

    if (rulesError) {
      console.error('Error fetching rules:', rulesError);
      return NextResponse.json(
        { error: 'Failed to fetch rules' },
        { status: 500 }
      );
    }

    const typedRules: EmailRule[] = (rules || []).map((rule: any) => ({
      id: rule.id,
      name: rule.name,
      description: rule.description,
      type: rule.type,
      anchor_kind: rule.anchor_kind,
      anchor_month: rule.anchor_month,
      anchor_day: rule.anchor_day,
      anchor_region: rule.anchor_region,
      offset_days: rule.offset_days || 0,
      offset_weeks: rule.offset_weeks || 0,
      offset_months: rule.offset_months || 0,
      age_condition_op: rule.age_condition_op,
      age_condition_value: rule.age_condition_value,
      age_condition_min: rule.age_condition_min,
      age_condition_max: rule.age_condition_max,
      send_time_hour: rule.send_time_hour,
      send_time_minute: rule.send_time_minute,
      template_id: rule.template_id,
      frequency: rule.frequency,
      priority: rule.priority,
      is_active: rule.is_active,
      created_at: rule.created_at,
      updated_at: rule.updated_at,
    }));

    // Calculer le calendrier
    const schedule = calculateSchedule(child, typedRules, horizonMonths);

    // Formater pour la réponse
    const formattedSchedule = schedule.map((candidate) => ({
      date: format(candidate.date, 'yyyy-MM-dd HH:mm', { locale: fr }),
      date_human: format(candidate.date, "EEEE d MMMM yyyy 'à' HH'h'mm", { locale: fr }),
      rule_id: candidate.rule.id,
      rule_name: candidate.rule.name,
      rule_description: candidate.rule.description,
      template_id: candidate.rule.template_id,
      child_age: Math.floor((candidate.date.getTime() - new Date(child.birth_date).getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
    }));

    return NextResponse.json({
      success: true,
      child: {
        first_name: child.first_name,
        birth_date: child.birth_date,
      },
      horizon_months: horizonMonths,
      total_emails: formattedSchedule.length,
      schedule: formattedSchedule,
    });
  } catch (error) {
    console.error('Preview POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

