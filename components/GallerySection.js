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

function normalizePos(raw) {
  let p = raw % N
  if (p > N / 2) p -= N
  if (p < -N / 2) p += N
  return p
}

export default function GallerySection() {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)
  const mouseStartX = useRef(null)
  const dragging = useRef(false)

  const go = (dir) => setCurrent((i) => (i + dir + N) % N)

  /* ── Touch ── */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1)
    touchStartX.current = null
  }

  /* ── Mouse drag ── */
  const onMouseDown = (e) => { mouseStartX.current = e.clientX; dragging.current = false }
  const onMouseMove = (e) => { if (mouseStartX.current !== null) dragging.current = true }
  const onMouseUp = (e) => {
    if (mouseStartX.current === null) return
    const dx = e.clientX - mouseStartX.current
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1)
    mouseStartX.current = null
  }

  return (
    <section className="py-20 bg-stone-50 overflow-hidden select-none">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">
          En images
        </div>
        <h2 className="text-4xl font-serif text-stone-900">La vie à la ferme</h2>
      </div>

      {/* Viewport 3D */}
      <div
        className="relative mx-auto cursor-grab active:cursor-grabbing"
        style={{ perspective: '1100px', perspectiveOrigin: '50% 50%', height: 320 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {photos.map((photo, index) => {
          const pos = normalizePos(index - current)
          if (Math.abs(pos) > 1) return null

          const isCenter = pos === 0

          /* ── styles 3D par position ── */
          const rotateY  = pos * -48          // °  ex : +1 → -48°, -1 → +48°
          const tx       = pos * 46           // %  offset horizontal
          const scale    = isCenter ? 1 : 0.70
          const opacity  = isCenter ? 1 : 0.62
          const bright   = isCenter ? 1 : 0.55
          const zIndex   = isCenter ? 10 : 5

          /* largeur + hauteur carte */
          const w = isCenter ? 420 : 240
          const h = isCenter ? 300 : 220

          return (
            <div
              key={photo.src}
              onClick={() => !dragging.current && !isCenter && go(pos > 0 ? 1 : -1)}
              style={{
                position: 'absolute',
                left: '50%',
                top: isCenter ? 10 : 30,
                width: w,
                height: h,
                zIndex,
                opacity,
                filter: `brightness(${bright})`,
                cursor: isCenter ? 'grab' : 'pointer',
                transform: `translateX(calc(-50% + ${tx}%)) rotateY(${rotateY}deg) scale(${scale})`,
                transition: 'all 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                /* Reflet uniquement sur la centrale */
                WebkitBoxReflect: isCenter
                  ? 'below 5px linear-gradient(transparent 55%, rgba(250,250,249,0.38) 100%)'
                  : undefined,
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  draggable={false}
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 90vw, 600px"
                />
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                )}
                {isCenter && (
                  <span className="absolute bottom-5 left-5 text-white font-serif text-xl drop-shadow-lg">
                    {photo.label}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
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
