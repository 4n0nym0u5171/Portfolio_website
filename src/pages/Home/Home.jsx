import { Button, Section } from '../../components/common'
import './Home.css'

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToWorks = () => {
    const worksSection = document.getElementById('works')
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Section
        id="hero"
        className="hero-section"
        tag="section"
        aria-label="Hero section"
      >
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="name-joe">Joe</span><span className="name-ford">ford</span>
            </h1>
            <p className="hero-tagline">
              I'm an aspiring web developer creating solutions for organizational needs,
              in pursuit of solving challenges and easing difficulties,
              an excellent team member that continues to grow in expertise
              and share knowledge within the collaborative group.
            </p>
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToContact}
              >
                Contact Me
                <ion-icon name="mail-outline"></ion-icon>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToWorks}
              >
                Learn More
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </Button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-placeholder" aria-hidden="true">
                <ion-icon name="person-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="works"
        title="What I've Done"
        subtitle="Selected Projects"
        className="works-section"
        tag="section"
      >
        <div className="works-grid">
          <article className="work-card">
            <div className="work-image">
              <div className="work-placeholder">
                <ion-icon name="desktop-outline"></ion-icon>
              </div>
            </div>
            <div className="work-content">
              <h3 className="work-title">Project One</h3>
              <p className="work-category">Web Application</p>
            </div>
          </article>
          <article className="work-card">
            <div className="work-image">
              <div className="work-placeholder">
                <ion-icon name="phone-portrait-outline"></ion-icon>
              </div>
            </div>
            <div className="work-content">
              <h3 className="work-title">Project Two</h3>
              <p className="work-category">Mobile App</p>
            </div>
          </article>
          <article className="work-card">
            <div className="work-image">
              <div className="work-placeholder">
                <ion-icon name="cart-outline"></ion-icon>
              </div>
            </div>
            <div className="work-content">
              <h3 className="work-title">Project Three</h3>
              <p className="work-category">E-commerce</p>
            </div>
          </article>
        </div>
      </Section>

      <Section
        id="contact"
        title="Let's Talk"
        subtitle="Get In Touch"
        className="contact-section"
        tag="section"
      >
        <div className="contact-content">
          <p className="contact-text">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
          <div className="contact-links">
            <a href="mailto:joeford@example.com" className="contact-link">
              <div className="contact-link-icon">
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <span>Email Me</span>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </a>
            <a href="https://github.com/joeford" target="_blank" rel="noopener noreferrer" className="contact-link">
              <div className="contact-link-icon">
                <ion-icon name="logo-github"></ion-icon>
              </div>
              <span>GitHub</span>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </a>
            <a href="https://linkedin.com/in/joeford" target="_blank" rel="noopener noreferrer" className="contact-link">
              <div className="contact-link-icon">
                <ion-icon name="logo-linkedin"></ion-icon>
              </div>
              <span>LinkedIn</span>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}