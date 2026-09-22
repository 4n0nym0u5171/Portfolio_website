import { useState } from 'react'
import { Section, Button } from '../../components/common'
import './Contact.css'

const socialLinks = [
  { name: 'GitHub', icon: 'logo-github', url: 'https://github.com', color: '#333' },
  { name: 'LinkedIn', icon: 'logo-linkedin', url: 'https://linkedin.com', color: '#0077B5' },
  { name: 'Twitter', icon: 'logo-twitter', url: 'https://twitter.com', color: '#1DA1F2' },
  { name: 'Dribbble', icon: 'logo-dribbble', url: 'https://dribbble.com', color: '#EA4C89' },
  { name: 'Email', icon: 'mail-outline', url: 'mailto:hello@example.com', color: '#f5d742' },
  { name: 'Phone', icon: 'call-outline', url: 'tel:+1234567890', color: '#25D366' }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <>
      <Section
        id="contact-hero"
        title="Contact Me"
        subtitle="Let's Talk"
        className="contact-hero"
        tag="header"
      >
        <p className="contact-hero-text">
          Have a project in mind or just want to say hello? I'd love to hear from you.
          Feel free to reach out through any of the channels below.
        </p>
      </Section>

      <Section
        id="contact-info"
        className="contact-info-section"
        tag="section"
      >
        <div className="contact-grid">
          <div className="contact-methods">
            <h3 className="contact-methods-title">Get In Touch</h3>
            <p className="contact-methods-text">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="contact-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-link"
                  aria-label={link.name}
                >
                  <div className="contact-link-icon" style={{ background: `${link.color}20` }}>
                    <ion-icon name={link.icon} style={{ color: link.color }}></ion-icon>
                  </div>
                  <div className="contact-link-info">
                    <span className="contact-link-name">{link.name}</span>
                    <span className="contact-link-value">
                      {link.url.replace('mailto:', '').replace('tel:', '').replace('https://', '').replace('http://', '')}
                    </span>
                  </div>
                  <ion-icon name="chevron-forward-outline" className="contact-link-arrow"></ion-icon>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h3 className="contact-form-title">Send a Message</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={5}
                ></textarea>
              </div>
              <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'} className="form-submit">
                {status === 'submitting' ? (
                  <>
                    <ion-icon name="hourglass-outline" className="spin"></ion-icon>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    Send Message
                    <ion-icon name="paper-plane-outline"></ion-icon>
                  </>
                )}
              </Button>
              {status === 'success' && (
                <p className="form-success" role="status">Thank you! I'll get back to you soon.</p>
              )}
            </form>
          </div>
        </div>
      </Section>

      <Section
        id="contact-cta"
        className="contact-cta-section"
        tag="section"
      >
        <div className="contact-cta-content">
          <div className="cta-icon">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </div>
          <h3 className="cta-title">Prefer a Quick Chat?</h3>
          <p className="cta-text">Schedule a 15-minute call to discuss your project requirements.</p>
          <Button variant="outline" size="lg" onClick={() => alert('Calendar booking coming soon')}>
            Schedule a Call
            <ion-icon name="calendar-outline"></ion-icon>
          </Button>
        </div>
      </Section>
    </>
  )
}