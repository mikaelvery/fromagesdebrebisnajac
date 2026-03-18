'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/images/ferme-1.jpg',         alt: 'La ferme du Treil',            label: 'La ferme'       },
  { src: '/images/produits-1.jpg',       alt: 'Fromages et produits fermiers', label: 'Nos produits'  },
  { src: '/images/tomme-de-brebis.jpg',  alt: 'Tome de Brebis au lait cru',   label: 'Tome de Brebis' },
  { src: '/images/brebicous.jpg',        alt: 'Brebicous',                    label: 'Brebicous'      },
  { src: '/images/rompi.jpg',            alt: 'Le Rompi',                     label: 'Le Rompi'       },
  { src: '/images/brebichons.jpg',       alt: 'Les Brebichons',               label: 'Brebichons'     },
]

const N   = photos.length
const mod = (n, m) => ((n % m) + m) % m

function Reflection({ src, height = 70 }) {
  return (
    <div style={{
      height,
      overflow:             'hidden',
      transform:            'scaleY(-1)',
      opacity:              0.35,
      WebkitMaskImage:      'linear-gradient(to top, black 0%, transparent 100%)',
      maskImage:            'linear-gradient(to top, black 0%, transparent 100%)',
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
  const go = (dir) => setCurrent(i => mod(i + dir, N))

  /* ── Mobile swipe (touch only, ne touche pas au desktop) ── */
  const trackRef = useRef(null)
  const wrapRef  = useRef(null)
  const touchX   = useRef(null)
  const sliding  = useRef(false)
  const cardW    = useRef(390)

  const setTrack = useCallback((px, animate = false) => {
    if (!trackRef.current) return
    trackRef.current.style.transition = animate ? 'transform 0.32s ease' : 'none'
    trackRef.current.style.transform  = `translateX(${px}px)`
  }, [])

  const onTouchStart = (e) => {
    if (sliding.current) return
    cardW.current = wrapRef.current?.clientWidth || window.innerWidth
    setTrack(-cardW.current, false)
    touchX.current = e.touches[0].clientX
  }
  const onTouchMove = (e) => {
    if (touchX.current === null || sliding.current) return
    setTrack(-cardW.current + (e.touches[0].clientX - touchX.current), false)
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 45) {
      const dir = dx > 0 ? -1 : 1
      sliding.current = true
      setTrack(-cardW.current - dir * cardW.current, true)
      setTimeout(() => { setCurrent(i => mod(i + dir, N)); sliding.current = false }, 320)
    } else {
      setTrack(-cardW.current, true)
    }
  }

  /* ── Desktop : style 3D statique, navigation par flèches ── */
  const desktopStyle = (offset) => {
    const c = offset === 0
    return {
      position:   'absolute',
      left:       '50%',
      top:        c ? 0 : '6%',
      width:      c ? '48vw' : '26vw',
      height:     c ? '34vw' : '24vw',
      maxWidth:   c ? 680 : 380,
      maxHeight:  c ? 460 : 320,
      transform:  `translateX(calc(-50% + ${offset * 35}vw)) rotateY(${offset * -44}deg) scale(${c ? 1 : 0.88})`,
      opacity:    c ? 1 : 0.65,
      zIndex:     c ? 10 : 5,
      cursor:     c ? 'default' : 'pointer',
      transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
    }
  }

  return (
    <section className="py-20 bg-stone-50">
      {/* Titre */}
      <div className="text-center mb-10 px-6">
        <div className="text-amber-600 font-medium mb-3 uppercase tracking-wider text-sm">En images</div>
        <h2 className="text-4xl font-serif text-stone-900">La vie à la ferme</h2>
      </div>

      {/* ════════ MOBILE — track tactile ════════ */}
      <div
        ref={wrapRef}
        className="md:hidden overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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

      {/* ════════ DESKTOP — coverflow statique + flèches ════════ */}
      <div className="hidden md:block">
        {/* Scène 3D */}
        <div className="relative" style={{ height: '38vw', maxHeight: 500, perspective: '1200px', perspectiveOrigin: '50% 40%' }}>
          {[-1, 0, 1].map((offset) => {
            const idx = mod(current + offset, N)
            const isCenter = offset === 0
            return (
              <div key={offset} style={desktopStyle(offset)} onClick={() => !isCenter && go(offset)}>
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

        {/* Flèches */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={() => go(-1)}
            aria-label="Précédent"
            className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-amber-50 hover:border-amber-400 transition-colors flex items-center justify-center text-stone-600 hover:text-amber-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Suivant"
            className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-amber-50 hover:border-amber-400 transition-colors flex items-center justify-center text-stone-600 hover:text-amber-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
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
