import Image from 'next/image'

const photos = [
  { src: '/images/ferme-1.jpg', alt: 'La ferme du Treil - paysage aveyronnais', label: 'La ferme' },
  { src: '/images/produits-1.jpg', alt: 'Fromages et produits fermiers de la Ferme du Treil', label: 'Nos produits' },
  { src: '/images/tomme-de-brebis.jpg', alt: 'Tome de Brebis au lait cru entier', label: 'Tome de Brebis' },
  { src: '/images/brebicous.jpg', alt: 'Brebicous - fromage de brebis artisanal', label: 'Brebicous' },
  { src: '/images/rompi.jpg', alt: 'Le Rompi - spécialité fromagère de la ferme', label: 'Le Rompi' },
  { src: '/images/brebichons.jpg', alt: 'Les Brebichons - petits fromages de brebis', label: 'Brebichons' },
]

export default function GallerySection() {
  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="text-center">
          <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">
            En images
          </div>
          <h2 className="text-4xl font-serif text-stone-900">
            La vie à la ferme
          </h2>
        </div>
      </div>

      {/* Grille photo asymétrique */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Grande photo en vedette */}
          <div className="col-span-2 md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-2xl h-64 md:h-auto md:min-h-[480px]">
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white font-serif text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {photos[0].label}
            </div>
          </div>

          {/* Photos secondaires */}
          {photos.slice(1).map((photo, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl h-56"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-3 left-3 text-white font-serif text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
