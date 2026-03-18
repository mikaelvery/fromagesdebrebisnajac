'use client'

import { useState } from 'react'
import { X, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const productsCategories = [
    {
      id: 'fromages',
      icon: '🧀',
      title: 'Fromages de Brebis',
      description: 'Nos fromages fermiers au lait cru entier de brebis, affinés avec soin',
      previewImages: ['/images/produits/tomme-de-brebis.jpg', '/images/produits/brebicous.jpg', '/images/produits/rompi.jpg'],
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
      previewImages: [],
      products: [
        {
          name: 'Yaourts Nature',
          description: 'Fermiers au lait entier de brebis',
          details: 'Yaourts onctueux et crémeux, nature sans sucre ajouté',
          image: null,
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
      previewImages: [],
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
                className="card-hover bg-white rounded-2xl shadow-lg cursor-pointer group overflow-hidden"
              >
                {/* Photo preview en haut de la carte */}
                {category.previewImages && category.previewImages.length > 0 ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.previewImages[0]}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent"></div>
                    {/* Miniatures supplémentaires */}
                    {category.previewImages.length > 1 && (
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        {category.previewImages.slice(1).map((img, i) => (
                          <div key={i} className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-white/60">
                            <Image src={img} alt="" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-linear-to-br from-amber-50 to-stone-100 flex items-center justify-center">
                    <span className="text-6xl opacity-40">{category.icon}</span>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-lg transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-serif text-stone-900">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-stone-600 mb-6 leading-relaxed text-sm">
                    {category.description}
                  </p>
                  <div className="flex items-center text-amber-600 font-medium text-sm">
                    Découvrir ({category.products.length} produits)
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal moderne et élégante */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-stone-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: '2px' }}
          >
            {/* Header minimaliste et élégant */}
            <div className="relative bg-stone-900 text-white px-8 py-12">
              {/* Pattern subtil */}
              <div className="absolute inset-0 opacity-5 dot-pattern"></div>
              
              <div className="relative z-10">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>

                <div className="max-w-3xl">
                  <div className="inline-block px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-xs font-medium mb-4 uppercase tracking-wider">
                    Produits Fermiers Bio
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif mb-3">
                    {selectedCategory.title}
                  </h3>
                  <p className="text-stone-300 text-lg">
                    {selectedCategory.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto bg-stone-50">
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategory.products.map((product, index) => (
                    <div
                      key={index}
                      className="group bg-white border border-stone-200 hover:border-amber-300 transition-all duration-300 overflow-hidden"
                    >
                      {/* Image du produit */}
                      {product.image ? (
                        <div className="relative w-full h-56 overflow-hidden bg-stone-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-56 bg-linear-to-br from-stone-200 to-amber-100 flex items-center justify-center">
                          <span className="text-6xl opacity-40">{selectedCategory.icon}</span>
                        </div>
                      )}

                      {/* Info produit */}
                      <div className="p-6">
                        <h4 className="text-xl font-serif text-stone-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-amber-600 text-sm font-medium mb-3 uppercase tracking-wide">
                          {product.description}
                        </p>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {product.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bannière info */}
                <div className="mt-12 bg-amber-50 border-l-4 border-amber-500 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-serif text-lg text-stone-900 mb-2">
                        Production Artisanale & Biologique
                      </h5>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        Tous nos produits sont fabriqués à partir de lait cru entier de nos brebis,
                        élevées en agriculture biologique sur 10 hectares. Transformation artisanale
                        dans le respect des traditions fromagères.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer avec bouton retour */}
            <div className="border-t border-stone-200 bg-white px-8 py-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="group inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors font-medium"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Retour aux catégories
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}