import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/templates
 * Récupère tous les templates avec leurs règles associées
 * Triés par ordre chronologique basé sur les triggers
 */
export async function GET(request: NextRequest) {
  try {
    // Récupérer tous les templates
    const { data: templates, error: templatesError } = await supabaseAdmin
      .from('email_templates')
      .select('*')
      .order('id', { ascending: true });

    if (templatesError) {
      console.error('Error fetching templates:', templatesError);
      return NextResponse.json(
        { error: 'Failed to fetch templates' },
        { status: 500 }
      );
    }

    // Récupérer toutes les règles
    const { data: rules, error: rulesError } = await supabaseAdmin
      .from('email_rules')
      .select('*');

    if (rulesError) {
      console.error('Error fetching rules:', rulesError);
      return NextResponse.json(
        { error: 'Failed to fetch rules' },
        { status: 500 }
      );
    }

    // Associer chaque template avec ses règles
    const templatesWithRules = (templates || []).map((template) => {
      const associatedRules = (rules || []).filter(
        (rule) => rule.template_id === template.id
      );

      // Calculer l'ordre temporel pour le tri
      let temporalOrder = 9999;
      if (associatedRules.length > 0) {
        const primaryRule = associatedRules[0];
        temporalOrder = calculateTemporalOrder(primaryRule);
      }

      return {
        ...template,
        rules: associatedRules,
        temporal_order: temporalOrder,
      };
    });

    // Trier par ordre chronologique
    templatesWithRules.sort((a, b) => a.temporal_order - b.temporal_order);

    return NextResponse.json({
      success: true,
      templates: templatesWithRules,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Calcule un ordre temporel pour trier les emails chronologiquement
 * Basé sur le trigger de la règle
 */
function calculateTemporalOrder(rule: any): number {
  // Relative (birthday-based) → ordre 0 + offset
  if (rule.type === 'relative') {
    return 0 + (rule.offset_days || 0);
  }

  // Absolute/Hybrid → jour de l'année
  if (rule.anchor_month) {
    const dayOfYear = getDayOfYear(rule.anchor_month, rule.anchor_day);
    return dayOfYear + (rule.offset_days || 0);
  }

  return 9999;
}

/**
 * Calcule le jour de l'année (1-365)
 */
function getDayOfYear(month: number, day: string): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  let dayOfYear = 0;
  for (let i = 0; i < month - 1; i++) {
    dayOfYear += daysInMonth[i];
  }
  
  if (day === 'last') {
    dayOfYear += daysInMonth[month - 1];
  } else {
    dayOfYear += parseInt(day, 10);
  }
  
  return dayOfYear;
}

