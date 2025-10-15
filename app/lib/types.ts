// Types pour l'application Childhood.ink

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  first_name: string;
  birth_date: string;
  gender: "boy" | "girl" | "other";
  created_at: string;
  updated_at: string;
}

export interface EmailTemplate {
  id: string;
  title: string;
  content: Record<string, unknown>; // JSONB content
  trigger_age_days: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SentEmail {
  id: string;
  child_id: string;
  template_id: string | null;
  recipient_email: string;
  subject: string;
  sent_at: string;
  opened_at: string | null;
  clicked_at: string | null;
  status: "sent" | "delivered" | "opened" | "clicked" | "failed";
  error_message: string | null;
}

