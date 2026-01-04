'use client'

export default function GiteSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const features = [
    'Hébergement de charme dans une maison de caractère',
    'Visite de la fromagerie et rencontre avec les brebis',
    'Randonnées sur le GR 36 et Compostelle',
    'Vue imprenable sur la forteresse de Najac',
    'Dégustation de nos produits fermiers',
  ]

  return (
    <section
      id="gite"
      className="py-32 bg-stone-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 dot-pattern"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-125">
            <div className="absolute inset-0 bg-linear-to-br from-amber-600 to-emerald-600 rounded-3xl transform -rotate-3"></div>
            {/* Pour utiliser une vraie image :
            <Image
              src="/images/gite-1.jpg"
              alt="Gîte"
              fill
              className="object-cover rounded-3xl"
            />
            */}
            <div className="absolute inset-0 bg-stone-700 rounded-3xl flex items-center justify-center text-white text-xl font-serif p-8 text-center">
              📸
              <br />
              Gîte & Chambres d&apos;Hôtes
            </div>
          </div>

          <div>
            <div className="inline-block px-4 py-2 bg-amber-500 text-stone-900 rounded-full text-sm font-medium mb-6">
              Prochainement
            </div>
            <h2 className="text-5xl font-serif mb-8">
              Séjournez au cœur
              <br />
              de l&apos;Aveyron authentique
            </h2>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
              Bientôt, découvrez notre gîte rural niché dans notre grande maison
              traditionnelle. Un havre de paix pour vous ressourcer, entre
              nature préservée et patrimoine médiéval.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-4 mt-1 shrink-0">
                    <div className="w-2 h-2 bg-stone-900 rounded-full"></div>
                  </div>
                  <span className="text-stone-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-amber-500 text-stone-900 rounded-full font-medium hover:bg-amber-400 transition-all"
            >
              Nous contacter pour plus d&apos;infos
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}