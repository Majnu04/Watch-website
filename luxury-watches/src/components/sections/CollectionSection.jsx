import React, { useState, useMemo } from 'react'
import ProductCard from '../ui/ProductCard'
import { products, categories } from '../../config/products'
import { shop } from '../../config/shop'

export default function CollectionSection({ onProductClick, onEnquire }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products
    return products.filter((p) => p.category.includes(activeCategory))
  }, [activeCategory])

  return (
    <section className="collection-section" id="collection">
      <div className="section-label">Curated Selection</div>
      <h2 className="section-heading">THE COLLECTION</h2>
      <p className="section-subheading">
        Each timepiece is selected for its craftsmanship, character, and lasting value.
      </p>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
            onEnquire={onEnquire}
          />
        ))}
      </div>
    </section>
  )
}
