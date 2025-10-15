import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Childhood.ink - Newsletter Éducative pour Parents" },
    {
      name: "description",
      content:
        "Des conseils personnalisés pour accompagner vos enfants tout au long de leur vie.",
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Childhood.ink
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Des conseils personnalisés pour accompagner vos enfants
          <br />
          tout au long de leur vie
        </p>

        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            La newsletter qui grandit avec votre enfant
          </h2>
          
          <p className="text-gray-600 mb-6">
            Recevez des conseils adaptés à l'âge de votre enfant : activités,
            santé, administratif, et bien plus encore.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 font-medium">
              🚀 Version 0.1 - Infrastructure en place
            </p>
            <p className="text-blue-600 text-sm mt-2">
              Le projet est initialisé avec Remix, TypeScript et Tailwind CSS
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Moments clés
            </h3>
            <p className="text-gray-600 text-sm">
              Des conseils livrés aux moments importants du développement
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Inspiration
            </h3>
            <p className="text-gray-600 text-sm">
              Des idées pour stimuler la créativité de votre enfant
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Ambition
            </h3>
            <p className="text-gray-600 text-sm">
              Encourager le potentiel et l'épanouissement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

