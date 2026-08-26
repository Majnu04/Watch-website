import React from 'react'
import HeroWatchScene from '../three/HeroWatchScene'
import { shop } from '../../config/shop'

export default function HeroSection({ onExplore }) {
  return (
    <section className="hero-section">
      <HeroWatchScene className="hero-canvas-wrapper" />
      <div className="hero-content">
        <h1 className="hero-tagline">{shop.tagline.toUpperCase()}</h1>
        <p className="hero-sub">{shop.subtagline}</p>
        <button className="hero-cta" onClick={onExplore}>
          {shop.ctaText}
        </button>
      </div>
      <div className="hero-scroll-indicator">
        <span>{shop.scrollText}</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
