'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/images/ferme-1.jpg', alt: 'La ferme du Treil - paysage aveyronnais', label: 'La ferme' },
  { src: '/images/produits-1.jpg', alt: 'Fromages et produits fermiers', label: 'Nos produits' },
  { src: '/images/tomme-de-brebis.jpg', alt: 'Tome de Brebis au lait cru entier', label: 'Tome de Brebis' },
  { src: '/images/brebicous.jpg', alt: 'Brebicous - fromage de brebis artisanal', label: 'Brebicous' },
  { src: '/images/rompi.jpg', alt: 'Le Rompi - spécialité fromagère', label: 'Le Rompi' },
  { src: '/images/brebichons.jpg', alt: 'Les Brebichons - petits fromages de brebis', label: 'Brebichons' },
]

export default function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = useCallback((dir) => {
    if (animating) return
    setAnimating(true)
    setCurrent((i) => (i + dir + photos.length) % photos.length)
    setTimeout(() => setAnimating(false), 400)
  }, [animating])

  const prevIdx = (current - 1 + photos.length) % photos.length
  const nextIdx = (current + 1) % photos.length

  return (
    <section className="py-20 bg-stone-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">
            En images
          </div>
          <h2 className="text-4xl font-serif text-stone-900">
            La vie à la ferme
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center" style={{ paddingBottom: '80px' }}>

        {/* Flèche gauche */}
        <button
          onClick={() => go(-1)}
          aria-label="Photo précédente"
          className="absolute left-4 md:left-8 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-stone-700 hover:bg-white hover:scale-110 transition-all duration-200 top-1/2 -translate-y-1/2"
          style={{ top: '40%' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image gauche partielle */}
        <div
          className="relative shrink-0 overflow-hidden rounded-xl cursor-pointer opacity-50 hover:opacity-70 transition-opacity duration-300"
          style={{ width: '14%', maxWidth: 160, height: 200 }}
          onClick={() => go(-1)}
        >
          <Image
            src={photos[prevIdx].src}
            alt={photos[prevIdx].alt}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>

        {/* Image centrale avec reflet */}
        <div className="relative shrink-0 mx-3 md:mx-6" style={{ width: '60%', maxWidth: 600 }}>
          {/* Image principale */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{
              height: 260,
              WebkitBoxReflect:
                'below 6px linear-gradient(transparent 55%, rgba(250,250,249,0.45) 100%)',
            }}
          >
            <Image
              key={current}
              src={photos[current].src}
              alt={photos[current].alt}
              fill
              priority
              className="object-cover transition-opacity duration-400"
              sizes="600px"
            />
            {/* Label */}
            <div className="absolute bottom-4 left-5 text-white font-serif text-xl drop-shadow-lg">
              {photos[current].label}
            </div>
          </div>
        </div>

        {/* Image droite partielle */}
        <div
          className="relative shrink-0 overflow-hidden rounded-xl cursor-pointer opacity-50 hover:opacity-70 transition-opacity duration-300"
          style={{ width: '14%', maxWidth: 160, height: 200 }}
          onClick={() => go(1)}
        >
          <Image
            src={photos[nextIdx].src}
            alt={photos[nextIdx].alt}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>

        {/* Flèche droite */}
        <button
          onClick={() => go(1)}
          aria-label="Photo suivante"
          className="absolute right-4 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-stone-700 hover:bg-white hover:scale-110 transition-all duration-200"
          style={{ top: '40%' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (!animating) { setAnimating(true); setCurrent(i); setTimeout(() => setAnimating(false), 400) } }}
            aria-label={`Photo ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-amber-600'
                : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
