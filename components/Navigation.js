'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const menuItems = ['accueil', 'la ferme', 'produits', 'gîte', 'contact']

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div
            className={`text-2xl font-serif transition-colors cursor-pointer ${
              scrolled ? 'text-amber-800' : 'text-white'
            }`}
            onClick={() => scrollToSection('accueil')}
          >
            Ferme du Treil
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              scrolled
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-white/20 text-white backdrop-blur-sm'
            }`}
          >
            Bio
          </span>
        </div>

        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item)}
                className={`text-sm uppercase tracking-wider transition-all hover:text-amber-600 ${
                  scrolled ? 'text-stone-700' : 'text-white'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? (
            <X className={scrolled ? 'text-stone-900' : 'text-white'} />
          ) : (
            <Menu className={scrolled ? 'text-stone-900' : 'text-white'} />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl">
          <ul className="py-4">
            {menuItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-6 py-3 text-stone-700 hover:bg-stone-50 uppercase tracking-wider"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}