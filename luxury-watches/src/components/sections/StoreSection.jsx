import React from 'react'
import { shop } from '../../config/shop'

export default function StoreSection() {
  return (
    <section className="store-section" id="store">
      <div className="section-label">Visit Us</div>
      <h2 className="section-heading">OUR STORE</h2>
      <p className="section-subheading">
        Experience our collection in person. Our expert staff will guide you to the perfect timepiece.
      </p>

      <div className="store-grid">
        <div className="store-map">
          <iframe
            src={shop.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Store Location"
          />
        </div>
        <div className="store-details">
          <h3>{shop.name}</h3>
          <div className="store-info-row">
            <span className="label">Address</span>
            <span>{shop.address}</span>
          </div>
          <div className="store-info-row">
            <span className="label">Phone</span>
            <span>{shop.phone}</span>
          </div>
          <div className="store-info-row">
            <span className="label">Email</span>
            <span>{shop.email}</span>
          </div>
          <div className="store-info-row">
            <span className="label">Mon — Fri</span>
            <span>{shop.hours.weekdays}</span>
          </div>
          <div className="store-info-row">
            <span className="label">Saturday</span>
            <span>{shop.hours.saturday}</span>
          </div>
          <div className="store-info-row">
            <span className="label">Sunday</span>
            <span>{shop.hours.sunday}</span>
          </div>
          <div className="store-cta">
            <a
              className="btn-gold"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
            <a
              className="btn-outline"
              href={`tel:${shop.phone}`}
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
