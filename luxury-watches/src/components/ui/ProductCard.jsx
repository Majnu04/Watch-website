import React from 'react'
import { formatPrice } from '../../config/products'

export default function ProductCard({ product, onClick, onEnquire }) {
  return (
    <div className="product-card" onClick={() => onClick?.(product)}>
      <div className="product-card-image">
        {product.newArrival && <div className="product-card-badge">New</div>}
        <div style={{
          width: '100%', height: '100%',
          background: `linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="35" stroke="#c9a96e" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" stroke="#555" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="50" y2="28" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="50" x2="62" y2="42" stroke="#e0d5c0" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="55" y2="50" stroke="#c62828" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="50" cy="50" r="2" fill="#c9a96e" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
              const r = 35
              const inner = a % 90 === 0 ? 28 : 30
              const rad = (a * Math.PI) / 180
              return (
                <line
                  key={a}
                  x1={50 + Math.cos(rad) * inner}
                  y1={50 + Math.sin(rad) * inner}
                  x2={50 + Math.cos(rad) * r}
                  y2={50 + Math.sin(rad) * r}
                  stroke="#555"
                  strokeWidth={a % 90 === 0 ? 1.5 : 0.5}
                />
              )
            })}
          </svg>
        </div>
      </div>
      <div className="product-card-body">
        <div className="product-card-brand">{product.brand}</div>
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-desc">{product.description}</div>
        <div className="product-card-footer">
          <div className="product-card-price">{formatPrice(product.price)}</div>
          <div className="product-card-actions" onClick={(e) => e.stopPropagation()}>
            <button className="product-card-btn" onClick={() => onClick?.(product)}>Details</button>
            <button className="product-card-btn primary" onClick={() => onEnquire?.(product)}>Enquire</button>
          </div>
        </div>
      </div>
    </div>
  )
}
