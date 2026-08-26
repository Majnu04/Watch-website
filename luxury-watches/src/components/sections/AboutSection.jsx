import React from 'react'
import { shop } from '../../config/shop'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-grid">
        <div>
          <div className="about-editorial">
            <h2>{shop.story[0]}</h2>
            <h2 className="accent">{shop.story[1]}</h2>
          </div>
          <div className="about-story">
            {shop.description.split('. ').reduce((acc, sentence, i, arr) => {
              if (i % 2 === 0) {
                const next = arr[i + 1]
                acc.push(
                  <p key={i}>
                    {sentence}{next ? '. ' + next : '.'}
                  </p>
                )
              }
              return acc
            }, [])}
          </div>
        </div>
        <div className="about-image">
          <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="#c9a96e" strokeWidth="1" opacity="0.6" />
            <circle cx="50" cy="50" r="35" stroke="#555" strokeWidth="0.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const rad = (a * Math.PI) / 180
              return (
                <line
                  key={a}
                  x1={50 + Math.cos(rad) * 35}
                  y1={50 + Math.sin(rad) * 35}
                  x2={50 + Math.cos(rad) * 42}
                  y2={50 + Math.sin(rad) * 42}
                  stroke="#c9a96e"
                  strokeWidth="1"
                  opacity="0.4"
                />
              )
            })}
            <text x="50" y="48" textAnchor="middle" fill="#c9a96e" fontSize="8" fontFamily="serif" letterSpacing="0.2em">EST.</text>
            <text x="50" y="58" textAnchor="middle" fill="#c9a96e" fontSize="10" fontFamily="serif">{shop.year}</text>
          </svg>
        </div>
      </div>
    </section>
  )
}
