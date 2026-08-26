import React from 'react'
import { shop } from '../../config/shop'

export default function BrandsTicker() {
  const brands = [...shop.brands, ...shop.brands]

  return (
    <section className="brands-ticker" id="brands">
      <div className="brands-track">
        {brands.map((brand, i) => (
          <span key={i}>{brand}</span>
        ))}
      </div>
    </section>
  )
}
