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
const mod = (n, m) => ((n % m) + m) % m

function Reflection({ src }) {
  return (
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
        <Image src={src} alt="" fill draggable={false}
          sizes="600px" className="object-cover pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function GallerySection() {
  const [current, setCurrent] = useState(0)
  const touchX = useRef(null)

  /* ── Navigation infinie ── */
  const go = (dir) => setCurrent(i => mod(i + dir, N))

  /* ── Swipe tactile (mobile ET desktop) ── */
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1)
    touchX.current = null
  }

  /* ── Style 3D pour desktop selon la position offset (-1, 0, +1) ── */
  const desktopStyle = (offset) => {
    const isCenter = offset === 0
    return {
      position: 'absolute',
      left: '50%',
      top: isCenter ? 0 : '5%',
      /* Carte centrale grande, côtés plus petits */
      width:  isCenter ? '42vw' : '27vw',
      height: isCenter ? '30vw' : '22vw',
      maxWidth:  isCenter ? 560 : 360,
      maxHeight: isCenter ? 400 : 300,
      transform: `translateX(calc(-50% + ${offset * 33}vw)) rotateY(${offset * -42}deg) scale(${isCenter ? 1 : 0.9})`,
      opacity:   isCenter ? 1 : 0.72,
      zIndex:    isCenter ? 10 : 5,
      cursor:    isCenter ? 'default' : 'pointer',
      transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
    }
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

      {/* ════════════════════════════
          MOBILE : 1 seule image
      ════════════════════════════ */}
      <div
        className="md:hidden px-5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="relative overflow-hidden"
          style={{ height: '62vw', boxShadow: '0 8px 28px rgba(0,0,0,0.2)' }}
        >
          <Image
            key={current}
            src={photos[current].src}
            alt={photos[current].alt}
            fill
            priority
            sizes="90vw"
            draggable={false}
            className="object-cover pointer-events-none animate-fade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          <span className="absolute bottom-4 left-4 text-white font-serif text-base drop-shadow">
            {photos[current].label}
          </span>
        </div>
        <Reflection src={photos[current].src} />
      </div>

      {/* ════════════════════════════
          DESKTOP : 3 images coverflow
      ════════════════════════════ */}
      <div
        className="hidden md:block relative"
        style={{ height: '38vw', maxHeight: 500, perspective: '1200px', perspectiveOrigin: '50% 40%' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {[-1, 0, 1].map((offset) => {
          const idx = mod(current + offset, N)
          const isCenter = offset === 0
          return (
            <div
              key={offset}
              style={desktopStyle(offset)}
              onClick={() => !isCenter && go(offset)}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ boxShadow: isCenter ? '0 20px 60px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.18)' }}
              >
                <Image
                  src={photos[idx].src}
                  alt={photos[idx].alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 1200px) 42vw, 560px"
                  className="object-cover pointer-events-none"
                />
                {isCenter && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className="absolute bottom-5 left-5 text-white font-serif text-xl drop-shadow-lg">
                      {photos[idx].label}
                    </span>
                  </>
                )}
              </div>
              {isCenter && <Reflection src={photos[idx].src} />}
            </div>
          )
        })}
      </div>

      {/* ════════════════════════════
          Dots communs
      ════════════════════════════ */}
      <div className="flex justify-center gap-2 mt-6 md:mt-10">
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
