import React, { useState } from 'react'
import { shop } from '../../config/shop'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hi, I'm ${form.name}. ${form.message}\n\nPhone: ${form.phone}\nEmail: ${form.email}`
    window.open(`https://wa.me/${shop.whatsapp}?${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-label">Get in Touch</div>
      <h2 className="section-heading">CONTACT US</h2>
      <p className="section-subheading">
        Have a question or looking for something specific? We'd love to help.
      </p>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about the watch you're looking for..."
              required
            />
          </div>
          <button type="submit" className="btn-gold" style={{ width: '100%' }}>
            Send Enquiry
          </button>
        </form>

        <div className="contact-channels">
          <div className="contact-channel">
            <div className="channel-label">WhatsApp</div>
            <div className="channel-value">{shop.phone}</div>
          </div>
          <div className="contact-channel">
            <div className="channel-label">Phone</div>
            <div className="channel-value">{shop.phone}</div>
          </div>
          <div className="contact-channel">
            <div className="channel-label">Email</div>
            <div className="channel-value">{shop.email}</div>
          </div>
          <div className="contact-channel">
            <div className="channel-label">Store Hours</div>
            <div className="channel-value">
              Mon-Fri: {shop.hours.weekdays}<br />
              Sat: {shop.hours.saturday}<br />
              Sun: {shop.hours.sunday}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
