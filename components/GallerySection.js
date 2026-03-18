'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/images/ferme-1.jpg',       alt: 'La ferme du Treil',           label: 'La ferme'      },
  { src: '/images/produits-1.jpg',    alt: 'Fromages et produits fermiers', label: 'Nos produits' },
  { src: '/images/tomme-de-brebis.jpg', alt: 'Tome de Brebis au lait cru', label: 'Tome de Brebis' },
  { src: '/images/brebicous.jpg',     alt: 'Brebicous',                   label: 'Brebicous'     },
  { src: '/images/rompi.jpg',         alt: 'Le Rompi',                    label: 'Le Rompi'      },
  { src: '/images/brebichons.jpg',    alt: 'Les Brebichons',              label: 'Brebichons'    },
]

const N = photos.length
const mod = (n, m) => ((n % m) + m) % m

function Reflection({ src, height = 70 }) {
  return (
    <div style={{
      height,
      overflow: 'hidden',
      transform: 'scaleY(-1)',
      opacity: 0.4,
      WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
      maskImage:       'linear-gradient(to top, black 0%, transparent 100%)',
    }}>
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
  const trackRef  = useRef(null)
  const wrapRef   = useRef(null)
  const touchXM   = useRef(null)
  const sliding   = useRef(false)
  const cardW     = useRef(390)

  const setTrack = useCallback((px, animate = false) => {
    if (!trackRef.current) return
    trackRef.current.style.transition = animate ? 'transform 0.32s ease' : 'none'
    trackRef.current.style.transform  = `translateX(${px}px)`
  }, [])

  const initMobile = () => {
    const w = wrapRef.current?.clientWidth || window.innerWidth
    cardW.current = w
    setTrack(-w, false)
  }

  const onMobileStart = (e) => {
    if (sliding.current) return
    initMobile()
    touchXM.current = e.touches[0].clientX
  }
  const onMobileMove = (e) => {
    if (touchXM.current === null || sliding.current) return
    setTrack(-cardW.current + (e.touches[0].clientX - touchXM.current), false)
  }
  const onMobileEnd = (e) => {
    if (touchXM.current === null) return
    const dx = e.changedTouches[0].clientX - touchXM.current
    touchXM.current = null
    if (Math.abs(dx) > 45) {
      const dir = dx > 0 ? -1 : 1
      sliding.current = true
      setTrack(-cardW.current + dir * -cardW.current, true)
      setTimeout(() => {
        setCurrent(prev => mod(prev + dir, N))
        sliding.current = false
      }, 320)
    } else {
      setTrack(-cardW.current, true)
    }
  }

  /* ══════════════════════════════════════════
     DESKTOP — toutes les cartes bougent ensemble
     setPointerCapture → suivi même hors de l'élément
  ══════════════════════════════════════════ */
  const go = (dir) => setCurrent(i => mod(i + dir, N))

  // refs pour les 3 cartes : index 0 → offset -1 | 1 → offset 0 | 2 → offset +1
  const cardRefs  = useRef([null, null, null])
  const dragState = useRef({ active: false, startX: 0, dx: 0 })

  // Transform CSS d'une carte selon son offset + un éventuel déplacement live dx (px)
  const cardTransform = (offset, dx = 0) =>
    `translateX(calc(-50% + ${offset * 35}vw + ${dx}px)) rotateY(${offset * -44}deg) scale(${offset === 0 ? 1 : 0.88})`

  const onPointerDown = (e) => {
    // Capture tous les pointermove/up même si la souris quitte l'élément
    e.currentTarget.setPointerCapture(e.pointerId)
    dragState.current = { active: true, startX: e.clientX, dx: 0 }
    cardRefs.current.forEach(ref => { if (ref) ref.style.transition = 'none' })
  }

  const onPointerMove = (e) => {
    if (!dragState.current.active) return
    const dx = e.clientX - dragState.current.startX
    dragState.current.dx = dx
    cardRefs.current.forEach((ref, i) => {
      if (ref) ref.style.transform = cardTransform(i - 1, dx)
    })
  }

  const onPointerUp = () => {
    if (!dragState.current.active) return
    dragState.current.active = false
    const dx = dragState.current.dx

    if (Math.abs(dx) > 60) {
      const dir = dx > 0 ? -1 : 1
      // Efface les overrides inline → React re-applique via go() + re-render
      cardRefs.current.forEach(ref => {
        if (ref) { ref.style.transition = ''; ref.style.transform = '' }
      })
      go(dir)
    } else {
      // Snap-back animé de toutes les cartes
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return
        ref.style.transition = 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)'
        ref.style.transform  = cardTransform(i - 1, 0)
        setTimeout(() => {
          if (ref) { ref.style.transition = ''; ref.style.transform = '' }
        }, 350)
      })
    }
  }

  /* ── Style statique de chaque carte (position de repos) ── */
  const desktopStyle = (offset) => ({
    position:  'absolute',
    left:      '50%',
    top:       offset === 0 ? 0 : '6%',
    width:     offset === 0 ? '48vw' : '26vw',
    height:    offset === 0 ? '34vw' : '24vw',
    maxWidth:  offset === 0 ? 680 : 380,
    maxHeight: offset === 0 ? 460 : 320,
    transform: cardTransform(offset),
    opacity:   offset === 0 ? 1 : 0.70,
    zIndex:    offset === 0 ? 10 : 5,
    cursor:    offset === 0 ? 'grab' : 'pointer',
    transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
    userSelect: 'none',
  })

  return (
    <section className="py-20 bg-stone-50">
      {/* Titre */}
      <div className="text-center mb-10 px-6">
        <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">En images</div>
        <h2 className="text-4xl font-serif text-stone-900">La vie à la ferme</h2>
      </div>

      {/* ════════ MOBILE ════════ */}
      <div
        ref={wrapRef}
        className="md:hidden overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={onMobileStart}
        onTouchMove={onMobileMove}
        onTouchEnd={onMobileEnd}
      >
        <div ref={trackRef} style={{ display: 'flex', width: '300vw', transform: 'translateX(-100vw)', willChange: 'transform' }}>
          {[mod(current - 1, N), current, mod(current + 1, N)].map((idx, pos) => (
            <div key={pos} style={{ flexShrink: 0, width: '100vw', paddingInline: '20px' }}>
              <div className="relative overflow-hidden" style={{ height: '62vw', boxShadow: '0 8px 28px rgba(0,0,0,0.22)' }}>
                <Image src={photos[idx].src} alt={photos[idx].alt} fill priority={pos === 1}
                  sizes="100vw" draggable={false} className="object-cover pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-serif text-base drop-shadow">
                  {photos[idx].label}
                </span>
              </div>
              <Reflection src={photos[idx].src} height="31vw" />
            </div>
          ))}
        </div>
      </div>

      {/* ════════ DESKTOP ════════ */}
      <div
        className="hidden md:block relative"
        style={{ height: '38vw', maxHeight: 500, perspective: '1200px', perspectiveOrigin: '50% 40%', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {[-1, 0, 1].map((offset, i) => {
          const idx = mod(current + offset, N)
          const isCenter = offset === 0
          return (
            <div
              key={offset}
              ref={el => { cardRefs.current[i] = el }}
              style={desktopStyle(offset)}
              onClick={() => !isCenter && go(offset)}
            >
              <div className="relative w-full h-full overflow-hidden"
                style={{ boxShadow: isCenter ? '0 20px 60px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.18)' }}>
                <Image src={photos[idx].src} alt={photos[idx].alt} fill draggable={false}
                  sizes="(max-width:1200px) 42vw, 560px" className="object-cover pointer-events-none" />
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

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6 md:mt-10">
        {photos.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Photo ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'w-6 h-2 bg-amber-600' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
            }`} />
        ))}
      </div>
    </section>
  )
}
