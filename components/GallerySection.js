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
  // outerRefs = éléments de layout (scroll snap) — pour calculer la position
  // innerRefs = éléments visuels — reçoivent le transform 3D
  const outerRefs  = useRef([])
  const innerRefs  = useRef([])
  const rafRef     = useRef(null)
  const [current, setCurrent] = useState(0)

  const updateTransforms = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const cw      = container.clientWidth
    const centerX = container.scrollLeft + cw / 2
    const maxDist = cw * 0.68

    let closestDist = Infinity
    let closestIdx  = 0

    outerRefs.current.forEach((outer, i) => {
      if (!outer || !innerRefs.current[i]) return

      const cardCenter = outer.offsetLeft + outer.offsetWidth / 2
      const dist       = cardCenter - centerX

      if (Math.abs(dist) < closestDist) {
        closestDist = Math.abs(dist)
        closestIdx  = i
      }

      const ratio   = Math.max(-1, Math.min(1, dist / maxDist))
      const rotateY = ratio * -42
      const scale   = 1 - Math.abs(ratio) * 0.12
      const opacity = 1 - Math.abs(ratio) * 0.30

      // Le transform va sur l'INNER — le layout de l'outer n'est pas affecté
      innerRefs.current[i].style.transform =
        `perspective(900px) rotateY(${rotateY}deg) scale(${scale})`
      innerRefs.current[i].style.opacity = String(opacity)
    })

    setCurrent(closestIdx)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateTransforms)
    }

    updateTransforms()
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateTransforms])

  const goTo = (i) => {
    const container = scrollRef.current
    const outer = outerRefs.current[i]
    if (!container || !outer) return
    const target = outer.offsetLeft - (container.clientWidth - outer.offsetWidth) / 2
    container.scrollTo({ left: target, behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-stone-50">
      <div className="text-center mb-10 px-6">
        <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">
          En images
        </div>
        <h2 className="text-4xl font-serif text-stone-900">La vie à la ferme</h2>
      </div>

      {/* Scroll natif — outer divs gèrent le layout, inner divs gèrent le 3D */}
      <div
        ref={scrollRef}
        className="scroll-snap-x flex overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: 12,
          paddingLeft:   'calc((100vw - min(62vw, 420px)) / 2)',
          paddingRight:  'calc((100vw - min(62vw, 420px)) / 2)',
          paddingBottom: 80,
        }}
      >
        {photos.map((photo, i) => (
          /* ── Outer : layout + snap — PAS de transform ── */
          <div
            key={photo.src}
            ref={(el) => { outerRefs.current[i] = el }}
            style={{
              flexShrink: 0,
              width: 'min(62vw, 420px)',
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',
            }}
          >
            {/* ── Inner : reçoit le transform 3D ── */}
            <div
              ref={(el) => { innerRefs.current[i] = el }}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: 'min(40vw, 280px)',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 768px) 62vw, 420px"
                  className="object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-serif text-base drop-shadow">
                  {photo.label}
                </span>
              </div>

              {/* Reflet collé */}
              <div
                style={{
                  height: 70,
                  overflow: 'hidden',
                  transform: 'scaleY(-1)',
                  opacity: 0.38,
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                  maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                }}
              >
                <div style={{ position: 'relative', height: 70 }}>
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
          </div>
        ))}
      </div>

      {/* Dots */}
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
