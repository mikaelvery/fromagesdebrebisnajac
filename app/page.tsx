import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ProductsSection from '@/components/ProductsSection'
import GiteSection from '@/components/GiteSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <AboutSection />
      <ProductsSection />
      <GiteSection />
      <ContactSection />
      <Footer />
    </main>
  )
}