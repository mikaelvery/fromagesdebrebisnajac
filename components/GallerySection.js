'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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

function Reflection({ src, height = 70 }) {
  return (
    <div
      style={{
        height,
        overflow: 'hidden',
        transform: 'scaleY(-1)',
        opacity: 0.4,
        WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
      }}
    >
      <div style={{ position: 'relative', height }}>
        <Image src={src} alt="" fill draggable={false}
          sizes="600px" className="object-cover pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function GallerySection() {
  const [current, setCurrent] = useState(0)

  /* ══════════════════════════════════════════
     MOBILE — track qui suit le doigt en live
  ══════════════════════════════════════════ */
  const trackRef    = useRef(null)
  const wrapRef     = useRef(null)
  const touchXM     = useRef(null)
  const sliding     = useRef(false)   // animation en cours → bloquer nouveau drag
  const cardW       = useRef(390)     // largeur de la carte = largeur du conteneur

  // Positionne le track sans (ou avec) transition
  const setTrack = useCallback((px, animate = false) => {
    if (!trackRef.current) return
    trackRef.current.style.transition = animate ? 'transform 0.32s ease' : 'none'
    trackRef.current.style.transform  = `translateX(${px}px)`
  }, [])

  // À chaque changement de current, on recentre silencieusement
  useEffect(() => {
    const w = wrapRef.current?.clientWidth || window.innerWidth
    cardW.current = w
    setTrack(-w, false)
  }, [current, setTrack])

  const onMobileStart = (e) => {
    if (sliding.current) return
    cardW.current = wrapRef.current?.clientWidth || window.innerWidth
    touchXM.current = e.touches[0].clientX
  }

  const onMobileMove = (e) => {
    if (touchXM.current === null || sliding.current) return
    const dx = e.touches[0].clientX - touchXM.current
    setTrack(-cardW.current + dx, false)   // suit le doigt en temps réel
  }

  const onMobileEnd = (e) => {
    if (touchXM.current === null) return
    const dx = e.changedTouches[0].clientX - touchXM.current
    touchXM.current = null

    if (Math.abs(dx) > 45) {
      const dir = dx > 0 ? -1 : 1
      sliding.current = true
      setTrack(-cardW.current + dir * -cardW.current, true)   // anime vers carte voisine
      setTimeout(() => {
        setCurrent(prev => mod(prev + dir, N))   // met à jour l'index
        // Le useEffect recentrera le track sans transition
        sliding.current = false
      }, 320)
    } else {
      setTrack(-cardW.current, true)   // snap back
    }
  }

  /* ══════════════════════════════════════════
     DESKTOP — swipe simple (animation CSS)
  ══════════════════════════════════════════ */
  const touchXD = useRef(null)
  const go = (dir) => setCurrent(i => mod(i + dir, N))
  const onDesktopStart = (e) => { touchXD.current = e.touches[0].clientX }
  const onDesktopEnd   = (e) => {
    if (!touchXD.current) return
    const dx = e.changedTouches[0].clientX - touchXD.current
    touchXD.current = null
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1)
  }

  /* ── Drag souris desktop ── */
  const mouseXD = useRef(null)
  const onDesktopMouseDown = (e) => { mouseXD.current = e.clientX }
  const onDesktopMouseUp   = (e) => {
    if (mouseXD.current === null) return
    const dx = e.clientX - mouseXD.current
    mouseXD.current = null
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1)
  }

  /* ── Style 3D pour desktop selon la position offset (-1, 0, +1) ── */
  const desktopStyle = (offset) => {
    const isCenter = offset === 0
    return {
      position: 'absolute',
      left: '50%',
      top: isCenter ? 0 : '6%',
      width:     isCenter ? '48vw' : '26vw',
      height:    isCenter ? '34vw' : '24vw',
      maxWidth:  isCenter ? 680 : 380,
      maxHeight: isCenter ? 460 : 320,
      transform: `translateX(calc(-50% + ${offset * 35}vw)) rotateY(${offset * -44}deg) scale(${isCenter ? 1 : 0.88})`,
      opacity:   isCenter ? 1 : 0.70,
      zIndex:    isCenter ? 10 : 5,
      cursor:    isCenter ? 'grab' : 'pointer',
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
          MOBILE : track qui suit le doigt
      ════════════════════════════ */}
      <div
        ref={wrapRef}
        className="md:hidden overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={onMobileStart}
        onTouchMove={onMobileMove}
        onTouchEnd={onMobileEnd}
      >
        {/* Track : 3 cartes côte à côte, translateX positionne la centrale */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: '300vw',
            transform: 'translateX(-100vw)',   // valeur initiale SSR
            willChange: 'transform',
          }}
        >
          {[mod(current - 1, N), current, mod(current + 1, N)].map((idx, pos) => (
            <div key={pos} style={{ flexShrink: 0, width: '100vw', paddingInline: '20px' }}>
              <div
                className="relative overflow-hidden"
                style={{ height: '62vw', boxShadow: '0 8px 28px rgba(0,0,0,0.22)' }}
              >
                <Image
                  src={photos[idx].src}
                  alt={photos[idx].alt}
                  fill
                  priority={pos === 1}
                  sizes="100vw"
                  draggable={false}
                  className="object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-serif text-base drop-shadow">
                  {photos[idx].label}
                </span>
              </div>
              {/* Reflet sur toutes les cartes → visible pendant le glissement */}
              <Reflection src={photos[idx].src} height="31vw" />
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════
          DESKTOP : 3 images coverflow
      ════════════════════════════ */}
      <div
        className="hidden md:block relative"
        style={{ height: '38vw', maxHeight: 500, perspective: '1200px', perspectiveOrigin: '50% 40%' }}
        onTouchStart={onDesktopStart}
        onTouchEnd={onDesktopEnd}
        onMouseDown={onDesktopMouseDown}
        onMouseUp={onDesktopMouseUp}
        onMouseLeave={() => { mouseXD.current = null }}
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
