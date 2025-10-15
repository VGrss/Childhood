// Types pour le système de triggers d'emails

export type RuleType = 'relative' | 'absolute' | 'hybrid';
export type AnchorKind = 'birthday' | 'calendar' | 'school_start';
export type AgeConditionOp = '==' | '>=' | '<=' | 'between' | 'none';
export type Frequency = 'once' | 'yearly' | 'monthly';
export type EmailStatus = 'scheduled' | 'sent' | 'failed' | 'cancelled';

export interface EmailTemplate {
  id: string; // e.g., "tpl_birthday"
  name: string;
  subject: string;
  content: {
    sections: Array<{
      title?: string;
      body: string;
      type: 'intro' | 'activities' | 'admin' | 'health' | 'financial' | 'conclusion';
    }>;
  };
  variables: string[]; // ["child_name", "parent_name", "age"]
  preview_text?: string;
  version: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailRule {
  id: string; // e.g., "birthday_reminder"
  name: string;
  description?: string;
  type: RuleType;
  
  // Anchor (point de référence)
  anchor_kind: AnchorKind;
  anchor_month?: number; // 1-12 for calendar/school_start
  anchor_day?: string; // "1"-"31" or "last"
  anchor_region?: string; // "FR", "US" for school_start
  
  // Offset (décalage)
  offset_days?: number;
  offset_weeks?: number;
  offset_months?: number;
  
  // Age condition
  age_condition_op?: AgeConditionOp;
  age_condition_value?: number; // For ==, >=, <=
  age_condition_min?: number; // For between
  age_condition_max?: number; // For between
  
  // Timing
  send_time_hour: number; // 0-23
  send_time_minute: number; // 0-59
  
  // Configuration
  template_id: string;
  frequency: Frequency;
  priority: number; // 1 = highest, 10 = lowest
  is_active: boolean;
  
  created_at: string;
  updated_at: string;
}

export interface ScheduledEmail {
  id: string;
  rule_id: string;
  child_id: string;
  parent_email: string;
  template_id: string;
  scheduled_for: string; // ISO timestamp
  sent_at?: string;
  idempotency_key: string;
  status: EmailStatus;
  error_message?: string;
  variables: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  first_name: string;
  birth_date: string; // YYYY-MM-DD
  gender: 'boy' | 'girl';
  timezone?: string; // Default: "Europe/Paris"
}

export interface Parent {
  id: string;
  email: string;
  first_name?: string;
  timezone?: string;
}

// Helper types pour la logique de scheduling
export interface CandidateDate {
  date: Date; // Date locale
  rule: EmailRule;
  child: Child;
}

export interface SchedulingResult {
  scheduled: ScheduledEmail[];
  skipped: Array<{
    reason: string;
    rule_id: string;
    child_id: string;
    date: Date;
  }>;
}

export interface EmailVariables {
  child_name: string;
  child_age: number;
  parent_name?: string;
  parent_email: string;
  send_date: string;
  [key: string]: any;
}

