'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
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
  const scrollRef  = useRef(null)
  const cardRefs   = useRef([])
  const rafRef     = useRef(null)
  const [current, setCurrent] = useState(0)

  /* ── Calcule et applique les transforms 3D sur chaque frame ── */
  const updateTransforms = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const cw = container.clientWidth
    const centerX = container.scrollLeft + cw / 2  // centre visible en px absolus
    const maxDist  = cw * 0.72                     // distance de normalisation

    let closestDist = Infinity
    let closestIdx  = 0

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist       = cardCenter - centerX        // + = à droite du centre

      if (Math.abs(dist) < closestDist) {
        closestDist = Math.abs(dist)
        closestIdx  = i
      }

      const ratio   = Math.max(-1, Math.min(1, dist / maxDist))
      const rotateY = ratio * -42          // °  plus d'angle comme chezestela
      const scale   = 1 - Math.abs(ratio) * 0.12
      const opacity = 1 - Math.abs(ratio) * 0.30

      // perspective() dans le transform = chaque carte a son propre point de fuite
      card.style.transform = `perspective(900px) rotateY(${rotateY}deg) scale(${scale})`
      card.style.opacity   = String(opacity)
    })

    setCurrent(closestIdx)
  }, [])

  /* ── Attache le listener scroll + RAF ── */
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateTransforms)
    }

    updateTransforms()                       // état initial
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateTransforms])

  /* ── Navigation par les dots ── */
  const goTo = (i) => {
    const container = scrollRef.current
    const card = cardRefs.current[i]
    if (!container || !card) return
    const target = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2
    container.scrollTo({ left: target, behavior: 'smooth' })
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

      {/* ── Scroll natif ── */}
      <div
        ref={scrollRef}
        className="scroll-snap-x flex overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: 12,
          /* Carte à 58vw → ~22% visible de chaque côté sur mobile */
          paddingLeft:   'calc((100% - min(58vw, 420px)) / 2)',
          paddingRight:  'calc((100% - min(58vw, 420px)) / 2)',
          paddingBottom: 80,
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            ref={(el) => { cardRefs.current[i] = el }}
            style={{
              flexShrink: 0,
              width: 'min(58vw, 420px)',
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',   // 1 swipe = 1 image max
              willChange: 'transform, opacity',
            }}
          >
            {/* ── Image — coins carrés, ombre carrée ── */}
            <div
              className="relative overflow-hidden"
              style={{
                height: 'min(38vw, 270px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                draggable={false}
                sizes="(max-width: 768px) 58vw, 420px"
                className="object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-serif text-base drop-shadow">
                {photo.label}
              </span>
            </div>

            {/* ── Reflet collé (marginTop: 0) ── */}
            <div
              style={{
                marginTop: 0,
                height: 68,
                overflow: 'hidden',
                transform: 'scaleY(-1)',
                opacity: 0.38,
                WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
              }}
            >
              <div style={{ position: 'relative', height: 68 }}>
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  draggable={false}
                  sizes="420px"
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
