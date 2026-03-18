const testimonials = [
  {
    name: 'Marie-Claire B.',
    location: 'Toulouse',
    rating: 5,
    text: 'Des fromages d\'une qualité exceptionnelle ! La tome de brebis est onctueuse et parfumée. On sent vraiment le savoir-faire artisanal. On revient chaque été au marché de Najac exprès pour ça.',
    date: 'Été 2025',
    emoji: '🧀',
  },
  {
    name: 'Thomas & Julie',
    location: 'Randonneurs sur le GR 36',
    rating: 5,
    text: 'Une halte magique sur notre chemin de Compostelle. Laurie et Sacha nous ont accueillis chaleureusement, fait goûter leurs produits directement à la ferme. Les yaourts nature sont divins, on n\'avait jamais mangé ça !',
    date: 'Printemps 2025',
    emoji: '🥾',
  },
  {
    name: 'Pierre D.',
    location: 'Villefranche-de-Rouergue',
    rating: 5,
    text: 'Je suis client fidèle du marché du jeudi depuis 3 ans. Les Brebichons sont devenus indispensables sur ma table. Produits bio, honnêtes, avec une vraie histoire derrière. Merci pour votre travail !',
    date: 'Hiver 2025',
    emoji: '⭐',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-amber-50/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-amber-600 font-medium mb-4 uppercase tracking-wider text-sm">
            Ils nous font confiance
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
            Avis de nos clients
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Ceux qui sont passés à la ferme ou nous retrouvent sur les marchés
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-200 transition-all duration-300 flex flex-col"
            >
              {/* Note */}
              <div className="flex items-center justify-between mb-5">
                <StarRating count={t.rating} />
                <span className="text-2xl">{t.emoji}</span>
              </div>

              {/* Texte */}
              <blockquote className="text-stone-600 leading-relaxed text-base flex-1 mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Auteur */}
              <div className="border-t border-stone-100 pt-5">
                <div className="font-semibold text-stone-900">{t.name}</div>
                <div className="text-stone-400 text-sm mt-0.5 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {t.location} · {t.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note globale */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-amber-100">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold text-stone-900">5/5</span>
            <span className="text-stone-400 text-sm">· Apprécié par nos clients</span>
          </div>
        </div>
      </div>
    </section>
  )
}
