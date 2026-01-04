export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="text-2xl font-serif text-white mb-2">
              Ferme du Treil
            </div>
            <div className="text-sm">
              Agriculture Biologique · Najac, Aveyron
            </div>
          </div>
          <div className="text-sm text-center">
            <div>© 2026 Ferme du Treil - Tous droits réservés</div>
            <div className="mt-2">Mentions légales · RGPD</div>
          </div>
        </div>
      </div>
    </footer>
  )
}