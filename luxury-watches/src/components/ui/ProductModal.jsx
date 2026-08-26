import React from 'react'
import { formatPrice } from '../../config/products'
import { shop } from '../../config/shop'

export default function ProductModal({ product, onClose, onEnquire }) {
  if (!product) return null

  const whatsappUrl = `https://wa.me/${shop.whatsapp}?${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${product.brand}). Please share more details.`
  )}`

  return (
    <div className={`modal-backdrop ${product ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-visual">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="#c9a96e" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="38" stroke="#333" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="50" y2="18" stroke="#c9a96e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="68" y2="38" stroke="#e0d5c0" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="50" y1="50" x2="60" y2="50" stroke="#c62828" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="50" cy="50" r="2.5" fill="#c9a96e" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
              const outer = 42
              const inner = a % 90 === 0 ? 34 : 38
              const rad = (a * Math.PI) / 180
              return (
                <line
                  key={a}
                  x1={50 + Math.cos(rad) * inner}
                  y1={50 + Math.sin(rad) * inner}
                  x2={50 + Math.cos(rad) * outer}
                  y2={50 + Math.sin(rad) * outer}
                  stroke={a % 90 === 0 ? '#c9a96e' : '#555'}
                  strokeWidth={a % 90 === 0 ? 2 : 0.5}
                />
              )
            })}
          </svg>
        </div>

        <div className="modal-details">
          <div className="product-card-brand">{product.brand}</div>
          <div className="product-card-name">{product.name}</div>
          <div className="modal-price">{formatPrice(product.price)}</div>

          <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          <div className="modal-specs">
            <h4>Specifications</h4>
            {Object.entries(product.specs).map(([key, value]) => (
              <div className="spec-row" key={key}>
                <span className="spec-label">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                </span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <a className="btn-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Enquire Now
            </a>
            <button className="btn-outline" onClick={() => window.open(`tel:${shop.phone}`)}>
              Visit Store
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
