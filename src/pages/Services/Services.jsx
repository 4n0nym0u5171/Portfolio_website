import { Section } from '../../components/common'
import './Services.css'

const services = [
  {
    icon: 'desktop-outline',
    title: 'Web Development',
    description: 'Building modern, responsive, and performant web applications using React, Vue, Node.js, and other cutting-edge technologies. From simple landing pages to complex enterprise solutions.',
    features: ['Single Page Applications', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Development', 'API Integration']
  },
  {
    icon: 'phone-portrait-outline',
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile applications with native performance using React Native, Flutter, or native iOS/Android development. App store deployment included.',
    features: ['iOS & Android Apps', 'Cross-platform Development', 'App Store Deployment', 'Push Notifications', 'Offline Support']
  },
  {
    icon: 'brush-outline',
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user interfaces with a focus on user experience. From wireframes to high-fidelity prototypes and design systems.',
    features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing', 'Interaction Design']
  },
  {
    icon: 'cloud-outline',
    title: 'Cloud & DevOps',
    description: 'Setting up scalable cloud infrastructure, CI/CD pipelines, and deployment strategies using AWS, Google Cloud, Azure, Docker, and Kubernetes.',
    features: ['Cloud Architecture', 'CI/CD Pipelines', 'Container Orchestration', 'Monitoring & Logging', 'Cost Optimization']
  },
  {
    icon: 'speedometer-outline',
    title: 'Performance Optimization',
    description: 'Analyzing and optimizing application performance for speed, efficiency, and scalability. Frontend and backend optimization techniques.',
    features: ['Code Splitting', 'Caching Strategies', 'Database Optimization', 'Bundle Analysis', 'Core Web Vitals']
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Security & Testing',
    description: 'Implementing security best practices, conducting audits, and setting up comprehensive testing strategies including unit, integration, and E2E tests.',
    features: ['Security Audits', 'Penetration Testing', 'Unit & Integration Tests', 'E2E Testing', 'Compliance']
  }
]

export default function Services() {
  return (
    <>
      <Section
        id="services-hero"
        title="Services"
        subtitle="Who am I"
        className="services-hero"
        tag="header"
      >
        <p className="services-hero-text">
          I offer a comprehensive range of development and design services to help bring your ideas to life.
          Each service is tailored to your specific needs and built with modern best practices.
        </p>
      </Section>

      <Section
        id="services-list"
        className="services-list-section"
        tag="section"
      >
        <div className="services-container">
          {services.map((service, index) => (
            <article key={service.title} className="service-detail">
              <div className="service-detail-header">
                <div className="service-detail-icon">
                  <ion-icon name={service.icon}></ion-icon>
                </div>
                <div className="service-detail-info">
                  <h3 className="service-detail-title">{service.title}</h3>
                  <p className="service-detail-description">{service.description}</p>
                </div>
              </div>
              <ul className="service-features">
                {service.features.map((feature) => (
                  <li key={feature} className="service-feature">
                    <ion-icon name="checkmark-outline"></ion-icon>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="tech-stack"
        title="Technologies"
        subtitle="Tools & Stack"
        className="tech-stack-section"
        tag="section"
      >
        <div className="tech-categories">
          <div className="tech-category">
            <h4 className="tech-category-title">Frontend</h4>
            <div className="tech-tags">
              {['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Sass'].map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
          <div className="tech-category">
            <h4 className="tech-category-title">Backend</h4>
            <div className="tech-tags">
              {['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'].map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
          <div className="tech-category">
            <h4 className="tech-category-title">Mobile</h4>
            <div className="tech-tags">
              {['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'].map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
          <div className="tech-category">
            <h4 className="tech-category-title">DevOps</h4>
            <div className="tech-tags">
              {['Docker', 'Kubernetes', 'AWS', 'Vercel', 'GitHub Actions', 'Terraform'].map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="process"
        title="My Process"
        subtitle="How I Work"
        className="process-section"
        tag="section"
      >
        <div className="process-steps">
          <article className="process-step">
            <div className="process-step-number">01</div>
            <h3 className="process-step-title">Discovery</h3>
            <p className="process-step-text">
              Understanding your requirements, goals, and target audience through detailed discussions and research.
            </p>
          </article>
          <article className="process-step">
            <div className="process-step-number">02</div>
            <h3 className="process-step-title">Planning</h3>
            <p className="process-step-text">
              Creating a comprehensive project plan with timelines, milestones, and technical architecture.
            </p>
          </article>
          <article className="process-step">
            <div className="process-step-number">03</div>
            <h3 className="process-step-title">Design</h3>
            <p className="process-step-text">
              Crafting wireframes, prototypes, and design systems with focus on user experience and visual appeal.
            </p>
          </article>
          <article className="process-step">
            <div className="process-step-number">04</div>
            <h3 className="process-step-title">Development</h3>
            <p className="process-step-text">
              Building the application with clean, maintainable code following best practices and standards.
            </p>
          </article>
          <article className="process-step">
            <div className="process-step-number">05</div>
            <h3 className="process-step-title">Testing</h3>
            <p className="process-step-text">
              Rigorous testing including unit, integration, and end-to-end tests to ensure quality and reliability.
            </p>
          </article>
          <article className="process-step">
            <div className="process-step-number">06</div>
            <h3 className="process-step-title">Launch & Support</h3>
            <p className="process-step-text">
              Deploying to production, monitoring performance, and providing ongoing maintenance and support.
            </p>
          </article>
        </div>
      </Section>
    </>
  )
}