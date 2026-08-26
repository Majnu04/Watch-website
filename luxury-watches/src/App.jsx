import React, { useState, useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import Loader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'
import WhatsAppButton from './components/ui/WhatsAppButton'
import BrandsTicker from './components/ui/BrandsTicker'
import Footer from './components/ui/Footer'
import ProductModal from './components/ui/ProductModal'
import HeroSection from './components/sections/HeroSection'
import ScrollExperience from './components/sections/ScrollExperience'
import CollectionSection from './components/sections/CollectionSection'
import FeaturedSection from './components/sections/FeaturedSection'
import AboutSection from './components/sections/AboutSection'
import StoreSection from './components/sections/StoreSection'
import ContactSection from './components/sections/ContactSection'
import { shop } from './config/shop'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const lenisRef = useRef(null)
  const rafId = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      rafId.current = requestAnimationFrame(raf)
    }
    rafId.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId.current)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => setLoading(false), 600)
      }
      setLoadProgress(progress)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  const handleExplore = useCallback(() => {
    const el = document.getElementById('scroll-experience')
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0 })
    }
  }, [])

  const handleEnquire = useCallback((product) => {
    const msg = `Hi, I'm interested in the ${product.name} (${product.brand}). Please share more details.`
    window.open(`https://wa.me/${shop.whatsapp}?${encodeURIComponent(msg)}`, '_blank')
  }, [])

  return (
    <>
      <Loader progress={loadProgress} visible={loading} />

      {!loading && (
        <>
          <Navbar />

          <main>
            <HeroSection onExplore={handleExplore} />

            <div id="scroll-experience">
              <ScrollExperience />
            </div>

            <BrandsTicker />

            <FeaturedSection onEnquire={handleEnquire} />

            <CollectionSection
              onProductClick={setSelectedProduct}
              onEnquire={handleEnquire}
            />

            <AboutSection />

            <StoreSection />

            <ContactSection />
          </main>

          <Footer />

          <WhatsAppButton />

          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </>
      )}
    </>
  )
}
