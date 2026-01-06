'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="accueil"
      className="relative min-h-screen overflow-hidden flex items-center justify-center pt-20 pb-16 md:pt-0 md:pb-0"
    >
      {/* Image de fond avec overlays verts */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.png"
          alt="Ferme du treil - Laurie et Sacha - Brebis et paysage aveyronnais"
          fill
          priority
          className="object-cover"
          quality={90}
        />

        {/* Overlay vert émeraude principal */}
        <div className="absolute inset-0 bg-emerald-900/75"></div>
        
        {/* Gradient vert émeraude - de bas en haut */}
        <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-900/60 to-emerald-800/40"></div>

        {/* Pattern de points blancs */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Logo AB - discret */}
      <div className="absolute top-20 right-4 md:top-8 md:right-8 z-20">
        <div className="group relative">
          <div className="absolute inset-0 bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-lg p-1.5 md:p-3 shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-white/20">
            <Image
              src="/images/AB_cert_HD.jpg"
              alt="Agriculture Biologique Certifiée"
              width={60}
              height={60}
              className="w-10 h-10 md:w-16 md:h-16 object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4 max-w-5xl w-full">
        {/* Badge localisation */}
        <div className="inline-flex items-center gap-1.5 mb-4 md:mb-8 px-3 py-1.5 md:px-5 md:py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-xs md:text-sm border border-white/20 shadow-lg">
          <svg className="w-3 h-3 md:w-4 md:h-4 text-emerald-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium whitespace-nowrap text-[11px] md:text-sm">Grand Site d&apos;Occitanie · Najac</span>
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-3 md:mb-6 leading-[1.1]">
          <span className="block drop-shadow-2xl">Ferme du Treil</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-sm sm:text-base md:text-2xl text-white/95 mb-6 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          L&apos;authenticité du terroir aveyronnais
          <br />
          <span className="inline-block mt-1 md:mt-2 px-3 py-1 md:px-4 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-200 text-xs md:text-lg">
            Fromages & Yaourts de Brebis Bio
          </span>
        </p>

        {/* Stats cards */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-12">
          {[
            { value: '60', label: 'Brebis', icon: '🐑' },
            { value: '10ha', label: 'Bio', icon: '🌿' },
            { value: '100%', label: 'Artisanal', icon: '🧀' }
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative px-3 py-2 md:px-6 md:py-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-emerald-400/40 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-t from-emerald-500/0 to-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl">{stat.icon}</span>
                <div className="text-left">
                  <div className="text-lg md:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-stone-300">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollToSection('produits')}
          className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-stone-900 rounded-full text-sm md:text-base font-semibold overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-400/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          <span className="relative">Découvrir nos Produits</span>
          <svg 
            className="relative w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('ferme')}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 text-white/60 hover:text-white transition-all duration-300"
        aria-label="Défiler vers le bas"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] md:text-xs uppercase tracking-wider font-medium"></span>
          <ChevronDown size={20} strokeWidth={1.5} className="md:w-7 md:h-7" />
        </div>
      </button>
    </section>
  )
}