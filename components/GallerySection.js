'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/images/ferme-1.jpg', alt: 'La ferme du Treil', label: 'La ferme' },
  { src: '/images/produits-1.jpg', alt: 'Fromages et produits fermiers', label: 'Nos produits' },
  { src: '/images/tomme-de-brebis.jpg', alt: 'Tome de Brebis au lait cru', label: 'Tome de Brebis' },
  { src: '/images/brebicous.jpg', alt: 'Brebicous', label: 'Brebicous' },
  { src: '/images/rompi.jpg', alt: 'Le Rompi', label: 'Le Rompi' },
  { src: '/images/brebichons.jpg', alt: 'Les Brebichons', label: 'Brebichons' },
]

const N = photos.length

// Dimensions fixes (mobile-first)
const CW = 280   // largeur carte centrale
const CH = 230   // hauteur carte centrale
const SW = 110   // largeur cartes latérales
const SH = 185   // hauteur cartes latérales
const SIDE_OFFSET = 180  // pixels : distance entre centre central et centre latéral
const REF_H = 65  // hauteur du reflet
const REF_GAP = 4 // espace entre carte et reflet

export default function GallerySection() {
  const [current, setCurrent] = useState(0)
  const touchX = useRef(null)
  const stageH = CH + REF_GAP + REF_H

  const go = (dir) => setCurrent((i) => (i + dir + N) % N)

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 35) go(dx > 0 ? -1 : 1)
    touchX.current = null
  }

  return (
    <section className="py-20 bg-stone-50 overflow-hidden select-none">

      {/* Titre */}
      <div className="text-center mb-10 px-6">
        <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">
          En images
        </div>
        <h2 className="text-4xl font-serif text-stone-900">La vie à la ferme</h2>
      </div>

      {/* Scène 3D — perspective posée ici */}
      <div
        className="relative mx-auto"
        style={{
          height: stageH,
          perspective: '900px',
          perspectiveOrigin: '50% 38%',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {photos.map((photo, index) => {
          let pos = index - current
          if (pos >  N / 2) pos -= N
          if (pos < -N / 2) pos += N
          if (Math.abs(pos) > 1) return null

          const isCenter = pos === 0
          const W = isCenter ? CW : SW
          const H = isCenter ? CH : SH

          // translateX en px (centré via -50%) + décalage latéral fixe
          const txPx  = pos * SIDE_OFFSET
          const rotY  = pos * -52
          const topPx = isCenter ? 0 : Math.round((CH - SH) / 2)

          return (
            <div
              key={photo.src}
              onClick={() => !isCenter && go(pos)}
              style={{
                position: 'absolute',
                left: '50%',
                top: topPx,
                width: W,
                cursor: isCenter ? 'grab' : 'pointer',
                zIndex: isCenter ? 10 : 5,
                // Seul transform + opacity en transition → GPU, pas de layout
                transform: `translateX(calc(-50% + ${txPx}px)) rotateY(${rotY}deg)`,
                opacity: isCenter ? 1 : 0.58,
                transition: 'transform 0.48s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.48s ease',
                willChange: 'transform, opacity',
              }}
            >
              {/* ── Image principale ── */}
              <div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{ height: H }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  draggable={false}
                  priority={isCenter}
                  sizes={isCenter ? '320px' : '130px'}
                  className="object-cover pointer-events-none"
                />
                {isCenter && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-white font-serif text-lg drop-shadow-lg">
                      {photo.label}
                    </span>
                  </>
                )}
              </div>

              {/* ── Reflet (centre uniquement) ── */}
              {isCenter && (
                <div
                  style={{
                    marginTop: REF_GAP,
                    height: REF_H,
                    width: W,
                    overflow: 'hidden',
                    borderRadius: '0 0 12px 12px',
                    transform: 'scaleY(-1)',
                    opacity: 0.42,
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                  }}
                >
                  <div className="relative" style={{ height: REF_H }}>
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      draggable={false}
                      sizes="320px"
                      className="object-cover pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
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
