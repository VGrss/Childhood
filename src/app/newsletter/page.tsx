import { supabaseAdmin } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EmailTemplate } from '@/lib/email-system/types';

export const revalidate = 0; // Désactiver le cache pour toujours voir les dernières données

async function getTemplates() {
  const { data: templates, error } = await supabaseAdmin
    .from('email_templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching templates:', error);
    return [];
  }

  return templates as EmailTemplate[];
}

export default async function NewsletterPage() {
  const templates = await getTemplates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                📬 Gestion des Templates
              </h1>
              <p className="text-lg text-gray-600">
                Créez et éditez les templates d&apos;emails de la newsletter
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">
                ← Retour à l'accueil
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
              <CardDescription>Templates Inactifs</CardDescription>
              <CardTitle className="text-3xl">
                {templates.filter(t => !t.is_active).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Templates Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        ID: {template.id}
                      </CardDescription>
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
                      Version {template.version} • {
                        typeof template.content === 'object' && 'sections' in template.content
                          ? template.content.sections.length
                          : 0
                      } sections
                    </div>
                    <Link href={`/newsletter/${template.id}`}>
                      <Button size="sm">
                        Éditer →
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
          <p>💡 Astuce : Les templates sont utilisés par les règles d&apos;envoi automatique</p>
        </div>
      </div>
    </div>
  );
}

