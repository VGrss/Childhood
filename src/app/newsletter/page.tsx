'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TemplateWithRules {
  id: string;
  name: string;
  subject: string;
  content: any;
  preview_text?: string;
  is_active: boolean;
  version: number;
  rules: any[];
  temporal_order: number;
}

export default function NewsletterPage() {
  const [templates, setTemplates] = useState<TemplateWithRules[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTrigger = (rules: any[]): string => {
    if (!rules || rules.length === 0) return 'Aucun trigger';
    
    const rule = rules[0];
    
    // Relative (birthday)
    if (rule.type === 'relative') {
      const days = Math.abs(rule.offset_days || 0);
      const before = (rule.offset_days || 0) < 0;
      return `${days} jour${days > 1 ? 's' : ''} ${before ? 'avant' : 'après'} l'anniversaire`;
    }
    
    // Absolute (calendar)
    if (rule.type === 'absolute' || rule.type === 'hybrid') {
      const months = ['', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
      const monthName = months[rule.anchor_month];
      const day = rule.anchor_day === 'last' ? 'dernier jour' : rule.anchor_day;
      
      let trigger = `${day} ${monthName}`;
      
      // Ajouter condition d'âge
      if (rule.age_condition_op && rule.age_condition_op !== 'none') {
        if (rule.age_condition_op === 'between') {
          trigger += ` (${rule.age_condition_min}-${rule.age_condition_max} ans)`;
        } else if (rule.age_condition_op === '==') {
          trigger += ` (${rule.age_condition_value} ans)`;
        } else if (rule.age_condition_op === '>=') {
          trigger += ` (≥${rule.age_condition_value} ans)`;
        }
      }
      
      return trigger;
    }
    
    return 'Trigger non défini';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Chargement des templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                📬 Templates d&apos;Emails
              </h1>
              <p className="text-lg text-gray-600">
                Organisés par ordre chronologique d&apos;envoi
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">
                ← Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Templates</CardDescription>
              <CardTitle className="text-3xl">{templates.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Templates Actifs</CardDescription>
              <CardTitle className="text-3xl">
                {templates.filter(t => t.is_active).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avec Triggers</CardDescription>
              <CardTitle className="text-3xl">
                {templates.filter(t => t.rules && t.rules.length > 0).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Templates List (chronologique) */}
        {templates.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun template trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Exécutez le script SUPABASE_SETUP.sql pour créer les templates exemples
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {templates.map((template, index) => (
              <Card key={template.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-400">
                          #{index + 1}
                        </span>
                        <div>
                          <CardTitle className="text-xl">
                            {template.name}
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">
                            ID: {template.id}
                          </CardDescription>
                        </div>
                      </div>
                      
                      {/* Trigger Info */}
                      <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        🕐 {formatTrigger(template.rules)}
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      template.is_active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {template.is_active ? 'Actif' : 'Inactif'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Sujet :
                    </p>
                    <p className="text-sm text-gray-600">
                      {template.subject}
                    </p>
                  </div>
                  
                  {template.preview_text && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Prévisualisation :
                      </p>
                      <p className="text-sm text-gray-600">
                        {template.preview_text}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-xs text-gray-500">
                      Version {template.version} • {template.rules.length} règle{template.rules.length > 1 ? 's' : ''}
                    </div>
                    <Link href={`/newsletter/${template.id}`}>
                      <Button size="sm">
                        ✏️ Éditer
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>💡 Triés par ordre chronologique d&apos;envoi dans l&apos;année</p>
        </div>
      </div>
    </div>
  );
}
