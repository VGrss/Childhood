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
import { EmailTemplate } from '@/lib/email-system/types';

interface EmailSection {
  type: string;
  title?: string;
  body: string;
}

export default function EditTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [sections, setSections] = useState<EmailSection[]>([]);

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
      
      if (data.content && data.content.sections) {
        setSections(data.content.sections);
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
          content: { sections },
        }),
      });

      if (!response.ok) throw new Error('Failed to save');

      setSuccessMessage('✅ Template enregistré avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('❌ Erreur lors de l\'enregistrement');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    setSections([...sections, { type: 'intro', body: '' }]);
  };

  const updateSection = (index: number, field: keyof EmailSection, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              ✏️ Édition du Template
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
                <CardDescription>Nom, sujet et prévisualisation</CardDescription>
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
                    Variables disponibles : {'{child_name}'}, {'{parent_name}'}, {'{age}'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preview">Texte de prévisualisation</Label>
                  <Input
                    id="preview"
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    placeholder="L'anniversaire de votre enfant approche..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sections du contenu</CardTitle>
                    <CardDescription>
                      Organisez le contenu en sections thématiques
                    </CardDescription>
                  </div>
                  <Button onClick={addSection} size="sm">
                    + Ajouter une section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {sections.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4 bg-white">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        Section {index + 1}
                      </h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSection(index)}
                      >
                        🗑️ Supprimer
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <select
                          value={section.type}
                          onChange={(e) => updateSection(index, 'type', e.target.value)}
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="intro">Introduction</option>
                          <option value="activities">Activités</option>
                          <option value="admin">Administratif</option>
                          <option value="health">Santé</option>
                          <option value="financial">Financier</option>
                          <option value="conclusion">Conclusion</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>Titre (optionnel)</Label>
                        <Input
                          value={section.title || ''}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          placeholder="Titre de la section"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Contenu</Label>
                      <Textarea
                        value={section.body}
                        onChange={(e) => updateSection(index, 'body', e.target.value)}
                        placeholder="Contenu de la section..."
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                ))}

                {sections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">Aucune section ajoutée</p>
                    <Button onClick={addSection}>
                      + Ajouter la première section
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Prévisualisation */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Prévisualisation de l&apos;email</CardTitle>
                <CardDescription>
                  Aperçu avec variables de test
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-8 max-w-2xl mx-auto">
                  {/* Subject */}
                  <div className="mb-6 pb-6 border-b">
                    <p className="text-xs text-gray-500 mb-1">Sujet :</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {subject.replace('{child_name}', 'Alice').replace('{age}', '3')}
                    </h2>
                    {previewText && (
                      <p className="text-sm text-gray-600 mt-2">{previewText}</p>
                    )}
                  </div>

                  {/* Sections */}
                  <div className="space-y-6">
                    {sections.map((section, index) => (
                      <div key={index}>
                        {section.title && (
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {section.title}
                          </h3>
                        )}
                        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {section.body
                            .replace('{child_name}', 'Alice')
                            .replace('{parent_name}', 'Marie')
                            .replace('{age}', '3')}
                        </div>
                        {index < sections.length - 1 && (
                          <Separator className="my-6" />
                        )}
                      </div>
                    ))}
                  </div>

                  {sections.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      Aucune section à prévisualiser
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

