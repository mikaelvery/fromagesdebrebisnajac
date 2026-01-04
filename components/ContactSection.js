import { MapPin, Phone, Mail, Calendar } from 'lucide-react'

export default function ContactSection() {
  const markets = [
    {
      icon: <MapPin size={24} />,
      color: 'amber',
      title: 'Vente à la Ferme',
      schedule: 'Tous les jours',
      time: '17h00 - 19h00',
      note: 'Ou sur rendez-vous',
    },
    {
      icon: <Calendar size={24} />,
      color: 'emerald',
      title: 'Marché Villefranche',
      schedule: 'Jeudi matin',
      time: 'Place Lescure',
      note: 'Villefranche-de-Rouergue',
    },
    {
      icon: <Calendar size={24} />,
      color: 'amber',
      title: 'Marché de Najac',
      schedule: 'Dimanche matin',
      time: 'Place du village',
      note: 'Ambiance médiévale garantie',
    },
  ]

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-amber-600 font-medium mb-4 uppercase tracking-wider text-sm">
            Où nous trouver
          </div>
          <h2 className="text-5xl font-serif text-stone-900 mb-6">
            Venez nous rencontrer
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {markets.map((market, index) => (
            <div
              key={index}
              className={`bg-linear-to-br from-${market.color}-50 to-stone-50 rounded-2xl p-8`}
            >
              <div
                className={`w-12 h-12 bg-${market.color}-${
                  market.color === 'emerald' ? '600' : '500'
                } rounded-xl flex items-center justify-center text-white mb-6`}
              >
                {market.icon}
              </div>
              <h3 className="text-2xl font-serif text-stone-900 mb-4">
                {market.title}
              </h3>
              <p className="text-stone-600 mb-4">
                <strong>{market.schedule}</strong>
                <br />
                {market.time}
              </p>
              <p className="text-stone-600 text-sm">{market.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-stone-900 text-white rounded-3xl p-12 md:p-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-serif mb-8">Contactez-nous</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="mr-4 mt-1 text-amber-400" size={20} />
                  <div>
                    <div className="font-medium mb-1">Téléphone</div>
                    <div className="text-stone-300">06 30 54 28 58</div>
                    <div className="text-stone-300">06 75 98 22 95</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-4 mt-1 text-amber-400" size={20} />
                  <div>
                    <div className="font-medium mb-1">Email</div>
                    <div className="text-stone-300">
                      lafermedutreil@laposte.net
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-4 mt-1 text-amber-400" size={20} />
                  <div>
                    <div className="font-medium mb-1">Adresse</div>
                    <div className="text-stone-300">
                      Le Treil
                      <br />
                      12270 Najac
                      <br />
                      Aveyron, France
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-800 rounded-2xl p-8">
              <h4 className="text-2xl font-serif mb-6">Horaires d&apos;ouverture</h4>
              <div className="space-y-4 text-stone-300">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-stone-700 pb-3">
                  <span>Lundi - Samedi</span>
                  <span className="text-amber-400 font-medium">17h - 19h</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-stone-700 pb-3">
                  <span>Dimanche</span>
                  <span className="text-amber-400 font-medium">Marché de Najac</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 border-b border-stone-700 pb-3">
                  <span>Jeudi</span>
                  <span className="text-amber-400 font-medium">Marché Villefranche</span>
                </div>
              </div>
              <p className="text-stone-400 text-sm mt-6 italic">
                * Vente à la ferme possible sur rendez-vous en dehors de ces horaires
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}