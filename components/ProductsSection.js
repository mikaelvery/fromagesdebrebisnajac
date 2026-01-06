'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const productsCategories = [
    {
      id: 'fromages',
      icon: '🧀',
      title: 'Fromages de Brebis',
      description: 'Nos fromages fermiers au lait cru entier de brebis, affinés avec soin',
      products: [
        {
          name: 'Tome de Brebis',
          description: 'Au lait cru entier fermier',
          details: 'Fromage à pâte pressée, affiné pendant plusieurs semaines pour développer tous ses arômes',
          image: '/images/produits/tomme-de-brebis.jpg',
        },
        {
          name: 'Brebicous',
          description: 'Au lait cru entier fermier de brebis',
          details: 'Disponible frais ou affinés, petit fromage onctueux au goût délicat',
          image: '/images/produits/brebicous.jpg',
        },
        {
          name: 'Le Rompi',
          description: 'Au lait cru entier fermier de brebis',
          details: 'Spécialité de la ferme, fromage de caractère aux saveurs authentiques',
          image: '/images/produits/rompi.jpg',
        },
        {
          name: 'Les Brebichons',
          description: 'Au lait cru entier fermier de brebis',
          details: 'Petits fromages individuels, parfaits pour la dégustation',
          image: '/images/produits/brebichons.jpg',
        },
      ],
    },
    {
      id: 'yaourts',
      icon: '🥛',
      title: 'Yaourts & Produits Frais',
      description: 'Yaourts et produits laitiers frais au lait entier de brebis',
      products: [
        {
          name: 'Yaourts Nature',
          description: 'Fermiers au lait entier de brebis',
          details: 'Yaourts onctueux et crémeux, nature sans sucre ajouté',
          image: null, // Ajouter photo si disponible
        },
        {
          name: 'Yaourts Vanille',
          description: 'Fermiers sucrés au lait entier',
          details: 'Délicatement parfumés à la vanille naturelle',
          image: null,
        },
        {
          name: 'Yaourts Citron',
          description: 'Fermiers sucrés au lait entier',
          details: 'Saveur citronnée rafraîchissante',
          image: null,
        },
        {
          name: 'Yaourts Cacao',
          description: 'Fermiers sucrés au lait entier',
          details: 'Gourmands au bon goût de cacao',
          image: null,
        },
        {
          name: 'Fromage Blanc',
          description: 'Fermier au lait cru entier',
          details: 'Fromage blanc onctueux, parfait nature ou avec des fruits',
          image: null,
        },
        {
          name: 'Lait Emprésuré',
          description: 'Lait entier de brebis fermier (caillé doux)',
          details: 'Produit frais traditionnel, doux et digeste',
          image: null,
        },
      ],
    },
    {
      id: 'specialites',
      icon: '✨',
      title: 'Nos Spécialités',
      description: 'Découvrez nos créations artisanales et produits de saison',
      products: [
        {
          name: 'Fromages Affinés',
          description: 'Sélection de fromages maturés',
          details: 'Nos fromages affinés plusieurs mois pour les amateurs de goûts prononcés',
          image: null,
        },
        {
          name: 'Compotes de Saison au Chaudron',
          description: 'Fruits du moment, cuites lentement',
          details: 'Préparées au chaudron selon la tradition, nos compotes révèlent toute la saveur naturelle des fruits de saison. Un délice artisanal, sucré juste comme il faut, à déguster chaud ou froid.',
          image: null,
        },
      ],
    },
  ]

  return (
    <>
      <section
        id="produits"
        className="py-32 bg-linear-to-br from-stone-100 to-amber-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-amber-600 font-medium mb-4 uppercase tracking-wider text-sm">
              Nos Produits
            </div>
            <h2 className="text-5xl font-serif text-stone-900 mb-6">
              Du pré à l&apos;assiette
            </h2>
            <p className="text-stone-600 text-xl max-w-2xl mx-auto">
              Une gamme complète de fromages et produits laitiers fermiers
              au lait cru entier de brebis, en agriculture biologique
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {productsCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(category)}
                className="card-hover bg-white rounded-2xl p-8 shadow-lg cursor-pointer group"
              >
                <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-amber-600 rounded-2xl mb-6 flex items-center justify-center text-white text-2xl transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-4">
                  {category.title}
                </h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center text-amber-600 font-medium">
                  Découvrir ({category.products.length} produits)
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal des produits */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header du modal */}
            <div className="sticky top-0 bg-linear-to-br from-emerald-500 to-emerald-600 text-white p-6 md:p-8 rounded-t-3xl z-10">
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
              <div className="text-5xl md:text-6xl mb-3 md:mb-4">{selectedCategory.icon}</div>
              <h3 className="text-2xl md:text-4xl font-serif mb-1 md:mb-2">
                {selectedCategory.title}
              </h3>
              <p className="text-sm md:text-lg text-amber-100">
                {selectedCategory.description}
              </p>
            </div>


            {/* Liste des produits */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {selectedCategory.products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-stone-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Image du produit ou placeholder */}
                    {product.image ? (
                      <div className="relative w-full h-40 md:h-48 mb-4 overflow-hidden rounded-xl shadow-inner">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 md:h-48 bg-gradient-to-br from-amber-200 to-stone-300 rounded-xl mb-4 flex items-center justify-center text-5xl md:text-6xl">
                        {selectedCategory.icon}
                      </div>
                    )}
                    <h4 className="text-xl font-serif text-stone-900 mb-2">
                      {product.name}
                    </h4>
                    <p className="text-amber-600 text-sm font-medium mb-3">
                      {product.description}
                    </p>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {product.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* Info supplémentaire */}
              <div className="mt-8 bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">ℹ️</div>
                  <div>
                    <h5 className="font-serif text-lg text-stone-900 mb-2">
                      Tous nos produits
                    </h5>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Sont fabriqués à partir de lait cru entier de nos brebis,
                      élevées en agriculture biologique. Production artisanale
                      et fermière dans le respect des traditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bouton de fermeture */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="w-full mt-6 px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}