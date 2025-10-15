'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface TemplateData {
  id: string;
  name: string;
  subject: string;
  content: any;
  preview_text?: string;
  is_active: boolean;
  version: number;
  rules?: any[];
}

export default function EditTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetchTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      const response = await fetch(`/api/templates/${templateId}`);
      if (!response.ok) throw new Error('Template not found');
      
      const data = await response.json();
      setTemplate(data);
      setName(data.name);
      setSubject(data.subject);
      setPreviewText(data.preview_text || '');
      
      // Extraire le body (compatible avec ancien et nouveau format)
      if (data.content) {
        if (typeof data.content === 'string') {
          setBody(data.content);
        } else if (data.content.body) {
          setBody(data.content.body);
        } else if (data.content.sections) {
          // Convertir l'ancien format en nouveau
          const combinedBody = data.content.sections
            .map((s: any) => {
              let text = '';
              if (s.title) text += `## ${s.title}\n\n`;
              // Convertir les \n littéraux en vrais sauts de ligne
              text += s.body.replace(/\\n/g, '\n');
              return text;
            })
            .join('\n\n---\n\n');
          setBody(combinedBody);
        }
      }
    } catch (err) {
      setError('Erreur lors du chargement du template');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          subject,
          preview_text: previewText,
          content: { body }, // Nouveau format simplifié
        }),
      });

      if (!response.ok) throw new Error('Failed to save');

      const result = await response.json();
      setSuccessMessage('✅ Template enregistré avec succès !');
      setTemplate(result.template);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('❌ Erreur lors de l\'enregistrement');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const formatTriggerDisplay = (rules: any[]): string => {
    if (!rules || rules.length === 0) return 'Aucun trigger configuré';
    
    const rule = rules[0];
    
    if (rule.type === 'relative') {
      const days = Math.abs(rule.offset_days || 0);
      const before = (rule.offset_days || 0) < 0;
      return `${days} jour${days > 1 ? 's' : ''} ${before ? 'avant' : 'après'} l'anniversaire`;
    }
    
    if (rule.type === 'absolute' || rule.type === 'hybrid') {
      const months = ['', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
      const monthName = months[rule.anchor_month];
      const day = rule.anchor_day === 'last' ? 'dernier jour' : rule.anchor_day;
      
      let trigger = `${day} ${monthName}`;
      
      if (rule.age_condition_op && rule.age_condition_op !== 'none') {
        if (rule.age_condition_op === 'between') {
          trigger += ` • ${rule.age_condition_min}-${rule.age_condition_max} ans`;
        } else if (rule.age_condition_op === '==') {
          trigger += ` • ${rule.age_condition_value} ans`;
        } else if (rule.age_condition_op === '>=') {
          trigger += ` • ≥${rule.age_condition_value} ans`;
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
          <p className="text-gray-600">Chargement du template...</p>
        </div>
      </div>
    );
  }

  if (error && !template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Erreur
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => router.push('/newsletter')}>
              ← Retour à la liste
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                ✏️ {name || 'Édition du Template'}
              </h1>
              <p className="text-gray-600">ID: {templateId}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push('/newsletter')}>
                ← Retour
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Enregistrement...' : '💾 Enregistrer'}
              </Button>
            </div>
          </div>

          {/* Trigger Info */}
          {template?.rules && template.rules.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Déclenchement automatique
                  </p>
                  <p className="text-blue-700">
                    {formatTriggerDisplay(template.rules)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}
        {error && template && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <Tabs defaultValue="edit" className="space-y-6">
          <TabsList>
            <TabsTrigger value="edit">✏️ Édition</TabsTrigger>
            <TabsTrigger value="preview">👁️ Prévisualisation</TabsTrigger>
          </TabsList>

          {/* Onglet Édition */}
          <TabsContent value="edit" className="space-y-6">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>Nom et métadonnées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du template</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rappel d&apos;anniversaire"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet de l&apos;email</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="🎉 L&apos;anniversaire de {child_name} approche !"
                  />
                  <p className="text-xs text-gray-500">
                    Variables : {'{child_name}'}, {'{parent_name}'}, {'{age}'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preview">Texte de prévisualisation</Label>
                  <Input
                    id="preview"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    placeholder="L&apos;anniversaire de votre enfant approche..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contenu de l'email */}
            <Card>
              <CardHeader>
                <CardTitle>Contenu de l&apos;email</CardTitle>
                <CardDescription>
                  Rédigez le contenu complet de l&apos;email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="body">Contenu</Label>
                  <Textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Bonjour {parent_name},

Dans 7 jours, {child_name} fêtera son anniversaire ! C'est l'occasion parfaite pour célébrer cette étape importante.

## Idées d'activités

- Organiser une petite fête avec les amis
- Préparer un gâteau ensemble
- Créer un album photo de l'année écoulée

Profitez de ce moment spécial !

L'équipe Childhood.ink"
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    💡 Utilisez ## pour les titres, - pour les listes. Variables : {'{child_name}'}, {'{parent_name}'}, {'{age}'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Prévisualisation */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Prévisualisation de l&apos;email</CardTitle>
                <CardDescription>
                  Aperçu avec variables de test (Alice, Marie, 3 ans)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-8 max-w-2xl mx-auto">
                  {/* Subject */}
                  <div className="mb-6 pb-6 border-b">
                    <p className="text-xs text-gray-500 mb-1">Sujet :</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {subject
                        .replace(/{child_name}/g, 'Alice')
                        .replace(/{parent_name}/g, 'Marie')
                        .replace(/{age}/g, '3')}
                    </h2>
                    {previewText && (
                      <p className="text-sm text-gray-600 mt-2">{previewText}</p>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="prose prose-slate max-w-none">
                    {body
                      .replace(/{child_name}/g, 'Alice')
                      .replace(/{parent_name}/g, 'Marie')
                      .replace(/{age}/g, '3')
                      .split('\n')
                      .map((line, i) => {
                        // Titres (##)
                        if (line.startsWith('## ')) {
                          return (
                            <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                              {line.replace('## ', '')}
                            </h3>
                          );
                        }
                        // Listes (-)
                        if (line.trim().startsWith('- ')) {
                          return (
                            <li key={i} className="text-gray-700 ml-4">
                              {line.replace(/^- /, '')}
                            </li>
                          );
                        }
                        // Lignes vides
                        if (line.trim() === '') {
                          return <br key={i} />;
                        }
                        // Séparateur (---)
                        if (line.trim() === '---') {
                          return <Separator key={i} className="my-6" />;
                        }
                        // Texte normal
                        return (
                          <p key={i} className="text-gray-700 leading-relaxed mb-2">
                            {line}
                          </p>
                        );
                      })}
                  </div>

                  {!body && (
                    <div className="text-center py-12 text-gray-400">
                      Aucun contenu à prévisualiser
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-6 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">💡 Aide à la rédaction</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p><strong>Variables :</strong> {'{child_name}'}, {'{parent_name}'}, {'{age}'}</p>
            <p><strong>Titres :</strong> Utilisez ## pour créer un titre</p>
            <p><strong>Listes :</strong> Commencez les lignes par - pour créer une liste</p>
            <p><strong>Séparateur :</strong> Utilisez --- pour créer une ligne de séparation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
