import React from 'react'

export default function Loader({ progress = 0, visible = true }) {
  return (
    <div className={`loader ${!visible ? 'hidden' : ''}`}>
      <div className="loader-brand">CHRONOHAUS</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-text">CRAFTING YOUR EXPERIENCE</div>
      <div className="loader-percentage">{Math.round(progress)}%</div>
    </div>
  )
}
