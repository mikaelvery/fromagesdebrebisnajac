import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="ferme" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-amber-600 font-medium mb-4 uppercase tracking-wider text-sm">
              Notre Histoire
            </div>
            <h2 className="text-5xl font-serif text-stone-900 mb-8">
              Une passion
              <br />
              transmise au quotidien
            </h2>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                Au cœur du village médiéval de Najac, classé Grand Site
                d&apos;Occitanie, la Ferme du Treil perpétue une tradition fromagère
                ancestrale dans le respect de la nature et du bien-être animal.
              </p>
              <p>
                Notre troupeau de 60 brebis laitières pâture sur 10 hectares
                conduits en agriculture biologique. Chaque matin, nous
                transformons leur lait en fromages et yaourts d&apos;exception, selon
                des méthodes artisanales transmises de génération en génération.
              </p>
              <p>
                Située sur le GR 36 et le Chemin de Saint-Jacques de
                Compostelle, notre ferme offre une halte authentique aux
                amoureux de la nature et des produits du terroir.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">60</div>
                <div className="text-stone-600 text-sm">Brebis laitières</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">10ha</div>
                <div className="text-stone-600 text-sm">Agriculture bio</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
                <div className="text-stone-600 text-sm">Artisanal</div>
              </div>
            </div>
          </div>

          <div className="relative h-150 group">
            <div className="absolute inset-0 bg-linear-to-br from-amber-200 to-emerald-300 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            {/* Pour utiliser une vraie image, décommenter et remplacer :
            <Image
              src="/images/ferme-1.jpg"
              alt="Paysage de la ferme"
              fill
              className="object-cover rounded-3xl"
            />
            */}
            <div className="absolute inset-0 bg-linear-to-tr from-stone-700 to-stone-500 rounded-3xl flex items-center justify-center text-white text-2xl font-serif p-8 text-center">
              📸
              <br />
              Paysage de la ferme
              <br />& Troupeau de brebis
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}