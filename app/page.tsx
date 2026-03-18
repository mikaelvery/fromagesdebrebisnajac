import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import GallerySection from '@/components/GallerySection'
import ProductsSection from '@/components/ProductsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import GiteSection from '@/components/GiteSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <AboutSection />
      <GallerySection />
      <ProductsSection />
      <TestimonialsSection />
      <GiteSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
