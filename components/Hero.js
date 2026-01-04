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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0">
        {/* Pour utiliser une vraie image :
        <Image
          src="/images/hero-background.jpg"
          alt="Ferme du Treil"
          fill
          className="object-cover"
          priority
        />
        */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-700"></div>
        
        {/* Pattern subtil */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        
        {/* Gradient de profondeur */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30"></div>
      </div>

      {/* Logo AB */}
      <div className="absolute top-20 right-4 md:top-24 md:right-16 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-2 md:p-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-lg md:text-3xl font-bold">AB</div>
              <div className="text-[6px] md:text-[8px] font-medium mt-0.5 md:mt-1 tracking-wider">
                CERTIFIÉ
              </div>
            </div>
          </div>
          <div className="text-center mt-1 md:mt-2 text-[8px] md:text-xs text-stone-700 font-medium leading-tight">
            Agriculture
            <br />
            Biologique
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mt-8 md:mt-0">
        {/* Badge localisation - Plus petit sur mobile */}
        <div className="inline-flex items-center gap-1.5 md:gap-2 mb-6 md:mb-8 px-3 md:px-5 py-1.5 md:py-2.5 bg-white/15 backdrop-blur-md rounded-full text-white text-xs md:text-sm border border-white/20">
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="whitespace-nowrap">Grand Site d&apos;Occitanie · Najac</span>
        </div>

        {/* Titre principal - Responsive */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-white mb-4 md:mb-6 leading-tight">
          <span className="block drop-shadow-2xl">Ferme du Treil</span>
        </h1>

        {/* Sous-titre - Responsive */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-100 mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed px-4">
          L&apos;authenticité du terroir aveyronnais
          <br />
          <span className="text-emerald-200">Fromages & Yaourts de Brebis Bio</span>
        </p>

        {/* Stats cards - Responsive et empilées sur mobile */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
          <div className="px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-xl md:text-2xl font-bold text-emerald-300">60</div>
            <div className="text-xs md:text-sm text-stone-200">Brebis Laitières</div>
          </div>
          <div className="px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-xl md:text-2xl font-bold text-emerald-300">10ha</div>
            <div className="text-xs md:text-sm text-stone-200">Certifiés Bio</div>
          </div>
          <div className="px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-xl md:text-2xl font-bold text-emerald-300">100%</div>
            <div className="text-xs md:text-sm text-stone-200">Artisanal</div>
          </div>
        </div>

        {/* CTA Button - Responsive */}
        <button
          onClick={() => scrollToSection('produits')}
          className="group px-6 md:px-10 py-3 md:py-4 bg-white text-emerald-900 rounded-full text-sm md:text-base font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
        >
          Découvrir nos Produits
          <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('ferme')}
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow text-white/80 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
      </button>
    </section>
  )
}