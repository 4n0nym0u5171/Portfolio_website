import { Section, Button } from '../../components/common'
import './About.css'

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University Name',
    period: '2018 — 2022',
    description: 'Focused on software engineering, algorithms, and data structures. Graduated with honors.'
  },
  {
    degree: 'High School Diploma',
    school: 'High School Name',
    period: '2014 — 2018',
    description: 'Advanced mathematics and physics track. Participated in programming competitions.'
  }
]

const skills = [
  { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML5/CSS3'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'] },
  { category: 'Mobile', items: ['React Native', 'Flutter', 'Expo', 'App Store Deployment'] },
  { category: 'DevOps & Tools', items: ['Docker', 'Kubernetes', 'AWS', 'Git', 'GitHub Actions', 'Vercel', 'Linux'] },
  { category: 'Design', items: ['Figma', 'Adobe XD', 'UI/UX Principles', 'Design Systems', 'Prototyping'] }
]

const traits = [
  { icon: 'bulb-outline', title: 'Problem Solver', desc: 'Love breaking down complex problems into manageable solutions.' },
  { icon: 'book-outline', title: 'Continuous Learner', desc: 'Always exploring new technologies and best practices.' },
  { icon: 'people-outline', title: 'Team Player', desc: 'Collaborative approach with strong communication skills.' },
  { icon: 'time-outline', title: 'Reliable', desc: 'Deliver quality work on time, every time.' },
  { icon: 'color-palette-outline', title: 'Detail Oriented', desc: 'Pixel-perfect implementation with clean, maintainable code.' },
  { icon: 'rocket-outline', title: 'Innovative', desc: 'Passionate about creating impactful digital experiences.' }
]

const hobbies = [
  { icon: 'game-controller-outline', title: 'Gaming', desc: 'Strategy and RPG games' },
  { icon: 'musical-notes-outline', title: 'Music', desc: 'Playing guitar & listening' },
  { icon: 'bicycle-outline', title: 'Cycling', desc: 'Weekend trail rides' },
  { icon: 'book-outline', title: 'Reading', desc: 'Tech blogs & sci-fi novels' },
  { icon: 'coffee-outline', title: 'Coffee', desc: 'Exploring local cafes' },
  { icon: 'camera-outline', title: 'Photography', desc: 'Urban & nature shots' }
]

const experience = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Company Inc.',
    period: '2022 — Present',
    description: 'Leading development of core products. Architected microservices, improved performance by 40%, mentored junior developers.'
  },
  {
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2020 — 2022',
    description: 'Built and maintained multiple client projects. Implemented CI/CD pipelines, reduced deployment time by 60%.'
  },
  {
    role: 'Junior Developer',
    company: 'Digital Agency',
    period: '2019 — 2020',
    description: 'Developed responsive websites and web applications. Collaborated with designers to implement pixel-perfect UIs.'
  }
]

export default function About() {
  return (
    <>
      <Section
        id="about-hero"
        title="About Me"
        subtitle="Who am I"
        className="about-hero"
        tag="header"
      >
        <div className="about-hero-content">
          <div className="about-avatar">
            <div className="avatar-placeholder">
              <ion-icon name="person-outline"></ion-icon>
            </div>
          </div>
          <div className="about-intro">
            <h2 className="about-name">Your Name</h2>
            <p className="about-title">Full Stack Developer & UI Designer</p>
            <p className="about-bio">
              Passionate developer with 5+ years of experience building web and mobile applications.
              I specialize in creating scalable, user-friendly solutions using modern technologies.
              When I'm not coding, you'll find me exploring new tech, gaming, or cycling around the city.
            </p>
            <Button variant="primary" size="lg" onClick={() => window.location.href = '/contact'}>
              Get In Touch
              <ion-icon name="mail-outline"></ion-icon>
            </Button>
            <Button variant="outline" size="lg" onClick={() => alert('CV download coming soon')}>
              Download CV
              <ion-icon name="download-outline"></ion-icon>
            </Button>
          </div>
        </div>
      </Section>

      <Section
        id="education"
        title="Education"
        subtitle="Academic Background"
        className="education-section"
        tag="section"
      >
        <div className="timeline">
          {education.map((edu, index) => (
            <article key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-period">{edu.period}</div>
                <h3 className="timeline-degree">{edu.degree}</h3>
                <p className="timeline-school">{edu.school}</p>
                <p className="timeline-description">{edu.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="skills"
        title="Skills"
        subtitle="Technical Expertise"
        className="skills-section"
        tag="section"
      >
        <div className="skills-grid">
          {skills.map((skill) => (
            <article key={skill.category} className="skill-category">
              <h4 className="skill-category-title">{skill.category}</h4>
              <div className="skill-tags">
                {skill.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="traits"
        title="Traits"
        subtitle="What Defines Me"
        className="traits-section"
        tag="section"
      >
        <div className="traits-grid">
          {traits.map((trait) => (
            <article key={trait.title} className="trait-card">
              <div className="trait-icon">
                <ion-icon name={trait.icon}></ion-icon>
              </div>
              <h3 className="trait-title">{trait.title}</h3>
              <p className="trait-description">{trait.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="hobbies"
        title="Hobbies"
        subtitle="Outside of Work"
        className="hobbies-section"
        tag="section"
      >
        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <article key={hobby.title} className="hobby-card">
              <div className="hobby-icon">
                <ion-icon name={hobby.icon}></ion-icon>
              </div>
              <h3 className="hobby-title">{hobby.title}</h3>
              <p className="hobby-description">{hobby.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        title="Experience"
        subtitle="Professional Journey"
        className="experience-section"
        tag="section"
      >
        <div className="timeline">
          {experience.map((exp, index) => (
            <article key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-period">{exp.period}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-description">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="cv-download"
        className="cv-section"
        tag="section"
      >
        <div className="cv-content">
          <div className="cv-icon">
            <ion-icon name="document-text-outline"></ion-icon>
          </div>
          <h3 className="cv-title">Download My CV</h3>
          <p className="cv-text">Get a detailed overview of my experience, skills, and projects.</p>
          <Button variant="primary" size="lg" onClick={() => alert('CV download coming soon')}>
            Download CV
            <ion-icon name="download-outline"></ion-icon>
          </Button>
        </div>
      </Section>
    </>
  )
}