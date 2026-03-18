'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/images/ferme-1.jpg', alt: 'La ferme du Treil', label: 'La ferme' },
  { src: '/images/produits-1.jpg', alt: 'Fromages et produits fermiers', label: 'Nos produits' },
  { src: '/images/tomme-de-brebis.jpg', alt: 'Tome de Brebis au lait cru', label: 'Tome de Brebis' },
  { src: '/images/brebicous.jpg', alt: 'Brebicous', label: 'Brebicous' },
  { src: '/images/rompi.jpg', alt: 'Le Rompi', label: 'Le Rompi' },
  { src: '/images/brebichons.jpg', alt: 'Les Brebichons', label: 'Brebichons' },
]

export default function GallerySection() {
  const scrollRef = useRef(null)
  const [current, setCurrent] = useState(0)

  /* ── Détection de la carte active via IntersectionObserver ── */
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            setCurrent(Number(entry.target.dataset.index))
          }
        })
      },
      { root: container, threshold: 0.55 }
    )

    const cards = container.querySelectorAll('[data-index]')
    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  /* ── Scroll programmatique pour les dots ── */
  const goTo = (i) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.querySelector(`[data-index="${i}"]`)
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section className="py-20 bg-stone-50">
      {/* Titre */}
      <div className="text-center mb-10 px-6">
        <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">
          En images
        </div>
        <h2 className="text-4xl font-serif text-stone-900">La vie à la ferme</h2>
      </div>

      {/* ── Scroll natif snap ── */}
      <div
        ref={scrollRef}
        className="scroll-snap-x flex overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: 14,
          /* Padding pour centrer la 1ère et dernière carte */
          paddingLeft: 'calc((100% - 68vw) / 2)',
          paddingRight: 'calc((100% - 68vw) / 2)',
          /* Espace sous pour le reflet */
          paddingBottom: 80,
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            data-index={i}
            style={{
              flexShrink: 0,
              width: '68vw',
              maxWidth: 460,
              scrollSnapAlign: 'center',
            }}
          >
            {/* ── Image principale ── */}
            <div
              className="relative overflow-hidden rounded-2xl shadow-xl"
              style={{ height: '44vw', maxHeight: 300 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                draggable={false}
                sizes="(max-width: 768px) 68vw, 460px"
                className="object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-serif text-base drop-shadow">
                {photo.label}
              </span>
            </div>

            {/* ── Reflet ── */}
            <div
              style={{
                marginTop: 5,
                height: 70,
                overflow: 'hidden',
                transform: 'scaleY(-1)',
                opacity: 0.38,
                WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
              }}
            >
              <div className="relative" style={{ height: 70 }}>
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  draggable={false}
                  sizes="460px"
                  className="object-cover pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dots ── */}
      <div className="flex justify-center gap-2 -mt-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
