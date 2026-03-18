'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Calendar } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message de ${formData.name} via le site`)
    const body = encodeURIComponent(`Bonjour,\n\n${formData.message}\n\n---\nNom : ${formData.name}\nEmail : ${formData.email}`)
    window.location.href = `mailto:lafermedutreil@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }


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

  // Map statique pour les couleurs de fond des icônes
  const iconBgColor = {
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-600',
  }

  // Map statique pour les dégradés des cartes
  const cardGradient = {
    amber: 'from-amber-50 to-stone-50',
    emerald: 'from-emerald-50 to-stone-50',
  }

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
              className={`bg-linear-to-br ${cardGradient[market.color]} rounded-2xl p-8`}
            >
              <div
                className={`${iconBgColor[market.color]} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6`}
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
                    <div className="text-stone-300">07 62 38 20 72</div>
                    <div className="text-stone-300">06 75 98 22 95</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-4 mt-1 text-amber-400" size={20} />
                  <div>
                    <div className="font-medium mb-1">Email</div>
                    <div className="text-stone-300">
                      lafermedutreil@gmail.com
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

            <div className="bg-stone-800 rounded-2xl p-8 flex flex-col">
              <h4 className="text-2xl font-serif mb-6">Envoyez-nous un message</h4>
              {sent ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-stone-300 text-lg font-serif">Merci pour votre message !</p>
                  <p className="text-stone-400 text-sm">Votre client mail va s&apos;ouvrir pour finaliser l&apos;envoi.</p>
                  <button onClick={() => setSent(false)} className="text-amber-400 text-sm underline underline-offset-2 mt-2">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                  <div>
                    <label className="block text-stone-400 text-xs uppercase tracking-wider mb-1.5">Votre nom</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-700/60 border border-stone-600 focus:border-amber-500 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      placeholder="Prénom et nom"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 text-xs uppercase tracking-wider mb-1.5">Votre email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-700/60 border border-stone-600 focus:border-amber-500 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      placeholder="votre@email.fr"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-stone-400 text-xs uppercase tracking-wider mb-1.5">Votre message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-700/60 border border-stone-600 focus:border-amber-500 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                      placeholder="Renseignements, commande, réservation gîte..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl py-3 text-sm transition-colors"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
