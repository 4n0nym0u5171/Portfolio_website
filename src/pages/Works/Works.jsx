import { useState } from 'react'
import { Section, Card, Modal } from '../../components/common'
import './Works.css'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack Web App',
    image: null,
    description: 'A complete e-commerce solution with cart, checkout, payment integration, admin dashboard, and inventory management.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    features: ['User authentication', 'Product management', 'Order tracking', 'Admin analytics', 'Email notifications'],
    links: { demo: '#', github: '#', caseStudy: '#' }
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'SaaS Application',
    image: null,
    description: 'Collaborative project management tool with real-time updates, team workspaces, and advanced reporting.',
    tech: ['Vue.js', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    features: ['Real-time collaboration', 'Kanban boards', 'Time tracking', 'Team workspaces', 'Export reports'],
    links: { demo: '#', github: '#', caseStudy: '#' }
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    category: 'Web Application',
    image: null,
    description: 'Beautiful weather application with location-based forecasts, historical data, and interactive charts.',
    tech: ['React', 'Weather API', 'Chart.js', 'CSS Modules'],
    features: ['Current conditions', '7-day forecast', 'Historical data', 'Interactive charts', 'Geolocation'],
    links: { demo: '#', github: '#', caseStudy: '#' }
  },
  {
    id: 4,
    title: 'Fitness Tracker',
    category: 'Mobile App',
    image: null,
    description: 'Cross-platform fitness application with workout tracking, progress analytics, and social features.',
    tech: ['React Native', 'Expo', 'AsyncStorage', 'React Navigation'],
    features: ['Workout logging', 'Progress photos', 'Statistics', 'Social sharing', 'Offline support'],
    links: { demo: '#', github: '#', caseStudy: '#' }
  },
  {
    id: 5,
    title: 'Portfolio Website',
    category: 'Personal Project',
    image: null,
    description: 'This very portfolio website built with React, Vite, and modern CSS featuring dark theme and animations.',
    tech: ['React', 'Vite', 'React Router', 'CSS Variables', 'IonIcons'],
    features: ['Dark theme', 'Responsive design', 'Smooth animations', 'Modular architecture', 'Accessible'],
    links: { demo: '#', github: '#', caseStudy: '#' }
  },
  {
    id: 6,
    title: 'API Gateway Service',
    category: 'Backend Service',
    image: null,
    description: 'High-performance API gateway with rate limiting, authentication, request/response transformation, and monitoring.',
    tech: ['Node.js', 'Express', 'Redis', 'Docker', 'Prometheus'],
    features: ['Rate limiting', 'JWT authentication', 'Request validation', 'Load balancing', 'Metrics & logging'],
    links: { demo: '#', github: '#', caseStudy: '#' }
  }
]

export default function Works() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  const categories = ['all', ...new Set(projects.map(p => p.category))]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  const handleCardClick = (project) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <Section
        id="works-hero"
        title="Works"
        subtitle="What I've Done"
        className="works-hero"
        tag="header"
      >
        <p className="works-hero-text">
          A collection of projects I've worked on. Each project represents a unique challenge and learning experience.
          Click on any project to learn more.
        </p>
      </Section>

      <Section
        id="works-filters"
        className="works-filters-section"
        tag="section"
      >
        <div className="filter-tabs" role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              aria-controls={`panel-${cat}`}
              id={`tab-${cat}`}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
      </Section>

      <Section
        id="works-grid"
        className="works-grid-section"
        tag="section"
      >
        <div className="works-grid" role="tabpanel" id="panel-all" aria-label="Projects">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="work-card"
              onClick={() => handleCardClick(project)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(project)}
              role="button"
              aria-label={`View details for ${project.title}`}
            >
              <div className="work-card-image">
                <div className="work-placeholder">
                  <ion-icon name={getCategoryIcon(project.category)}></ion-icon>
                </div>
                <div className="work-card-overlay">
                  <ion-icon name="eye-outline"></ion-icon>
                  <span>View Details</span>
                </div>
              </div>
              <div className="work-card-content">
                <span className="work-card-category">{project.category}</span>
                <h3 className="work-card-title">{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Modal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        title={selectedProject?.title}
        size="lg"
      >
        {selectedProject && (
          <div className="project-modal-content">
            <div className="project-modal-header">
              <span className="project-modal-category">{selectedProject.category}</span>
              <div className="project-modal-tech">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="project-modal-tech-tag">{t}</span>
                ))}
              </div>
            </div>
            <p className="project-modal-description">{selectedProject.description}</p>
            
            <div className="project-modal-section">
              <h4 className="project-modal-section-title">Key Features</h4>
              <ul className="project-modal-features">
                {selectedProject.features.map((feature) => (
                  <li key={feature}>
                    <ion-icon name="checkmark-outline"></ion-icon>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-modal-links">
              <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer" className="project-modal-link">
                <ion-icon name="open-outline"></ion-icon>
                Live Demo
              </a>
              <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className="project-modal-link">
                <ion-icon name="logo-github"></ion-icon>
                Source Code
              </a>
              <a href={selectedProject.links.caseStudy} target="_blank" rel="noopener noreferrer" className="project-modal-link">
                <ion-icon name="document-text-outline"></ion-icon>
                Case Study
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

function getCategoryIcon(category) {
  const icons = {
    'Full Stack Web App': 'globe-outline',
    'SaaS Application': 'cube-outline',
    'Web Application': 'desktop-outline',
    'Mobile App': 'phone-portrait-outline',
    'Personal Project': 'heart-outline',
    'Backend Service': 'server-outline'
  }
  return icons[category] || 'folder-outline'
}