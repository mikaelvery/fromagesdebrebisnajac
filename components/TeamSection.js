'use client'

const team = [
  {
    name: "Sacha",
    emoji: "🧢",
    title: "Le Berger Débrouillard™",
    tagline: "\"c'est bon ça\"",
    gradientFrom: "#d97706",
    gradientTo: "#92400e",
    borderColor: "#fde68a",
    accentColor: "#d97706",
    bgClass: "bg-amber-50",
    barClass: "from-amber-400 to-amber-700",
    stats: [
      { label: "Technique & bricole", value: 97, icon: "🔧" },
      { label: "Résistance météo", value: 100, icon: "⛈️" },
      { label: "Verbosité", value: 22, icon: "💬" },
    ],
    forces: [
      "Peut réparer n'importe quoi avec du fil de fer",
      "Pluie, vent, -10°C… il s'en fout",
      "Les brebis l'adorent (validé scientifiquement)",
      "Le plus débrouillard de la ferme",
    ],
    faiblesses: [
      "Jamais vu sans son bonnet (même en juillet)",
      "Sa réponse à tout : \"c'est bon ça\"",
      "Peut disparaître dans un champ pour des heures",
    ],
  },
  {
    name: "Laurie",
    emoji: "🤓",
    title: "L'Intello Fromagère™",
    tagline: "Ingénieure agro. Ne jamais la séparer de ses lunettes.",
    gradientFrom: "#059669",
    gradientTo: "#064e3b",
    borderColor: "#a7f3d0",
    accentColor: "#059669",
    bgClass: "bg-emerald-50",
    barClass: "from-emerald-400 to-emerald-700",
    stats: [
      { label: "QI Fromage", value: 99, icon: "🧀" },
      { label: "Sourire contagieux", value: 100, icon: "😊" },
      { label: "Lever tôt (5h du mat)", value: 98, icon: "🌅" },
    ],
    forces: [
      "Ingénieure agro (ça en impose aux clients)",
      "Prête au marché avant que vous vous réveilliez",
      "Sourire qui donne envie d'acheter le double",
      "Sait exactement quel fromage il vous faut",
    ],
    faiblesses: [
      "Incapable de passer devant du fromage sans le goûter",
      "Sans lunettes, on ne sait plus si c'est elle ou une brebis",
      "Parle de fromage même le dimanche",
    ],
  },
]

export default function TeamSection() {
  return (
    <section className="py-24 bg-stone-100 relative overflow-hidden">
      {/* Décoration fond */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, #78716c 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">
            Qui sommes-nous ?
          </div>
          <h2 className="text-5xl font-serif text-stone-900 mb-4">
            Les têtes pensantes
            <br />
            <span className="text-amber-600">(et travaillantes)</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-lg mx-auto">
            Un jeune couple dynamique et engagé — avec chacun ses super-pouvoirs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((person) => (
            <div
              key={person.name}
              className="relative bg-white rounded-3xl overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              style={{ border: `2px solid ${person.borderColor}` }}
            >
              {/* Card header */}
              <div
                className="h-28 relative"
                style={{
                  background: `linear-gradient(135deg, ${person.gradientFrom}, ${person.gradientTo})`,
                }}
              >
                {/* Cercles déco */}
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full" />
                <div className="absolute right-4 top-10 w-14 h-14 bg-white/10 rounded-full" />

                {/* Badge fondateur */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm">
                    ★ Fondateur·ice
                  </span>
                </div>

                {/* Avatar emoji */}
                <div className="absolute -bottom-7 left-8 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl border-2 border-stone-100">
                  {person.emoji}
                </div>
              </div>

              {/* Contenu */}
              <div className="pt-12 pb-8 px-8">
                <h3 className="text-2xl font-serif text-stone-900 mb-0.5">
                  {person.name}
                </h3>
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: person.accentColor }}
                >
                  {person.title}
                </p>
                <p className="text-stone-400 text-xs italic mb-6">
                  {person.tagline}
                </p>

                {/* Stats RPG */}
                <div className="space-y-3 mb-7">
                  {person.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-stone-500 flex items-center gap-1.5">
                          <span>{stat.icon}</span>
                          {stat.label}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: person.accentColor }}
                        >
                          {stat.value}/100
                        </span>
                      </div>
                      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${person.barClass} rounded-full`}
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Forces */}
                <div className="mb-5">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                    ✅ Points forts
                  </div>
                  <ul className="space-y-1.5">
                    {person.forces.map((f, i) => (
                      <li
                        key={i}
                        className="text-sm text-stone-600 flex items-start gap-2"
                      >
                        <span
                          className="mt-0.5 shrink-0 font-bold"
                          style={{ color: person.accentColor }}
                        >
                          ›
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Faiblesses */}
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                    😅 Points faibles
                  </div>
                  <ul className="space-y-1.5">
                    {person.faiblesses.map((f, i) => (
                      <li
                        key={i}
                        className="text-sm text-stone-500 flex items-start gap-2"
                      >
                        <span className="text-amber-400 mt-0.5 shrink-0 font-bold">
                          ›
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note bas */}
        <p className="text-center text-stone-400 text-sm mt-10 italic">
          Ensemble depuis quelques années, mariés aux brebis et à la fromagerie 🐑🧀
        </p>
      </div>
    </section>
  )
}
