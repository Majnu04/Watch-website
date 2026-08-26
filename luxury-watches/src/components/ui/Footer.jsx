import React from 'react'
import { shop } from '../../config/shop'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="navbar-logo">{shop.name}</span>
          <p>{shop.description}</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="#collection">Collection</a>
          <a href="#brands">Brands</a>
          <a href="#about">About Us</a>
          <a href="#store">Store</a>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <a href="#store">Watch Repair</a>
          <a href="#store">Battery Replacement</a>
          <a href="#store">Polishing</a>
          <a href="#store">Insurance</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`tel:${shop.phone}`}>{shop.phone}</a>
          <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={`mailto:${shop.email}`}>{shop.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {shop.name}. All rights reserved.</span>
        <span>
          Designed by{' '}
          <a href="https://elitedigitalsolutions.co.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', transition: 'color 0.3s' }}>
            Elite Digitals
          </a>
        </span>
      </div>
    </footer>
  )
}
