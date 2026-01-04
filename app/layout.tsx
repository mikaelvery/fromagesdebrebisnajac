import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: 'Ferme du Treil - Fromages Bio de Brebis à Najac',
  description: 'Producteurs de fromages et yaourts de brebis fermiers en agriculture biologique à Najac, Aveyron. Grand Site d\'Occitanie.',
  keywords: 'fromage brebis, yaourt bio, Najac, Aveyron, agriculture biologique, ferme, producteur local',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}