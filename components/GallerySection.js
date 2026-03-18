import Image from 'next/image'

const photos = [
  { src: '/images/ferme-1.jpg', alt: 'La ferme du Treil - paysage aveyronnais', label: 'La ferme' },
  { src: '/images/produits-1.jpg', alt: 'Fromages et produits fermiers de la Ferme du Treil', label: 'Nos produits' },
  { src: '/images/tomme-de-brebis.jpg', alt: 'Tome de Brebis au lait cru entier', label: 'Tome de Brebis' },
  { src: '/images/brebicous.jpg', alt: 'Brebicous - fromage de brebis artisanal', label: 'Brebicous' },
  { src: '/images/rompi.jpg', alt: 'Le Rompi - spécialité fromagère de la ferme', label: 'Le Rompi' },
  { src: '/images/brebichons.jpg', alt: 'Les Brebichons - petits fromages de brebis', label: 'Brebichons' },
]

function ReflectedPhoto({ src, alt, label, className, imageClassName }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Image principale */}
      <div
        className={`relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500 ${imageClassName}`}
        style={{
          WebkitBoxReflect:
            'below 6px linear-gradient(transparent 60%, rgba(255,255,255,0.18) 100%)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay hover */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Label hover */}
        <div className="absolute bottom-4 left-4 text-white font-serif text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </div>
      </div>
    </div>
  )
}

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

      <div className="max-w-7xl mx-auto px-6">
        {/* Ligne 1 : grande photo + 2 petites */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-5">
          {/* Grande photo vedette */}
          <ReflectedPhoto
            src={photos[0].src}
            alt={photos[0].alt}
            label={photos[0].label}
            className="col-span-2 md:col-span-1 md:row-span-2"
            imageClassName="h-64 md:h-[480px]"
          />
          {/* Photo 2 et 3 */}
          {photos.slice(1, 3).map((photo) => (
            <ReflectedPhoto
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              label={photo.label}
              className=""
              imageClassName="h-56"
            />
          ))}
          {/* Photos 4, 5, 6 */}
          {photos.slice(3).map((photo) => (
            <ReflectedPhoto
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              label={photo.label}
              className=""
              imageClassName="h-56"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
