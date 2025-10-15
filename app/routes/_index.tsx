import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Childhood.ink - La Newsletter qui Grandit avec Votre Enfant" },
    {
      name: "description",
      content:
        "Recevez des conseils personnalisés adaptés à l'âge de votre enfant. Activités, santé, administratif, financier : les bonnes informations au bon moment.",
    },
    {
      property: "og:title",
      content: "Childhood.ink - Newsletter Éducative pour Parents",
    },
    {
      property: "og:description",
      content:
        "Des conseils personnalisés livrés aux moments clés de la vie de votre enfant",
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Childhood<span className="text-blue-600">.ink</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-700 mb-4 font-light">
            La newsletter qui <span className="font-semibold text-blue-600">grandit</span> avec votre enfant
          </p>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Des conseils personnalisés livrés aux <strong>moments clés</strong> du développement de votre enfant.
            Comme un mentor ou une bonne tante qui serait toujours là.
          </p>

          {/* CTA Button */}
          <div className="inline-block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg transition-all duration-200 hover:scale-105">
              Bientôt disponible 🎉
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Version 0.2 - Landing Page
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-4 py-16 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Notre Vision
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <em>"On sait suffisamment de choses pour conseiller chacun de façon systématique tout au long de sa vie."</em>
          </p>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            L'objectif : <strong>passer à l'échelle les conseils éducatifs</strong> en partageant 
            les bonnes informations au bon moment.
          </p>
        </div>
      </section>

      {/* What You Receive Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Ce que vous recevrez
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Activités */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Activités
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Des idées d'activités adaptées à chaque âge pour stimuler la créativité et l'éveil.
              </p>
            </div>

            {/* Administratif */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Administratif
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Les démarches importantes à ne pas oublier : inscriptions, documents, allocations.
              </p>
            </div>

            {/* Santé */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Santé
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Conseils santé et bien-être : vaccins, nutrition, développement physique.
              </p>
            </div>

            {/* Financier */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Financier
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Gérer le budget familial : épargne, aides, préparation de l'avenir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Comment ça marche ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Inscrivez-vous</h3>
              <p className="text-blue-100">
                Renseignez la date de naissance et le prénom de votre enfant
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Recevez des conseils</h3>
              <p className="text-blue-100">
                Nous vous envoyons des emails aux moments clés du développement
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Passez à l'action</h3>
              <p className="text-blue-100">
                Suivez les recommandations personnalisées et accompagnez votre enfant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Values */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Nos engagements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Moments clés
              </h3>
              <p className="text-gray-600">
                Des informations livrées aux dates importantes du développement de votre enfant
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Inspiration
              </h3>
              <p className="text-gray-600">
                Des idées concrètes pour stimuler la créativité et l'épanouissement
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ambition
              </h3>
              <p className="text-gray-600">
                Débloquer le potentiel de votre enfant et encourager son développement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à accompagner votre enfant ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            L'inscription sera bientôt disponible.
          </p>
          <p className="text-gray-400">
            Version 0.2 - Landing Page | En cours de développement
          </p>
        </div>
      </section>
    </div>
  );
}

