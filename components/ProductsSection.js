export default function ProductsSection() {
  const products = [
    {
      icon: '🧀',
      title: 'Fromages Affinés',
      description:
        'Tommes, fromages frais et spécialités locales affinés selon les méthodes traditionnelles',
      features: ['Affinage artisanal', 'Pâte pressée', 'Croûte naturelle'],
    },
    {
      icon: '🥛',
      title: 'Yaourts Fermiers',
      description:
        'Onctueux et authentiques, nature ou parfumés aux fruits de saison',
      features: ['Lait entier', 'Ferments naturels', 'Sans additifs'],
    },
    {
      icon: '✨',
      title: 'Produits de Saison',
      description:
        'Créations saisonnières et éditions limitées selon les inspirations',
      features: ['Innovations', 'Recettes uniques', 'Production limitée'],
    },
  ]

  return (
    <section
      id="produits"
      className="py-32 bg-linear-to-br from-stone-100 to-amber-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-amber-600 font-medium mb-4 uppercase tracking-wider text-sm">
            Nos Produits
          </div>
          <h2 className="text-5xl font-serif text-stone-900 mb-6">
            Du pré à l&apos;assiette
          </h2>
          <p className="text-stone-600 text-xl max-w-2xl mx-auto">
            Une gamme artisanale de fromages et yaourts, élaborés avec passion
            dans le respect des traditions fromagères
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="card-hover bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-amber-600 rounded-2xl mb-6 flex items-center justify-center text-white text-2xl transform group-hover:scale-110 transition-transform">
                {product.icon}
              </div>
              <h3 className="text-2xl font-serif text-stone-900 mb-4">
                {product.title}
              </h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                {product.description}
              </p>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm text-stone-500"
                  >
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}